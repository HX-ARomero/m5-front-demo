# ❌ Errores comunes en TypeScript (y cómo evitarlos)

[⬅️ Volver al README](../../README.md)

> Documento de referencia rápida orientado a **VS Code (Vista previa Markdown)**.
> Todos los enlaces usan **anclas estándar `(#...)`**, compatibles con VSC.

---

## 🧭 Índice
- [Usar `any` indiscriminadamente](#usar-any-indiscriminadamente)
- [Confundir `type` con `interface`](#confundir-type-con-interface)
- [No tipar el retorno de funciones](#no-tipar-el-retorno-de-funciones)
- [Abusar de `as` (type assertions)](#abusar-de-as-type-assertions)
- [No manejar `undefined` y `null`](#no-manejar-undefined-y-null)
- [Olvidar el `strict` mode](#olvidar-el-strict-mode)
- [Usar `enum` cuando no hace falta](#usar-enum-cuando-no-hace-falta)
- [No aprovechar los Utility Types](#no-aprovechar-los-utility-types)
- [Confundir uniones con intersecciones](#confundir-uniones-con-intersecciones)
- [No hacer narrowing](#no-hacer-narrowing)
- [Tipar mal arrays y objetos](#tipar-mal-arrays-y-objetos)
- [No tipar Promises](#no-tipar-promises)
- [Ignorar errores del compilador](#ignorar-errores-del-compilador)

---

## Usar `any` indiscriminadamente

❌ **Error**
```ts
let data: any = obtenerDatos();
```

✅ **Correcto**
```ts
let data: unknown = obtenerDatos();
```

💡 `any` desactiva el sistema de tipos. `unknown` obliga a validar antes de usar.

---

## Confundir `type` con `interface`

❌ **Error**
```ts
type Usuario = {
  nombre: string;
};

type Usuario = {
  edad: number;
}; // ❌ no se puede reabrir
```

✅ **Correcto**
```ts
interface Usuario {
  nombre: string;
}

interface Usuario {
  edad: number;
}
```

💡 Usá `interface` para modelos extensibles y `type` para uniones o tipos complejos.

---

## No tipar el retorno de funciones

❌ **Error**
```ts
function calcular(a: number, b: number) {
  return a + b;
}
```

✅ **Correcto**
```ts
function calcular(a: number, b: number): number {
  return a + b;
}
```

💡 Evita inferencias incorrectas cuando la función crece.

---

## Abusar de `as` (type assertions)

❌ **Error**
```ts
const input = document.getElementById("edad") as HTMLInputElement;
input.value = "30";
```

✅ **Correcto**
```ts
const input = document.getElementById("edad");
if (input instanceof HTMLInputElement) {
  input.value = "30";
}
```

💡 `as` no valida en runtime, solo le “miente” al compilador.

---

## No manejar `undefined` y `null`

❌ **Error**
```ts
function imprimir(nombre?: string) {
  console.log(nombre.toUpperCase());
}
```

✅ **Correcto**
```ts
function imprimir(nombre?: string) {
  if (!nombre) return;
  console.log(nombre.toUpperCase());
}
```

---

## Olvidar el `strict` mode

❌ **Error** (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

✅ **Correcto**
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

💡 `strict` previene la mayoría de los bugs silenciosos.

---

## Usar `enum` cuando no hace falta

❌ **Error**
```ts
enum Estado {
  Activo,
  Inactivo
}
```

✅ **Correcto (más simple)**
```ts
type Estado = "activo" | "inactivo";
```

💡 Los enums generan JS extra; los literal types no.

---

## No aprovechar los Utility Types

❌ **Error**
```ts
interface Usuario {
  nombre: string;
  edad: number;
}

interface UsuarioParcial {
  nombre?: string;
  edad?: number;
}
```

✅ **Correcto**
```ts
type UsuarioParcial = Partial<Usuario>;
```

---

## Confundir uniones con intersecciones

❌ **Error**
```ts
type A = { a: string };
type B = { b: string };

type C = A | B;
```

💥 `C` puede ser **solo A o solo B**

✅ **Correcto**
```ts
type C = A & B;
```

---

## No hacer narrowing

❌ **Error**
```ts
function imprimir(valor: string | number) {
  console.log(valor.toUpperCase());
}
```

✅ **Correcto**
```ts
function imprimir(valor: string | number) {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  }
}
```

---

## Tipar mal arrays y objetos

❌ **Error**
```ts
let usuarios: object[] = [];
```

✅ **Correcto**
```ts
interface Usuario {
  nombre: string;
}

let usuarios: Usuario[] = [];
```

---

## No tipar Promises

❌ **Error**
```ts
function obtenerDatos() {
  return fetch("/api");
}
```

✅ **Correcto**
```ts
function obtenerDatos(): Promise<Response> {
  return fetch("/api");
}
```

---

## Ignorar errores del compilador

❌ **Error**
```ts
// @ts-ignore
usuario.edad.toFixed();
```

✅ **Correcto**
```ts
if (usuario.edad !== undefined) {
  usuario.edad.toFixed();
}
```

💡 Si TS se queja, normalmente tiene razón.

---

## ✅ Recomendaciones finales

- Preferí **tipos explícitos** en código crítico
- Evitá `any`
- Activá `strict`
- Usá el autocompletado de VS Code como guía

---

[⬅️ Volver al README](../../README.md)