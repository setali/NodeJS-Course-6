import { BaseController } from "../..";
import Article from "../../../models/article";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../../utils/errors";

class ArticleController extends BaseController {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      include: ["user"],
    });

    res.json(data);
  }

  async get(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id, { include: ["user"] });

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.json(article);
  }

  async add(req, res) {
    const { title, text } = req.body;

    if (!title || !text) {
      throw new BadRequestError("Title and Text is required!");
    }

    // const article = new Article({ title, text, userId: req.user.id });
    const article = new Article({ title, text, userId: 15 });
    await article.save();

    res.json(article);
  }

  async update(req, res) {
    const { title, text } = req.body;

    if (!title || !text) {
      throw new BadRequestError("Title and Text is required!");
    }

    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    article.title = title;
    article.text = text;

    article.save();

    res.status(201).json(article);
  }

  async remove(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    // if (article.userId !== req.user.id) {
    //   throw new ForbiddenError();
    // }

    await article.remove();

    res.json(article);
  }
}

export default new ArticleController();
