// support/api/ApiClient.ts
import { APIRequestContext, test } from "@playwright/test";
import { HttpMethod, HEADERS } from "./Constants";
import { logger } from "../utils/logger";

export class ApiClient {
  private requestContext: APIRequestContext;
  private token: string | null = null;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  /**
   * Guarda el token JWT para ser usado en las siguientes peticiones.
   */
  setToken(token: string): void {
    this.token = token;
  }

  /**
   * Método genérico para todas las peticiones HTTP
   */
  async sendRequest(
    method: HttpMethod,
    endpoint: string,
    body?: any,
    customHeaders?: Record<string, string>,
  ) {
    const combinedHeaders = {
      //...HEADERS,
      ...this.getAuthHeader(),
      ...customHeaders,
    };

    const stepTitle = `API Request: ${method} ${endpoint}`;

    return await test.step(stepTitle, async () => {
      logger.info(`Enviando ${method} a ${endpoint} `);

      const response = await this.requestContext.fetch(endpoint, {
        method: method,
        headers: combinedHeaders,
        data: body,
      });

      const status = response.status();

      if (response.ok()) {
        logger.info(`Respuesta Exitosa [${status}] de ${method} ${endpoint}`);
      } else {
        let errorBody = "";
        try {
          errorBody = await response.text();
        } catch {
          errorBody = "No body";
        }

        logger.error(
          `Petición Fallida [${status}] en ${method} ${endpoint}. Detalles: ${errorBody}`,
        );
      }

      return response;
    });
  }

  /**
   * Genera el header de autorización si el token está seteado
   */
  private getAuthHeader(): Record<string, string> {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }
}
