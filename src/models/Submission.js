import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "cpp",
    },
    code: {
      type: String,
      required: true,
    },
    verdict: {
      type: String,
      required: true,
    },
    passed: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    runtimeMs: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for optimal user history and problem attempts lookups
submissionSchema.index({ userId: 1, createdAt: -1 });
submissionSchema.index({ userId: 1, problemId: 1, createdAt: -1 });

const Submission =
  mongoose.models.Submission ||
  mongoose.model("Submission", submissionSchema);

export default Submission;
