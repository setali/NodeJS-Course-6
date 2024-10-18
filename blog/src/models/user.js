import { BaseModel, DataTypes, sequelize } from "../config/database";

class User extends BaseModel {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
