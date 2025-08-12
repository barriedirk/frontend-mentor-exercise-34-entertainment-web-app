import { z } from "zod";

export const CategoryTypeEnum = z.union([
  z.literal("Movie"),
  z.literal("TV Series"),
]);

export const MediaItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  year: z.number(),
  category: CategoryTypeEnum,
  rating: z.string(),
  isBookmarked: z.boolean(),
  isTrending: z.boolean(),

  thumbnail: z.object({
    trending: z.object({
      small: z.string(),
      large: z.string(),
    }),
    regular: z.object({
      small: z.string(),
      medium: z.string(),
      large: z.string(),
    }),
  }),
});

export const BookmarksStateSchema = z.object({
  list: z.array(z.string()),
  data: z.record(z.string(), MediaItemSchema),
});
