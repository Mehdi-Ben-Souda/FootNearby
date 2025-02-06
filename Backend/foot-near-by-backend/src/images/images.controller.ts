import { Controller, Post, Body, Get, Param, Res, PayloadTooLargeException } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  async uploadImage(@Body() body: { image: string }) {
    try {
      const fileName = await this.imagesService.saveImage(body.image);
      return { fileName };
    } catch (error) {
      if (error.message === 'request entity too large') {
        throw new PayloadTooLargeException('Image file size is too large');
      }
      throw new Error('Failed to upload image');
    }
  }

  @Get(':fileName')
  async getImage(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = this.imagesService.getImagePath(fileName);
    
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      res.status(404).send('Image not found');
    }
  }
}
