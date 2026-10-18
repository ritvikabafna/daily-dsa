const IS_PRODUCTION = process.env.NODE_ENV === "production";

function sanitize(data) {
  if (!data || typeof data !== "object") return data;
  const sanitized = Array.isArray(data) ? [...data] : { ...data };

  // Strip sensitive fields
  const sensitiveKeys = ["password", "token", "apiKey", "sessionApiKey", "GEMINI_API_KEY", "JWT_SECRET"];
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some((s) => key.toLowerCase().includes(s.toLowerCase()))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
      sanitized[key] = sanitize(sanitized[key]);
    }
  }
  return sanitized;
}

export const logger = {
  info(message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message,
      ...(Object.keys(meta).length > 0 ? { meta: sanitize(meta) } : {}),
    };
    if (IS_PRODUCTION) {
      console.log(JSON.stringify(entry));
    } else {
      console.log(`[INFO] ${entry.timestamp} - ${message}`, meta && Object.keys(meta).length ? meta : "");
    }
  },

  warn(message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "WARN",
      message,
      ...(Object.keys(meta).length > 0 ? { meta: sanitize(meta) } : {}),
    };
    if (IS_PRODUCTION) {
      console.warn(JSON.stringify(entry));
    } else {
      console.warn(`[WARN] ${entry.timestamp} - ${message}`, meta && Object.keys(meta).length ? meta : "");
    }
  },

  error(message, error = null, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message,
      ...(error ? { error: error.message || String(error), stack: error.stack } : {}),
      ...(Object.keys(meta).length > 0 ? { meta: sanitize(meta) } : {}),
    };
    if (IS_PRODUCTION) {
      console.error(JSON.stringify(entry));
    } else {
      console.error(`[ERROR] ${entry.timestamp} - ${message}`, error || "", meta && Object.keys(meta).length ? meta : "");
    }
  },
};

export default logger;
