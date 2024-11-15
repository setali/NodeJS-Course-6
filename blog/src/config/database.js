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
  return;
  console.log("Database query => ", query);
}

export class BaseModel extends Model {
  static DEFAULT_PAGE_SIZE = 3;

  static async findPaginate(page = 1, options = {}) {
    page = +page;

    const {
      limit = this.DEFAULT_PAGE_SIZE,
      offset = (page - 1) * limit,
      order = [["id", "DESC"]],
      ...otherOptions
    } = options;

    const { count: totals, rows: items } = await this.findAndCountAll({
      limit,
      offset,
      order,
      ...otherOptions,
    });

    const pages = Math.ceil(totals / limit);

    return {
      items,
      totals,
      page,
      pages,
      limit,
      offset,
      hasPervPage: page > 1,
      pervPage: page - 1 || null,
      hasNextPage: page < pages,
      nextPage: page < pages ? page + 1 : null,
    };
  }

  static find(id, options) {
    return this.findByPk(id, options);
  }

  remove() {
    return this.destroy();
  }
}
