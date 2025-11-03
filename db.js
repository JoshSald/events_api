import { Sequelize } from "sequelize";
import UserModel from "./models/users.js";
import EventModel from "./models/events.js";

const connectionString = process.env.DB_URL;

const sequelize = connectionString
  ? new Sequelize(connectionString, {
      dialect: "postgres",
      protocol: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "./db.db",
      logging: false,
    });

const User = UserModel(sequelize);
const Event = EventModel(sequelize);

User.hasMany(Event, { foreignKey: "organizerId" });
Event.belongsTo(User, { foreignKey: "organizerId" });

try {
  await sequelize.sync({ force: false });
  console.log("Database is ready");
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", error);
}

export { sequelize, User, Event };
