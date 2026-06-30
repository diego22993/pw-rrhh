// support/utils/Logger.ts
import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    // 1. Consola con colores para desarrollo local
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
      ),
    }),
    // 2. Archivo para guardar errores automáticamente
    new winston.transports.File({ 
      filename: "logs/error.log", 
      level: "error" 
    }),
    // 3. Archivo para el historial completo de peticiones.
    new winston.transports.File({ 
      filename: "logs/combined.log" 
    }),
  ],
});