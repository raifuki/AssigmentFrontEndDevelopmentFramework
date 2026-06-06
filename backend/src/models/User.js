const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://ui-avatars.com/api/?background=random",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);