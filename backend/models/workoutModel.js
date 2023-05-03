const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    muscle: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    }, 
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
