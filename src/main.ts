import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { utilities as nestWinstonModuleUtilities } from "nest-winston/dist/winston.utilities";
import * as DailyRotateFile from 'winston-daily-rotate-file';
import getLoggerConfig from './logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerConfig()
  });
  app.setGlobalPrefix('v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  await app.listen(5000, () => { console.log(`Server running at 5000`) });
}
bootstrap();
