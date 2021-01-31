import { Controller, Get, Query } from '@nestjs/common';
import { PagemetaService } from './pagemeta.service';

@Controller('pagemeta')
export class PagemetaController {
  constructor(private readonly pagemetaService: PagemetaService) {}

  @Get()
  getPagemeta(@Query('url') url) {
    return this.pagemetaService.getByUrl(url);
  }
}
