import mongoose from "mongoose";
import connectDB from "../../../lib/mongodb.js";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "disconnected";
  let dbLatencyMs = null;
  let isHealthy = true;

  try {
    await connectDB();
    const readyState = mongoose.connection.readyState;

    if (readyState === 1) {
      const pingStart = Date.now();
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping();
        dbLatencyMs = Date.now() - pingStart;
      }
      dbStatus = "connected";
    } else if (readyState === 2) {
      dbStatus = "connecting";
      isHealthy = false;
    } else {
      dbStatus = "disconnected";
      isHealthy = false;
    }
  } catch (error) {
    dbStatus = `error: ${error.message}`;
    isHealthy = false;
  }

  const memoryUsage = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());

  const responseBody = {
    status: isHealthy ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    uptimeSeconds,
    environment: process.env.NODE_ENV || "development",
    responseTimeMs: Date.now() - startTime,
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        rssMb: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
        heapTotalMb: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
        heapUsedMb: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
      },
    },
    features: {
      geminiAiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
      jwtConfigured: Boolean(process.env.JWT_SECRET),
    },
  };

  return Response.json(responseBody, {
    status: isHealthy ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
