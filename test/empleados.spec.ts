// tests/empleados.spec.ts
import { test, expect } from "@playwright/test";
import { ApiClient } from "../support/api/ApiClient";
import { AuthController } from "../support/api/controllers/AuthController";
import { EmpleadoController } from "../support/api/controllers/EmpleadoController";
import credenciales from "../data/auth/credenciales.json";

test.describe("Módulo de Empleados - API RESTful", () => {
  let apiClient: ApiClient;
  let empleadoController: EmpleadoController;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    const authController = new AuthController(apiClient);

    const loginResponse = await authController.login(
      credenciales.usuarioValido,
    );
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    apiClient.setToken(loginBody.data.token);

    empleadoController = new EmpleadoController(apiClient);
  });

  test("Debería obtener la lista de empleados exitosamente (200 OK)", async () => {
    const response = await empleadoController.listarEmpleados();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);
  });

  test("Debería rechazar la petición si el cliente no está autenticado (401 Unauthorized)", async () => {
    apiClient.setToken("");

    const response = await empleadoController.listarEmpleados();
    expect(response.status()).toBe(401);
  });
});
