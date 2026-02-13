import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";

function getStorage(): Storage {
  const credentials = process.env.GCS_SERVICE_ACCOUNT_JSON;
  if (credentials) {
    try {
      const key = JSON.parse(credentials);
      return new Storage({ credentials: key });
    } catch {
      throw new Error("GCS_SERVICE_ACCOUNT_JSON is invalid JSON");
    }
  }
  return new Storage();
}

function getBucketName(): string {
  const bucketName = process.env.GCS_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("GCS_BUCKET_NAME environment variable is not set");
  }
  return bucketName;
}

export interface UploadResult {
  url: string;
  key: string;
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Faz upload de uma imagem para o Google Cloud Storage
 * @param file - Buffer do arquivo
 * @param contentType - Tipo MIME do arquivo (ex: 'image/jpeg', 'image/png')
 * @param folder - Pasta onde salvar (ex: 'blog', 'posts')
 * @returns URL pública da imagem e a chave do objeto
 */
export async function uploadImageToGCS(
  file: Buffer,
  contentType: string,
  folder: string = "blog"
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(contentType)) {
    throw new Error(
      `Tipo de arquivo não permitido: ${contentType}. Tipos permitidos: ${ALLOWED_TYPES.join(", ")}`
    );
  }

  if (file.length > MAX_SIZE) {
    throw new Error("Arquivo muito grande. Tamanho máximo: 5MB");
  }

  const fileExtension = contentType.split("/")[1];
  const fileName = `${randomUUID()}.${fileExtension}`;
  const key = `${folder}/${fileName}`;

  const storage = getStorage();
  const bucket = storage.bucket(getBucketName());
  const blob = bucket.file(key);

  await blob.save(file, {
    contentType,
    metadata: { cacheControl: "public, max-age=31536000" },
  });

  const url = `https://storage.googleapis.com/${getBucketName()}/${key}`;

  return { url, key };
}

/**
 * Deleta uma imagem do Google Cloud Storage
 * @param key - Chave do objeto no GCS
 */
export async function deleteImageFromGCS(key: string): Promise<void> {
  const storage = getStorage();
  const bucket = storage.bucket(getBucketName());
  const file = bucket.file(key);
  await file.delete();
}

/**
 * Extrai a chave do GCS a partir de uma URL
 * Suporta: storage.googleapis.com/bucket/key e storage.cloud.google.com/bucket/key
 * @param url - URL completa da imagem
 * @returns Chave do objeto no GCS (path dentro do bucket)
 */
export function extractGCSKeyFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname;
    if (
      !host.includes("storage.googleapis.com") &&
      !host.includes("storage.cloud.google.com")
    ) {
      return null;
    }
    const pathname = urlObj.pathname;
    if (!pathname || pathname === "/") return null;

    const parts = pathname.replace(/^\//, "").split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return parts.slice(1).join("/");
  } catch {
    return null;
  }
}
