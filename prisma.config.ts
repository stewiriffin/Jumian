// Prisma configuration with fallback for development
import "dotenv/config";

const getEnv = (key: string, fallback: string = ""): string => {
  return process.env[key] || fallback;
};

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: getEnv("DATABASE_URL"),
  },
};
