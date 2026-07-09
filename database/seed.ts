import dummyItems from "../dummyitems.json";
import { items } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import ImageKit from "@imagekit/nodejs";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

type DummyItem = (typeof dummyItems)[number];

const uploadToImageKit = async (file: string, fileName: string) => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("ImageKit privateKey environment variable is required");
  }

  const imagekit = new ImageKit({ privateKey });
  const response = await imagekit.files.upload({
    file,
    fileName,
    folder: "/items/images",
    useUniqueFileName: true,
  });

  if (!response.url) {
    throw new Error("ImageKit upload response did not include a URL");
  }

  return response.url;
};

const toInsertItem = (item: DummyItem, image: string) => {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    rating: item.rating,
    totalItems: item.total_items,
    availableItems: item.available_items,
    available: item.available,
    summary: item.summary,
    description: item.description,
    image,
    condition: item.condition,
    included: item.included,
    brand: item.brand,
    borrowDuration: item.borrow_duration,
    createdAt: item.created_at ? new Date(item.created_at) : undefined,
  };
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const item of dummyItems) {
      const image = await uploadToImageKit(item.image, `${item.title}.jpg`);

      await db.insert(items).values(toInsertItem(item, image)).onConflictDoNothing();
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exitCode = 1;
  }
};

seed();
