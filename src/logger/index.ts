import { LoggerService } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as DailyRotateFile from "winston-daily-rotate-file";
import * as winston from "winston";
import { utilities as nestWinstonModuleUtilities } from "nest-winston/dist/winston.utilities";

export default (): LoggerService  => {
  return WinstonModule.createLogger({
    transports: [
      new DailyRotateFile({
        filename: '%DATE%_error.log',
        dirname: 'logs',
        zippedArchive: true,
        maxSize: '25m',
        maxFiles: '30d',
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new DailyRotateFile({
        filename: '%DATE%_combined.log',
        dirname: 'logs',
        zippedArchive: true,
        maxSize: '25m',
        maxFiles: '30d',
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike()
        )
      }),
      // new winston.transports.File({
      //   filename: "error.log", level: "error",
      //   dirname: "logs",
      //   format: winston.format.combine(
      //     winston.format.timestamp(),
      //     nestWinstonModuleUtilities.format.nestLike()
      //   )
      // }),
      // new winston.transports.File({
      //   filename: "combined.log",
      //   dirname: "logs",
      //   format: winston.format.combine(
      //     winston.format.timestamp(),
      //     nestWinstonModuleUtilities.format.nestLike()
      //   )
      // })
    ]
  })
}