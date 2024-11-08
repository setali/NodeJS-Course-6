import { BaseController } from ".";
import Article from "../models/article";
import { NotFoundError } from "../utils/errors";

class ArticleController extends BaseController {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      limit: 6,
      include: ["user"],
    });

    res.render("article/list", {
      title: "Article list",
      user: req.user,
      ...data,
    });
  }

  async get(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id, { include: ["user"] });

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.render("article/show", {
      title: article.title,
      user: req.user,
      article,
    });
  }
}

export default new ArticleController();
