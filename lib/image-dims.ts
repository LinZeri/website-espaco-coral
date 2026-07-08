import fs from "fs";
import path from "path";

/**
 * Lê largura/altura de um WebP em /public sem dependências externas,
 * direto do header RIFF. Usado em build (SSG) para enriquecer o
 * ImageObject do schema; qualquer falha retorna undefined em vez de
 * quebrar o build ou a página.
 */
export function getPublicImageDims(
  publicPath: string
): { width: number; height: number } | undefined {
  try {
    if (!publicPath.startsWith("/") || !publicPath.endsWith(".webp")) {
      return undefined;
    }
    const filePath = path.join(process.cwd(), "public", publicPath);
    const fd = fs.openSync(filePath, "r");
    const buf = Buffer.alloc(32);
    fs.readSync(fd, buf, 0, 32, 0);
    fs.closeSync(fd);

    if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
      return undefined;
    }

    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      // Canvas size: 24 bits little-endian, valor armazenado é (dimensão - 1)
      const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
      const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
      return { width, height };
    }
    if (chunk === "VP8 ") {
      // Lossy: dimensões em 14 bits a partir do byte 26
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      return { width, height };
    }
    if (chunk === "VP8L") {
      // Lossless: 14 bits cada, empacotados a partir do byte 21
      const b0 = buf[21];
      const b1 = buf[22];
      const b2 = buf[23];
      const b3 = buf[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      return { width, height };
    }
    return undefined;
  } catch {
    return undefined;
  }
}
