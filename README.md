# APC Hiztegia

Aplicación web para consultar y practicar vocabulario y verbos en euskera.

## Funcionalidades

- **Hiztegia Praktikatu:** ejercicios en euskera o castellano, filtrados por nivel, curso y fecha. Acepta los distintos significados y variantes de una palabra; al mezclar cursos agrupa las entradas con la misma palabra en euskera.
- **Hiztegia:** consulta del vocabulario con filtros por nivel, curso y fecha, y búsqueda por euskera, variantes, castellano, nivel o fecha. Muestra significados, notas y variantes cuando están disponibles.
- **Aditzak Praktikatu:** práctica de verbos trinkoak y auxiliares. Permite seleccionar verbos y tiempos (presente y pasado), seleccionar todos los trinkoak y excluir las formas de **hi/hik**.
- **Aditza Taulak:** consulta de tablas de conjugación. Permite cambiar el orden de **ni/zu** y ocultar las formas **hi/hik**.
- **Administración:** en `/menuAdmin`, las cuentas autorizadas pueden iniciar sesión y gestionar el vocabulario (añadir, editar, borrar y filtrar palabras). Al añadir una palabra se selecciona el día y mes de la clase; al editarla se conserva su fecha. El acceso de escritura está protegido también por las políticas RLS de Supabase.
- **Info:** guía de uso y formulario para reportar errores disponible en el pie de la aplicación.

## Datos

El vocabulario y las conjugaciones se cargan desde Supabase, por lo que la aplicación necesita conexión a Internet. La administración requiere una cuenta autorizada; los permisos de escritura se controlan en la base de datos mediante políticas RLS.

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

Ejecuta las pruebas unitarias:

```bash
npm test
```

## Tecnologías

- Angular y TypeScript
- Supabase
- Bootstrap
- Vitest

El sitio indica que su trabajo está licenciado bajo [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es).
