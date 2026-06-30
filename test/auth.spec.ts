// tests/auth.spec.ts
import { test, expect } from "@playwright/test";
import { ApiClient } from "../support/api/ApiClient";
import { AuthController } from "../support/api/controllers/AuthController";
import credenciales from "../data/auth/credenciales.json";

test.describe("Módulo de Autenticación - API RESTful", () => {
  let authController: AuthController;

  test.beforeEach(({ request }) => {
    const apiClient = new ApiClient(request);
    authController = new AuthController(apiClient);
  });

  test("Debería iniciar sesión exitosamente con credenciales válidas (200 OK)", async () => {
    const response = await authController.login(credenciales.usuarioValido);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("data");
    expect(body.data).toHaveProperty("token");
    expect(typeof body.data.token).toBe("string");
    expect(body.data.token.length).toBeGreaterThan(0);
  });

  test("Debería rechazar el acceso con contraseña incorrecta (401 Unauthorized)", async () => {
    const response = await authController.login(
      credenciales.contraseniaInvalida,
    );

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty("error");

    expect(body.error).toMatch(/usuario o contraseña incorrectos/i);
  });

  test("Debería rechazar el acceso si el usuario no existe (401 Unauthorized)", async () => {
    const response = await authController.login(
      credenciales.usuarioInexistente,
    );

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.error).toMatch(/usuario o contraseña incorrectos/i);
  });

  test("Debería retornar 400 Bad Request si faltan campos obligatorios", async () => {
    const response = await authController.login(credenciales.payloadIncompleto);

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toMatch(/obligatorios|required/i);
  });

  test("Debería retornar 500 Internal Server Error si el payload enviado está vacío", async () => {
    const payloadVacio = "";
    const response = await authController.login(payloadVacio);

    expect(response.status()).toBe(500);

    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toMatch(
      /error interno del servidor|internal server error/i,
    );
  });
});
