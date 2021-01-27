const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trimp: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 1024,
      minLenght: 6,
    },
    bio: {
      type: String,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into db, crypt password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// mongoDB always put s on table name
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
