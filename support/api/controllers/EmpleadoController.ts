//support/api/controllers/EmpleadoController.ts
import { ApiClient } from "../ApiClient";
import { HttpMethod, ENDPOINTS } from "../Constants";

export class EmpleadoController {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async listarEmpleados() {
    return await this.apiClient.sendRequest(
      HttpMethod.GET,
      ENDPOINTS.GET_EMPLEADOS_RRHH.endpoint,
    );
  }
}
