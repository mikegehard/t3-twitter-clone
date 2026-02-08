import { compress } from "image-conversion";
  export async function compressFile(file: Blob, quality: number): Promise<Blob> {
    const compressed = await compress(file, quality);
    return compressed;
  }
