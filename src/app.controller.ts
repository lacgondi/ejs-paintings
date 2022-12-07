import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listPaintings(@Query('year') year = 1990) {
    const [rows] = await db.execute('SELECT title FROM paintings WHERE year > ?', [year]);
    return {
      paintings: rows,
    };
  }
}
