// support/api/controllers/AuthController.ts
import { ApiClient } from "../ApiClient";
import { HttpMethod, ENDPOINTS } from "../Constants";

export class AuthController {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async login(payload: any) {
    return await this.apiClient.sendRequest(
      HttpMethod.POST,
      ENDPOINTS.POST_LOGIN_RRHH.endpoint,
      payload
    );
  }
}