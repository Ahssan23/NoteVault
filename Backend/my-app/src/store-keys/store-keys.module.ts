import { Module } from '@nestjs/common';
import { StoreKeysService } from './store-keys.service';
import { StoreKeysController } from './store-keys.controller';

@Module({
  providers: [StoreKeysService],
  controllers: [StoreKeysController]
})
export class StoreKeysModule {}
