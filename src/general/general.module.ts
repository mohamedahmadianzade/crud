import { Module, Global } from '@nestjs/common';
import { GeneralService } from './general.service';
@Global()
@Module({
  providers: [GeneralService],
  exports:[GeneralService]
})
export class GeneralModule {}
