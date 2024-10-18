import { Model, Sequelize } from "sequelize";

export * from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    logging: process.env.NODE_ENV === "development" ? logQueries : null,
  }
);

function logQueries(query) {
  console.log("Database query => ", query);
}

export class BaseModel extends Model {
  static find(id) {
    return this.findByPk(id);
  }

  remove() {
    return this.destroy();
  }
}
