import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories for artworks
export const categories = [
  "แผ่นพับ อาชีพทัศนศิลป์",
  "Pop-up", 
  "ประติมากรรม",
  "Cubism Art",
  "Thai Pop Art"
] as const;

// Artwork type definition
export interface Artwork {
  id: number;
  title: string;
  artist: string;
  concept: string;
  image: string;
  category: string;
  createdAt?: Date;
}

// Gallery data structure
export type GalleryData = {
  [K in typeof categories[number]]: Artwork[];
};

// Insert artwork schema for form validation
export const insertArtworkSchema = z.object({
  title: z.string().min(1, "กรุณาใส่ชื่อผลงาน"),
  artist: z.string().min(1, "กรุณาใส่ชื่อศิลปิน"),
  category: z.enum(categories, {
    required_error: "กรุณาเลือกหมวดหมู่",
  }),
  concept: z.string().min(1, "กรุณาใส่แนวคิด/ความหมาย"),
  image: z.string().min(1, "กรุณาเลือกรูปภาพ"),
});

export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
