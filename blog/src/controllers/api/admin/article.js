import { BaseController } from "../..";
import Article from "../../../models/article";
import { NotFoundError } from "../../../utils/errors";
import fs from "fs";
import path from "path";

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
    const { title, text, image } = req.body;

    const article = new Article({ title, text, image, userId: req.user.id });
    await article.save();

    res.json(article);
  }

  async update(req, res) {
    const { title, text, image } = req.body;

    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    article.title = title;
    article.text = text;
    article.image = image;

    article.save();

    res.status(201).json(article);
  }

  async remove(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    await article.remove();

    const imagePath = path.resolve(__basedir, "public", article.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.json(article);
  }
}

export default new ArticleController();
