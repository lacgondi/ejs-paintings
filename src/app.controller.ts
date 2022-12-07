import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { PaintingDto } from './painting.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listPaintings(@Query('year') year = 1990) {
    const [rows] = await db.execute(
      'SELECT title, id FROM paintings WHERE year > ?',
      [year],
    );
    return {
      paintings: rows,
    };
  }

  @Get('painting/:id')
  @Render('show')
  async showPainting(@Param('id') id: number) {
    const [rows] = await db.execute(
      'SELECT title, year, on_display FROM paintings Where id = ?',
      [id],
    );
    return { painting: rows[0] };
  }

  @Get('paintings/new')
  @Render('form')
  newPaintingForm() {
    return {};
  }

  @Post('paintings/new')
  async newPainting(@Body() painting: PaintingDto) {
    await db.execute(
      'INSERT INTO `paintings` (`title`, `year`, `on_display`) values (?, ?, ?)',
      [painting.title, painting.year, painting.on_display],
    );
    return 'OK';
  }
}
