import mongoose from 'mongoose';
import crypto from 'crypto';

const responseItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
      trim: true
    },
    selectedOptionId: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

const assessmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => crypto.randomUUID()
    },
    userId: {
      type: String,
      index: true,
      default: null
    },
    assessmentVersion: {
      type: String,
      default: '2.0.0'
    },
    educationLevel: {
      type: String,
      required: true,
      trim: true
    },
    responses: {
      type: [responseItemSchema],
      required: true,
      validate: [
        (val) => Array.isArray(val) && val.length > 0,
        'Assessment must contain at least one response.'
      ]
    },
    status: {
      type: String,
      enum: ['in_progress', 'completed'],
      default: 'completed'
    },
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

assessmentSchema.index({ userId: 1, createdAt: -1 });

export const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', assessmentSchema);
