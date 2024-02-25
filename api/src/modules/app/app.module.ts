import { Module } from '@nestjs/common';
import { ConfigModule } from '@/modules/config/config.module';
import { NotesModule } from '@/modules/notes/notes.module';
import { AppService } from '@/modules/app/app.service';
import { DbModule } from '@/modules/db/db.module';

@Module({
  imports: [ConfigModule, DbModule, NotesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
