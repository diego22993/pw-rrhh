// support/utils/dataFactory.ts
export const createEmpleadoPayload = () => ({
  nombre: "Carlos",
  apellido: "Gómez",
  email: `test_${Date.now()}@gmail.com`,
  telefono: "321321321",
  rol: "Admin",
  usuario: `user_${Math.random().toString(36).substring(7)}`,
  contrasenia: "aB1234s@",
  fechaIngreso: "2026-06-30",
  horario: ""
});