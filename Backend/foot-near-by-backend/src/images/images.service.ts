import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

@Injectable()
export class ImagesService {
  private readonly uploadDir: string;

  constructor() {
    // Create absolute path relative to project root
    this.uploadDir = path.join(process.cwd(), 'uploads', 'images');
    this.ensureUploadDirectoryExists();
  }

  private async ensureUploadDirectoryExists() {
    try {
      await mkdirAsync(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }

  async saveImage(base64Image: string): Promise<string> {
    const matches = base64Image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const imageType = matches[1];
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${imageType}`;
    const filePath = path.join(this.uploadDir, fileName);

    await writeFileAsync(filePath, imageBuffer);
    return fileName;
  }

  getImagePath(fileName: string): string {
    return path.join(this.uploadDir, fileName);
  }

  getUploadDir(): string {
    return this.uploadDir;
  }
}
