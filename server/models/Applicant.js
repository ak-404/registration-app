import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true 
  },
  phone: { 
    type: String, 
    required: true,
    trim: true 
  },
  role: { 
    type: String, 
    enum: ["Intern", "Volunteer"], 
    required: true 
  },
  message: { 
    type: String, 
    trim: true 
  },
}, { 
  timestamps: true 
});

// Add indexes for better performance
applicantSchema.index({ email: 1 });
applicantSchema.index({ createdAt: -1 });

export default mongoose.model("Applicant", applicantSchema);
