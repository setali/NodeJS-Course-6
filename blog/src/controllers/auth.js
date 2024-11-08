import { BaseController } from ".";
import { BadRequestError } from "../utils/errors";
import User from "../models/user";
import bcrypt from "bcrypt";
import { log } from "../utils/logger";

class AuthController extends BaseController {
  loginPage(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

    res.render("auth/login", { title: "Login" });
  }

  async login(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

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

    user.set("token", undefined);
    user.set("password", undefined);

    req.session.user = user;

    log({ message: "user:login", metadata: { user } });
    res.redirect("/");
  }

  registerPage(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

    res.render("auth/register", { title: "Register" });
  }

  async register(req, res) {
    if (req.user) {
      return res.redirect("/");
    }

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

  logout(req, res) {
    req.session.destroy((error) => {
      if (!error) {
        log({ message: "user:logout", metadata: { user: req.user } });
        res.redirect(req.headers.referer);
      }
    });
  }
}

export default new AuthController();
