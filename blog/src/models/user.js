import { BaseModel, DataTypes, sequelize } from "../config/database";

class User extends BaseModel {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withPassword: {},
    },
  }
);

export default User;
