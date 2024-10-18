import { BaseController } from ".";
import { BadRequestError } from "../utils/errors";
import User from "../models/user";
import bcrypt from "bcrypt";

class AuthController extends BaseController {
  loginPage(req, res) {
    res.render("auth/login", { title: "Login" });
  }

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required!");
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new BadRequestError("Credential error!");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Credential error!");
    }

    res.json(user);
  }

  registerPage(req, res) {
    res.render("auth/register", { title: "Register" });
  }

  async register(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required!");
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 12);
      await User.create({ username, password: hashedPassword });
      res.redirect("/login");
    } catch (error) {
      if (error.original.code === "ER_DUP_ENTRY") {
        if (error.fields.username) {
          throw new BadRequestError("Username is duplicated!");
        }
      }

      throw new Error(error);
    }
  }
}

export default new AuthController();
