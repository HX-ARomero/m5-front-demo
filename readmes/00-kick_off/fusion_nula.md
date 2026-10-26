# El operador de fusión nula "??" (Nullish Coalescing Operator)

[⬅️ Volver al README](../../README.md)

- Sirve para asignar un valor por defecto solo cuando algo es null o undefined.

📘 Sintaxis:

```js
variable ?? valorPorDefecto;
```

📗 Ejemplo:

```js
const nombre = null;
const nombreMostrar = nombre ?? "Invitado";
console.log(nombreMostrar); // "Invitado"
```

📗 Otro ejemplo:

```js
let puntos = 0;
let total = puntos ?? 10;
console.log(total); // 0 (¡No usa el valor por defecto!)
```

👉 A diferencia de ||, que considera falsy (0, "", false), ?? solo reemplaza cuando el valor es null o undefined.

📗 Ejemplo:

```js
let puntos = 0;
let total = puntos || 10;
console.log(total); // 0 (¡Si usa el valor por defecto!, ya que 0 es Falsy)
```

## 💡Comparación rápida
- ??: Asignar valor por defecto Solo si la opción es "null" o "undefined".
- OR (||): Asignar valor por defecto Si la opción es "Falsy.

---

[⬅️ Volver al README](../../README.md)