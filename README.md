🛠️ Características Principales y Patrones
Inyección Automatizada de Tokens (State Management): El ApiClient intercepta y gestiona de forma síncrona el token JWT mediante el método setToken(), inyectándolo en el header Authorization: Bearer <token> de forma transparente para las peticiones posteriores dentro de los contextos aislados.

Enfoque Data-Driven (TDD): Todos los datos de prueba (flujos felices, negativos y de borde) se consumen de forma estricta desde archivos .json tipados automáticamente por el compilador de TypeScript.

Integración Nativa en Reportes (Test Steps): Las peticiones de red están envueltas en la función test.step() de Playwright, lo que permite visualizar jerárquicamente cada llamada HTTP (con su método, ruta y estados) directamente en el reporte interactivo interactivo HTML de Playwright.

Robustez de Logs con Winston: Registro avanzado de actividad en archivos locales independientes (/logs), capturando la traza exacta del cuerpo del error (response.text()) cuando un código de estado no entra en el rango 2xx.

Cero Redundancia de Entorno: Integración directa con la propiedad use.baseURL de Playwright, eliminando la necesidad de concatenar URLs manualmente y permitiendo la flexibilidad multi-ambiente.


⚙️ Requisitos Previos
Node.js (Versión 18 o superior recomendada)

Git

💻 Instalación y Configuración
Clonar el repositorio:

Bash
git clone [https://github.com/diego22993/pw-rrhh.git](https://github.com/diego22993/pw-rrhh.git)
cd pw-rrhh
Instalar las dependencias de Node.js:

Bash
npm install
Configurar el archivo de variables de entorno:
Asegúrate de tener tu archivo en config/.env con la siguiente estructura elemental:

Code snippet
VITE_API_URL=[https://qc-be-jr-ws.onrender.com](https://qc-be-jr-ws.onrender.com)
LANGUAGE=ES



⚡ Ejecución de Pruebas
Para correr toda la suite de pruebas en paralelo y modo headless (ideal para CI/CD):

Bash
npm test
Para ejecutar las pruebas abriendo la interfaz interactiva oficial de Playwright (UI Mode), ideal para debugging paso a paso:

Bash
npx playwright test --ui
Para desplegar de manera local el último reporte HTML autogenerado con los detalles visuales de la ejecución:

Bash
npx playwright show-report
📈 Buenas Prácticas de Contribución
No Hardcodear Elementos de Red: Cualquier nuevo Endpoint, Query Param o Header estático debe ser encapsulado dentro de support/api/Constants.ts.

Responsabilidad Única por Capa: Las aserciones (expect) pertenecen exclusivamente a los archivos .spec.ts. Las llamadas de red, desestructuración de respuestas y manejo de estados HTTP pertenecen a los Controladores y al Cliente.

Mantenimiento del Historial Limpio: El archivo .gitignore está preconfigurado para evitar la subida de dependencias (node_modules), reportes temporales (test-results/) y logs de depuración locales (logs/). No fuerces la subida de estos recursos.
"""
