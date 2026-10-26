# 🧹NPKILL

[⬅️ Volver al README](../../README.md)

> npkill es una herramienta de línea de comandos escrita en Node.js que sirve para encontrar y eliminar carpetas node_modules en tu sistema de forma fácil y segura.

- [npkill - Documentación en NPM](https://www.npmjs.com/package/npkill)

### 🧩 ¿Para qué sirve?

- Cuando trabajás con muchos proyectos de Node.js, cada uno tiene su propia carpeta node_modules, que puede ocupar cientos de MB o incluso varios GB.
- npkill te permite:
  - Escanear tus carpetas (por ejemplo, todo tu disco o una carpeta específica).
  - Mostrar una lista de todos los node_modules encontrados, junto con su tamaño.
  - Eliminar los que elijas directamente desde la interfaz del terminal.

## ⚙️ Instalación

```bash
npm install -g npkill
```

No es necesario instalarlo, también puedes ejecutarlo sin instalación.

## 🚀 Uso básico

```bash
npkill
```

O también puedes ejecutarlo sin instalarlo:

- Para cualquier comando, solo anteponemos `npx` al mismo.

```bash
npx npkill
```

- Esto escaneará desde el directorio actual hacia abajo.
- Puedes moverte entre las opciones encontradas (carpetas node_module) mediante las flechas de dirección.
- Para eliminar la seleccionada, presionar barra espaciadora.

### Opciones útiles y flags:

`-d <ruta>` → Escanear una ruta específica.

```bash
npkill -d ~/Proyectos
```

- `--sort size` → Ordenar los resultados por tamaño.
- `--delete-all` → Eliminar todos los node_modules encontrados (usar con cuidado).

## 💡 Características destacadas

- Interfaz interactiva (usa las flechas para moverte y Enter para borrar).
- Muestra el tamaño de cada carpeta node_modules.
- Compatible con Windows, macOS y Linux.
- No requiere permisos especiales.
- Rápido, ya que usa streams para escanear sin cargar toda la estructura en memoria.

## 🧠 En resumen

- npkill = “npm killer” (de node_modules)
- 👉 Te ayuda a recuperar espacio en disco eliminando carpetas node_modules fácilmente, sin tener que buscarlas manualmente.

---

[⬅️ Volver al README](../../README.md)
