import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("5000"),
  MONGODB_URI: z
    .string({
      required_error: "MONGODB_URI is required in .env file",
    })
    .url("MONGODB_URI must be a valid connection string"),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error("Invalid environment variables");
  console.error(parseResult.error.format());
  process.exit(1);
}

export const env = parseResult.data;
