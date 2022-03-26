import { Module } from '@nestjs/common';
import { RefreshTokenCollectionModule } from './collections/refresh-token/refresh-token-collection.module';

@Module({
  imports: [RefreshTokenCollectionModule]
})
export class RefreshTokenModule {}
