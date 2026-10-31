# APC Hiztegia

Aplicación web para consultar y practicar vocabulario en euskera y conjugaciones verbales. Está pensada para repasar las palabras trabajadas en clase y practicar a tu ritmo.

## Funcionalidades

- **Hiztegia Praktikatu:** practica traducciones entre euskera y castellano. Puedes elegir el idioma de las preguntas y filtrar por curso y fecha.
- **Hiztegia:** consulta y busca vocabulario en ambos idiomas, filtrando por palabra, curso o fecha.
- **Aditzak Praktikatu:** practica verbos trinkos en presente (*orainaldia*) y pasado (*lehenaldia*), seleccionando los verbos y tiempos que quieras repasar.
- **Info:** guía rápida de uso integrada en la aplicación.

Los ejercicios permiten hasta tres intentos por respuesta. Las palabras y ejercicios pendientes vuelven a aparecer hasta que se aciertan.

## Tecnologías

- Angular
- TypeScript
- Bootstrap
- Datos de vocabulario servidos desde JSONBin

## Requisitos

- Node.js y npm

## Instalación y desarrollo

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/alaznepardocu/hiztegia.git
cd hiztegia
npm install
```

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200). La aplicación se recarga automáticamente al modificar el código. Para cargar el vocabulario es necesaria una conexión a Internet.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la compilación de producción en `dist/jsonPostUsers/browser/`. |
| `npm test` | Ejecuta las pruebas con Angular y Vitest. |
| `npm run watch` | Compila en modo desarrollo y observa los cambios. |

## Despliegue

El proyecto incluye configuración para Netlify. La configuración ejecuta `npm run build` y publica `dist/jsonPostUsers/browser`.

## Contribuir

Si encuentras un error o tienes una sugerencia, puedes abrir una incidencia en GitHub. También puedes utilizar el enlace para reportar errores disponible en el pie de página de la aplicación.
