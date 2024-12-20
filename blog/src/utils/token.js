const crypto = require("crypto");
import jwt from "jsonwebtoken";

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1000s",
    }
  );
}
