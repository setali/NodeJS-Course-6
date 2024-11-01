import { BaseController } from "../..";
import { BadRequestError, NotFoundError } from "../../../utils/errors";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/token";

class AuthController extends BaseController {
  async user(req, res) {
    res.json(req.user);
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required!");
    }

    const user = await User.scope("withPassword").findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestError("Credential error!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Credential error!");
    }

    const token = generateAccessToken(user);
    let refreshToken = user.token;

    if (!refreshToken) {
      refreshToken = generateRefreshToken();

      user.token = refreshToken;
      await user.save();
    }

    res.json({
      accessToken: token,
      refreshToken,
    });
  }

  async getToken(req, res) {
    const { refreshToken } = req.body;

    const user = await User.findOne({ where: { token: refreshToken } });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const token = generateAccessToken(user);

    res.json({ accessToken: token });
  }
}

export default new AuthController();
