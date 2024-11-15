import { Op } from "sequelize";
import { BaseController } from "../..";
import User from "../../../models/user";

class PersonController extends BaseController {
  async list(req, res) {
    const { user } = req;

    const data = await User.findAll({ where: { id: { [Op.ne]: user.id } } });

    res.json(data);
  }
}

export default new PersonController();
