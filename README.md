# APCHiztegia

Aplicación web para consultar y practicar vocabulario y verbos en euskera.

## Funcionalidades

- **Hiztegia Praktikatu:** practica palabras con filtros por curso y fecha.
- **Hiztegia:** consulta y busca vocabulario.
- **Aditzak Praktikatu:** practica verbos compactos y auxiliares, seleccionando verbos y tiempos.
- **Aditza Taulak:** consulta tablas de conjugación y cambia el orden de los pronombres.
- **Info:** guía de uso e información de la aplicación.

Los datos de vocabulario y verbos se obtienen de JSONBin, por lo que la aplicación necesita conexión a Internet para cargarlos.

## Requisitos

- Node.js y npm compatibles con la versión de Angular del proyecto.

## Instalación y desarrollo

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre `http://localhost:4200/` en el navegador. El servidor recarga la aplicación cuando detecta cambios en el código.

## Compilación

Genera la compilación de producción:

```bash
npm run build
```

Los archivos generados se guardan en `dist/`.

## Pruebas

Ejecuta las pruebas unitarias con Vitest:

```bash
npm test
```

## Tecnologías

- Angular
- TypeScript
- Bootstrap
- Vitest

El sitio indica que su trabajo está licenciado bajo [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es).
