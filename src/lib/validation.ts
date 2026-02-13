import { z } from "zod";

const CONTENT_TYPES = [
  "text",
  "image",
  "video",
  "audio",
  "link",
  "quote",
  "code",
  "list",
  "table",
  "embed",
] as const;

const contentBlockSchema = z.object({
  type: z.enum(CONTENT_TYPES),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional(),
  quoteText: z.string().optional(),
  codeLanguage: z.string().optional(),
  listItems: z.array(z.string()).optional(),
  tableData: z.array(z.array(z.string())).optional(),
  embedCode: z.string().optional(),
  embedUrl: z.string().url().optional(),
});

// Schema for user creation
export const createUserSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// Schema for login
export const loginSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Schema for post creation
export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  subtitle: z.string().trim().optional(),
  urlName: z
    .string()
    .min(1, "URL name is required")
    .toLowerCase()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "URL name must contain only lowercase letters, numbers, and hyphens"
    ),
  content: z
    .array(contentBlockSchema)
    .min(1, "Content must have at least one block"),
  imageUrl: z.string().min(1, "Image URL is required"),
  keywords: z.array(z.string()).optional(),
  metaDescription: z.string().trim().optional(),
  metaTitle: z.string().trim().optional(),
  metaImage: z.string().url().optional(),
  metaImageAlt: z.string().trim().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

// Schema for post editing
export const editPostSchema = z.object({
  title: z.string().min(1, "Title is required").trim().optional(),
  subtitle: z.string().trim().optional(),
  urlName: z
    .string()
    .min(1, "URL name is required")
    .toLowerCase()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "URL name must contain only lowercase letters, numbers, and hyphens"
    )
    .optional(),
  content: z
    .array(contentBlockSchema)
    .min(1, "Content must have at least one block")
    .optional(),
  imageUrl: z.string().min(1).optional(),
  keywords: z.array(z.string()).optional(),
  metaDescription: z.string().trim().optional(),
  metaTitle: z.string().trim().optional(),
  metaImage: z.string().url().optional(),
  metaImageAlt: z.string().trim().optional(),
});

export type EditPostInput = z.infer<typeof editPostSchema>;
