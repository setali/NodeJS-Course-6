import { BaseModel, DataTypes, sequelize } from "../config/database";

class User extends BaseModel {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
  },
  {
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: {
        exclude: ["password", "token"],
      },
    },
    scopes: {
      withPassword: {},
    },
  }
);

export default User;
