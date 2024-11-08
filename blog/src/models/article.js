import { BaseModel, sequelize, DataTypes } from "../config/database";
import User from "./user";

class Article extends BaseModel {}

Article.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "article",
  }
);

Article.belongsTo(User);
User.hasMany(Article);

export default Article;
