# Tailwind CSS

[⬅️ Volver al README](../../README.md)

## Crear nuevo proyecto de React + TS en Vite

- [Documentación de React](https://es.react.dev/)

```bash
npm create vite@latest ecommerce-ft74 -- --template react-ts
```

## Instalación y Configuración de Tailwind CSS

- [Documentación de Tailwind CSS](https://tailwindcss.com/)

### 1. Instalación de Dependencias

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Configuración en "vite.config.ts"

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 3. Agregar Tailwind CSS a nuestro proyecto

- En "src/index.css" ó en "src/styles/globals.css".
  - Si utilizamos "src/styles/globals.css" debemos modificar "src/main.tsx".

```css
@import "tailwindcss";

/* Estilos Globales Aquí: */
```

## Jerarquía de Componentes en React

<p align="center">
  <img src="./assets/jerarquia_ui.jpg" width="80%">
</p>

---

[⬅️ Volver al README](../../README.md)
