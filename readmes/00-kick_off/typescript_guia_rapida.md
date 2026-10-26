# 📘 TypeScript – Guía rápida de referencia

[⬅️ Volver al README](../../README.md)

> Guía completa y ordenada de TypeScript, pensada como documentación rápida de referencia, con ejemplos simples y claros.

> Incluye secciones desplegables con ejemplos prácticos, ideales para profundizar en cada concepto cuando sea necesario.

> Los nombres de variables están en castellano con el objeto de hacer mas claros los ejemplos.

Creado por Ariel Romero / [Sígueme en LinkedIn](www.linkedin.com/in/ariel-alejandro-romero-fullstack-developer)

## Índice

- [Tipos primitivos](#tipos-primitivos)
- [Funciones y tipado](#funciones-y-tipado)
- [Parámetros opcionales y por defecto](#parámetros-opcionales-y-por-defecto)
- [Type (alias de tipos)](<#type-(alias-de-tipos)>)
- [Interfaces](#interfaces)
- [Type vs Interface](#type-vs-interface)
- [Utility Types](#utility-types)
- [Enums](#enums)
- [Uniones y tipos literales](#uniones-y-tipos-literales)
- [Narrowing](#narrowing)
- [Arrays y Tuplas](#arrays-y-tuplas)
- [any unknown never](#any-unknown-never)
- [Type Assertions](#type-assertions)
- [Clases](#clases)
- [Generics](#generics)
- [Promises](#promises)
- [Módulos](#módulos)

---

## Tipos primitivos

```ts
let nombre: string = "Homero";
let edad: number = 39;
let usuarioActivo: boolean = true;
let propiedadIndefinida: undefined = undefined;
let propiedadNnula: null = null;
```

[Volver al Índice](#índice)

---

## Funciones y tipado

```ts
const calculaArea = (lado1: number, lado2: number): number => {
  return lado1 * lado2;
};
```

Funciones sin retorno:

```ts
const saludar = (): void => {
  console.log("Hola Mundo!!!");
};
```

[Volver al Índice](#índice)

---

## Parámetros opcionales y por defecto

```ts
const presentarUsuario = (
  nombre: string,
  apellido?: string, // Parámetro opcional
  edad: string = "No especificada", // Parámetro por defecto
): void => {
  if (!apellido) {
    console.log(`Nombre: ${nombre}, Edad: ${edad}`);
  } else {
    console.log(`Nombre: ${nombre}, Apellido: ${apellido}, Edad: ${edad}`);
  }
};
```

[Volver al Índice](#índice)

---

## Type (alias de tipos)

```ts
type TUsuario = {
  nombre: string;
  apellido: string;
  edad: number;
};
```

### Intersección (&) en Alias de Tipo

```ts
type TEmpleado = TUsuario & {
  puesto: string;
  empleadoDelMes: boolean;
};
```

[Volver al Índice](#índice)

---

## Interfaces

```ts
interface IProducto {
  nombre: string;
  precio: number;
}
```

### Extensión

```ts
interface IProductoElectronico extends IProducto {
  marca: string;
  modelo: string;
}
```

[Volver al Índice](#índice)

---

## Type vs Interface

| Característica     | type            | interface  |
| ------------------ | --------------- | ---------- |
| Uniones (\|)       | ✅              | ❌         |
| Intersecciones (&) | ✅              | ✅         |
| Reapertura         | ❌              | ✅         |
| Uso común          | tipos complejos | modelos OO |

### 📌 Nota: Modelos OO => Orientado a Objetos

- Suelen tener identidad clara (Usuario, Producto, Pedido)
- Suelen ser usadas en clases
- Suelen extenderse o reabrirse con el tiempo
- Suelen representar “qué es algo”, no contienen combinaciones lógicas

[Volver al Índice](#índice)

---

## Utility Types

- Se crea un nuevo Alias de tipos basado en una Interfaz existente

### Partial

```ts
// TUsuarioParcial permite que todas las propiedades de IUsuario sean opcionales:
type TUsuarioParcial = Partial<IUsuario>;
```

<details> <summary>Ejemplo...</summary>

```ts
interface IUsuario {
  nombre: string;
  email: string;
  edad: number;
}

type TUsuarioParcial = Partial<IUsuario>;

// Todas las propiedades pasan a ser opcionales, se tiene el mismo resultado que al crear lo siguiente:
type TUsuarioParcial = {
  nombre?: string;
  email?: string;
  edad?: number;
};
```

</details>

### Omit

```ts
// TUsuarioSinEdad tiene todas las propiedades de IUsuario excepto "edad":
type TUsuarioSinEdad = Omit<IUsuario, "edad">;
```

<details> <summary>Ejemplo...</summary>

```ts
interface IUsuario {
  nombre: string;
  email: string;
  edad: number;
}

type TUsuario = Partial<IUsuarioOmiteEdad>;

// IUsuarioOmiteEdad omite la propiedad "edad", se tiene el mismo resultado que al crear lo siguiente:
type IUsuarioOmiteEdad = {
  nombre: string;
  email: string;
};
```

</details>

### Pick

```ts
// TUsuarioNombre solo incluye la propiedad "nombre" de IUsuario:
type TUsuarioNombre = Pick<IUsuario, "nombre">;
```

<details> <summary>Ejemplo...</summary>

```ts
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

type TUsuario = Partial<IUsuarioNombre>;

// IUsuarioNombre solo toma la propiedad "nombre", se tiene el mismo resultado que al crear lo siguiente:
interface IUsuarioNombre {
  nombre: string;
}
```

</details>

### Required

```ts
// Todas las propiedades de ITarea pasan a ser obligatorias:
type TRequerido = Required<IUsuario>;
```

<details> <summary>Ejemplo...</summary>

```ts
interface Usuario {
  nombre: string;
  email?: string;
  edad?: number;
}

type TRequerido = Partial<IUsuario>;

// Ahora ninguna propiedad en TRequerido es opcional, se tiene el mismo resultado que al crear lo siguiente:
type TRequerido = {
  nombre: string;
  email: string;
  edad: number;
};
```

</details>

### Readonly

```ts
// Todas las propiedades de ITarea pasan a ser de solo lectura:
type TSoloLectura = Readonly<IUsuario>;
```

<details> <summary>Ejemplo...</summary>

```ts
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

type TSoloLectura = Partial<IUsuario>;

// Ahora no se permite modificar las propiedades, se tiene el mismo resultado que al crear lo siguiente:
type TSoloLectura = {
  readonly nombre: string;
  readonly email: string;
  readonly edad: number;
};
// Una vez creado un objeto tipado con TSoloLectura, no se podrán modificar sus valores.
```

</details>

---

[Volver al Índice](#índice)

## Interfaces creadas en base a otras Interfaces

- Se pueden crear interfaces basadas en otras interfaces.
- Pero no todas las transformaciones que hacen los Utility Types se pueden expresar como Inferfaces.

### Extender Interfaces

```ts
// Crear o modificar una interfaz a partir de otra:
interface ITarea {
  titulo: string;
  descripcion?: string;
}

interface ITareaCompleta extends ITarea {
  descripcion: string; // Ahora es obligatoria
  propietario: string; // Nueva propiedad
}
```

### Reapertura de Interfaces

- Esto no es soportado por los Alias de tipos.

```ts
interface ITarea {
  titulo: string;
}

// Podemos redeclarar una Interfaz y agregar mas propiedades:
interface ITarea {
  descripcion?: string; // Nueva propiedad
}
```

- ❌ Los Utylity Types no funcionan con Interfaces

[Volver al Índice](#índice)

---

## Enums

```ts
enum TGeneroMusical {
  ROCK = "Rock",
  JAZZ = "Jazz",
  CLASICA = "Clásica",
  POP = "Pop",
  HIPHOP = "Hip-Hop",
}
```

[Volver al Índice](#índice)

---

## Uniones y tipos literales

```ts
type TInstrumento = "Guitarra" | "Piano" | "Batería" | "Saxofón" | "Bajo";
```

```ts
type TEstado = "activo" | "inactivo" | "pendiente";
```

[Volver al Índice](#índice)

---

## Narrowing

```ts
function imprimir(usuario: TUsuario) {
  if ("instrumentos" in usuario) {
    console.log("Estudiante", usuario.instrumentos);
  } else {
    console.log("Profesor", usuario.generoEspecialidad);
  }
}
```

[Volver al Índice](#índice)

---

## Arrays y Tuplas

```ts
let numeros: number[] = [1, 2, 3];
let nombres: Array<string> = ["Homero", "Marge"];
```

```ts
type Coordenada = [number, number];
const punto: Coordenada = [10, 20];
```

[Volver al Índice](#índice)

---

## any unknown never

```ts
let cualquierCosa: any = 5;

let valor: unknown;

function errorFatal(): never {
  throw new Error("Error crítico");
}
```

[Volver al Índice](#índice)

---

## Type Assertions

```ts
const input = document.getElementById("nombre") as HTMLInputElement;
```

[Volver al Índice](#índice)

---

## Clases

```ts
class Persona {
  public nombre: string;
  private edad: number;
  protected activo: boolean;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
    this.activo = true;
  }
}
```

[Volver al Índice](#índice)

---

## Generics

```ts
function identidad<T>(valor: T): T {
  return valor;
}
```

[Volver al Índice](#índice)

---

## Promises

```ts
function obtenerDatos(): Promise<string> {
  return Promise.resolve("Datos cargados");
}
```

[Volver al Índice](#índice)

---

## Módulos

```ts
export interface Usuario {
  nombre: string;
}

import { Usuario } from "./usuario";
```

---

[⬅️ Volver al README](../../README.md)