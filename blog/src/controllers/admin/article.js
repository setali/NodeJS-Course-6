import { BaseController } from "..";
import Article from "../../models/article";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../utils/errors";
import { log } from "../../utils/logger";

class ArticleController extends BaseController {
  async list(req, res) {
    const data = await Article.findPaginate(req.query.page, {
      include: ["user"],
    });

    res.render("admin/article/list", {
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

    res.render("admin/article/show", {
      title: article.title,
      article,
      user: req.user,
    });
  }

  create(req, res) {
    res.render("admin/article/create", {
      title: "Create Article",
      user: req.user,
    });
  }

  async add(req, res) {
    const { title, text } = req.body;

    if (!title || !text) {
      throw new BadRequestError("Title and Text is required!");
    }

    const article = new Article({ title, text, userId: req.user.id });
    await article.save();

    log({ message: "article:create", metadata: { user: req.user, article } });

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
      user: req.user,
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

    log({ message: "article:update", metadata: { user: req.user, article } });

    res.redirect("/admin/article");
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

    log({ message: "article:remove", metadata: { user: req.user, article } });

    res.redirect("/admin/article");
  }
}

export default new ArticleController();
