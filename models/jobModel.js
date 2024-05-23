import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },

    position: {
      type: String,
      required: [true, "Job position is required"],
      maxlength: 100,
    },

    Status: {
      type: String,
      enum: ["Pending", "Reject", "Interview"],
      default: "Pending",
    },

    WorkType: {
      type: String,
      enum: ["Full time", "Part time", "Internship", "Contract"],
      default: "Full time",
    },

    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "Job location is required"],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
