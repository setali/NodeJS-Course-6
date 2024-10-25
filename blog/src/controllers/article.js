import { BaseController } from ".";
import Article from "../models/article";

class ArticleController extends BaseController {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      limit: 5,
      include: ["user"],
    });

    res.render("article/list", {
      title: "Article list",
      user: req.user,
      ...data,
    });
  }
}

export default new ArticleController();
