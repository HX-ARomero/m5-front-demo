# Conceptos fundamentales de testing

[⬅️ Volver al README](../../README.md)

## 🧩 Fixtures

Los **fixtures** son datos de prueba reutilizables que representan entidades de nuestra aplicación.

Permiten:

* Mantener datos consistentes entre diferentes tests.
* Evitar repetir la creación manual de objetos.
* Facilitar la lectura y el mantenimiento de los tests.
* Crear escenarios de prueba conocidos y predecibles.

Por ejemplo, podemos tener un fixture para representar un usuario, un producto o un conjunto de productos:

```ts
const mockUser = {
  id: "user-1",
  name: "Ariel",
  email: "test@mail.com",
};
```

De esta manera, distintos tests pueden reutilizar los mismos datos sin tener que definirlos nuevamente.

---

## 🌳 `renderWithProviders`

`renderWithProviders` es una función auxiliar que permite **renderizar un componente dentro del árbol de Providers que necesita para funcionar correctamente**.

En una aplicación React podemos tener diferentes contextos:

```text
AuthProvider
  └── ProductsProvider
      └── CartProvider
          └── OrdersProvider
              └── Componente
```

Un componente que utiliza alguno de estos contextos no puede probarse correctamente si los Providers necesarios no están presentes.

`renderWithProviders` centraliza esta configuración y evita tener que repetirla en cada test.

Además, puede permitir **precargar estados iniciales**, por ejemplo:

* un usuario autenticado;
* una lista de productos;
* productos dentro del carrito;
* un estado determinado de una orden.

Esto permite que un mismo componente pueda probarse en diferentes escenarios.

Por ejemplo:

```text
Usuario no autenticado
        ↓
      Test

Usuario autenticado
        ↓
      Test

Usuario autenticado + carrito con productos
        ↓
      Test
```

El objetivo es que el test pueda concentrarse en el comportamiento que queremos verificar, y no en la configuración necesaria para montar el componente.

---

## 🔄 Test de Reducer

Un **reducer** es una función pura que transforma un estado a partir de una acción:

```text
estado actual + acción → nuevo estado
```

Por ejemplo:

```ts
const newState = reducer(state, action);
```

Como el reducer es una función pura, **no necesitamos renderizar componentes ni utilizar React para probarlo**.

Testeamos directamente la lógica encargada de transformar el estado.

Por ejemplo:

```text
Estado inicial
      +
   Acción
      ↓
   Reducer
      ↓
Nuevo estado
```

Podemos verificar que:

* una acción agregue correctamente un elemento;
* una acción elimine un elemento;
* una acción modifique una cantidad;
* una acción vacíe el carrito;
* el estado resultante sea el esperado.

### ¿Qué estamos testeando?

La **lógica de transformación del estado**, independientemente de la interfaz.

---

## 🪝 Test de Hooks

En los tests de hooks verificamos el **comportamiento del hook y de la lógica que utiliza**.

Dependiendo del hook, podemos involucrar diferentes piezas de la aplicación:

* `useState`;
* `useReducer`;
* Context;
* Providers;
* servicios o funciones auxiliares.

Por ejemplo, un hook como:

```ts
const { items, addItem, removeItem } = useCart();
```

puede depender internamente de un `CartProvider` y de un reducer.

En ese caso, el test puede verificar que:

```text
useCart()
   ↓
Context
   ↓
Provider
   ↓
Reducer
   ↓
Estado actualizado
```

El objetivo es comprobar el comportamiento **desde la perspectiva del consumidor del hook**, sin necesidad de probar la interfaz gráfica.

### ¿Qué estamos testeando?

La **lógica y el comportamiento que expone el hook**, no los detalles visuales de los componentes que eventualmente lo utilizan.

---

## 🖥️ Test de Componentes

En los tests de componentes verificamos el **resultado observable de la aplicación en la interfaz**.

La idea principal es interactuar con el componente de una manera similar a como lo haría un usuario.

Por ejemplo:

* hacer `click`;
* escribir en un campo;
* seleccionar una opción;
* enviar un formul

---

[⬅️ Volver al README](../../README.md)