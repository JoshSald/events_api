import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "Title must be between 3 and 255 characters",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 5000],
          msg: "Description must be a maximum of 5000 characters",
        },
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eventType: {
      type: DataTypes.ENUM(
        "Live Music",
        "Street Festival",
        "Cultural Event",
        "Marathon",
        "Tech Conference",
        "Holiday Market",
        "Other"
      ),
      allowNull: false,
      defaultValue: "Other",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 255],
          msg: "Location must be a maximum of 255 characters",
        },
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  });

  return Event;
};
