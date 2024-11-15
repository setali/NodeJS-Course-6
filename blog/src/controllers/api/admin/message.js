import { Op } from "sequelize";
import { BaseController } from "../..";
import Message from "../../../models/message";

class MessageController extends BaseController {
  async list(req, res) {
    const { user } = req;

    const { channel, lastMessage } = req.query;

    const ids = [user.id, channel];

    const query = {
      where: { from: { [Op.in]: ids }, to: { [Op.in]: ids } },
      limit: 10,
      order: [["id", "DESC"]],
    };

    if (lastMessage) {
      query.where.id = { [Op.lt]: lastMessage };
    }

    const data = await Message.findAll(query);

    res.json(data);
  }
}

export default new MessageController();
