import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IContent {
  type:
    | "text"
    | "image"
    | "video"
    | "audio"
    | "link"
    | "quote"
    | "code"
    | "list"
    | "table"
    | "embed";
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  linkUrl?: string;
  quoteText?: string;
  codeLanguage?: string;
  listItems?: string[];
  tableData?: string[][];
  embedCode?: string;
  embedUrl?: string;
}

export interface IPost extends Document {
  title: string;
  subtitle?: string;
  urlName: string;
  content: IContent[];
  imageUrl: string;
  authorId: Types.ObjectId;
  published: boolean;
  keywords: string[];
  metaDescription?: string;
  metaTitle?: string;
  metaImage?: string;
  metaImageAlt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    type: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    content: { type: String, required: true },
    imageUrl: String,
    videoUrl: String,
    audioUrl: String,
    linkUrl: String,
    quoteText: String,
    codeLanguage: String,
    listItems: [String],
    tableData: [[String]],
    embedCode: String,
    embedUrl: String,
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    urlName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },
    content: {
      type: [ContentSchema],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    metaDescription: String,
    metaTitle: String,
    metaImage: String,
    metaImageAlt: String,
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ published: 1, createdAt: -1 });
PostSchema.index({ keywords: 1 });

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
