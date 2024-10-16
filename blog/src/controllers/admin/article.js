import { BaseController } from "..";
import Article from "../../models/article";
import { BadRequestError, NotFoundError } from "../../utils/errors";

class ArticleController extends BaseController {
  async list(req, res) {
    const articles = await Article.findAll();

    res.render("admin/article/list", {
      title: "Article list",
      articles,
    });
  }

  async get(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.render("admin/article/show", {
      title: article.title,
      article,
    });
  }

  create(req, res) {
    res.render("admin/article/create", {
      title: "Create Article",
    });
  }

  async add(req, res) {
    const { title, text } = req.body;

    if (!title || !text) {
      throw new BadRequestError("Title and Text is required!");
    }

    const article = new Article({ title, text });
    await article.save();

    res.redirect("/admin/article");
  }

  async edit(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    res.render("admin/article/edit", {
      title: `Edit ${article.title}`,
      article,
    });
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

    res.redirect("/admin/article");
  }

  async remove(req, res) {
    const { id } = req.params;

    const article = await Article.find(+id);

    if (!article) {
      throw new NotFoundError("Article not found");
    }

    await article.remove();

    res.redirect("/admin/article");
  }
}

export default new ArticleController();
