import { Module, HttpModule } from '@nestjs/common';
import { PagemetaController } from './pagemeta.controller';
import { PagemetaService } from './pagemeta.service';

@Module({
  imports: [HttpModule],
  controllers: [PagemetaController],
  providers: [PagemetaService],
})
export class PagemetaModule {}
