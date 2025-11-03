import { sequelize, User, Event } from "./db.js";

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "12345678",
      img: "https://www.meme-arsenal.com/memes/6c88eb6fd75933f0cc4c22f29c59a683.jpg",
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "12345678",
      img: "https://clipart-library.com/2024/bob-the-builder-clipart/bob-the-builder-clipart-10.webp",
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "12345678",
      img: "https://i.pinimg.com/originals/f9/e6/9f/f9e69f2fa1b427859011227359430047.jpg",
    },
  ];

  const events = [
    {
      title: "Summer Festival",
      description: "A fun summer festival with music and food",
      startDate: new Date("2025-10-30T09:00:00Z"),
      endDate: new Date("2025-10-30T13:00:00Z"),
      eventType: "Live Music",
      location: "Central Park",
      latitude: 40.785091,
      longitude: -73.968285,
      organizerId: 1,
    },
    {
      title: "Tech Conference",
      description: "A conference about the latest in tech",
      startDate: new Date("2025-11-05T08:00:00Z"),
      endDate: new Date("2025-11-05T16:00:00Z"),
      eventType: "Tech Conference",
      location: "Convention Center",
      latitude: 37.774929,
      longitude: -122.419418,
      organizerId: 2,
    },
    {
      title: "Oktoberfest",
      description:
        "A traditional German beer festival held annually in Munich.",
      startDate: new Date("2024-09-21T10:00:00Z"),
      endDate: new Date("2024-09-21T23:59:00Z"),
      eventType: "Street Festival",
      location: "Theresienwiese, Munich",
      latitude: 48.131271,
      longitude: 11.549669,
      organizerId: 1,
    },
    {
      title: "Berlin Marathon",
      description:
        "One of the world’s largest and most popular marathons held annually in Berlin.",
      startDate: new Date("2024-09-29T07:00:00Z"),
      endDate: new Date("2024-09-29T15:00:00Z"),
      eventType: "Marathon",
      location: "Brandenburg Gate, Berlin",
      latitude: 52.516275,
      longitude: 13.377704,
      organizerId: 3,
    },
    {
      title: "Christmas Market",
      description:
        "A traditional German Christmas market held in the heart of Berlin.",
      startDate: new Date("2024-12-01T10:00:00Z"),
      endDate: new Date("2024-12-01T20:00:00Z"),
      eventType: "Holiday Market",
      location: "Alexanderplatz, Berlin",
      latitude: 52.521918,
      longitude: 13.413215,
      organizerId: 3,
    },
  ];

  await User.bulkCreate(users, { individualHooks: true });
  await Event.bulkCreate(events, { individualHooks: true });
};

try {
  await seedDB();
  console.log("Database seeded");
} catch (error) {
  console.error({ error });
} finally {
  await sequelize.close();
  console.log("Database connection closed");
}
