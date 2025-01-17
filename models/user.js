const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //There is also one filled called Salt
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/defaultUser.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  // Heer "this" is pointing to current User..
  const user = this;
  console.log(user, "This User");
  if (!user.isModified("password")) return;

  // salt is an random string
  const salt = randomBytes(16).toString();

  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;
  next();
});

userSchema.static(
  "matchPasswordAndGenrateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) throw new Error("User not found..");
    console.log(user, "This");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (userProvidedPassword !== hashedPassword)
      throw new Error("Incorrect Password..");

    const token = createTokenForUser(user);
    return token;
  }
);

const User = model("user", userSchema);
module.exports = User;
