<hr>
<h1 align='center'>🤯 Métodos de Arrays 🤯</h1>
<p align='right'> Ariel Romero ⠀⠀⠀⠀⠀</p>
<p align='right'> Daniel Calderón (Colaborador)</p>
<hr>
<br>

[⬅️ Volver al README](../../README.md)

Esta es una guía práctica donde desarrollaremos la mayoría de los conceptos sobre arreglos y sus principales métodos.

Te recomendamos que la visualices abriendo la vista previa en tu editor favorito.

Esperamos te sea de utilidad 💛

<hr>
<br>

> El objeto array es un conjunto ordenado de datos por posiciones y todos asociados en una sola variable. La sintaxis de un arreglo es muy simple. Los elementos del arreglo se envuelven entre corchetes y se separan con coma. Podremos acceder a estos distintos datos de manera independiente o agrupándolos. Cabe resaltar que un array es un objeto. Veamos un ejemplo que creamos un array que contenga números, cadenas de texto y booleanos. Cada elemento del arreglo puede ser de cualquier tipo (incluso otros arreglos!).

<br>

```javascript
let array = [25, "zapatos", true, ["casa", 51, false]];
console.log(typeof array); //object
```

El manejo de un array se puede hacer a traves de su indice o su valor. Veamos un ejemplo donde podremos identificarlos de manera mas eficiente.

```javascript
let numeros = [1, 3, 5, 7, 9]//---> Estos serian los elementos separados por un coma (,)
               0  1  2  3  4 //---> Estos serian el indice o posición que ocupa dentro del array.
```

## Aclaraciones:

- En la misma línea, en forma de comentario se describe el "retorno" que tendrian al usar la extension Quokka de vscode.
- La salida siempre se hace a travez de un `console.log()`. Seeria muy importante ver los diferentes metodos de `console` `.log` `.table` etc. 😜. y para los mas curioso ver como agragr estilos a un `console` 😜🤯😜🤯😜🤯

Bueno, Ahora si. vamos a lo nuestro 😜

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.some((e) => e === "🍇"); // true

console.log(array1);
// ["🍎", "🍋", "🍇"]
```

## Declarando Arrays

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined
console.log(array1);
// [ "🍎", "🍋", "🍇" ]

const array2 = new Array("🍌", "🍅", "🍒"); // undefined
console.log(array2);
// [ "🍌", "🍅", "🍒" ]

const array3 = new Array(2); // undefined
console.log(array3);
// [ <2 empty items> ] // [ undefined, undefined ]
```

## Indices y longitud (index, length)

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1[0]; // "🍎"
array1[1]; // "🍋"
array1[-2]; // "🍋"
array1[-1]; // "🍇"

array1.length; // 3
```

## Agregar elementos a un array

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.push("🍊"); // 4
console.log(array1);
// [ "🍎", "🍋", "🍇", "🍊" ]

array1.unshift("🍍"); // 5
console.log(array1);
// [ "🍍", "🍎", "🍋", "🍇", "🍊" ]
```

## Eliminar elementos de un array

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.pop(); // "🍊"
console.log(array1);
// [ "🍍", "🍎", "🍋", "🍇" ]

array1.shift(); // "🍍"
console.log(array1);
// [ "🍎", "🍋", "🍇" ]
```

## ¿El array es un array?

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

Array.isArray([]); // true
Array.isArray(array1); // true
Array.isArray("🍎"); // false
Array.isArray({}); // false
```

## Destructuración (destructuring)

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined
const array2 = new Array("🍌", "🍅", "🍒"); // undefined

const [manzana, limon, uva] = array1; // undefined
console.log(manzana);
// "🍎"
console.log(limon);
// "🍋"
console.log(uva);
// "🍇"

const [frutilla, pera = "🍐"] = ["🍓"]; // undefined
console.log(frutilla);
// "🍓";
console.log(pera);
// "🍐";

const [banana, , cereza] = array2;
console.log(banana);
// "🍌"
console.log(cereza);
// "🍒"

array1.push(array2); // undefined
console.log(array1);
// ["🍎", "🍋", "🍇", ["🍌", "🍅", "🍒"]]
console.log(array1[3][0]);
// "🍌"
```

## Operador de propagación (spread operator)

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

const [manzana, ...frutas] = array1; // undefined
console.log(manzana);
// "🍎"
console.log(frutas);
// ["🍋", "🍇"]
```

## Copiar array

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

const array1Copy1 = array1.slice(); // undefined
console.log(array1Copy);
// [ "🍎", "🍋", "🍇" ]

const array1Copy2 = [...array1]; // undefined
console.log(array1Copy2);
// [ "🍎", "🍋", "🍇" ]
```

## Intercambiar valores

```js
let manzana = "🍋"; // undefined
let limon = "🍎"; // undefined
[manzana, limon] = [limon, manzana];
console.log(manzana);
// "🍎"
console.log(limon);
// "🍋"
```

## Fusionar arrays con spread operator

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined
const array2 = new Array("🍌", "🍅", "🍒"); // undefined

const arrayFusionado = [...array1, array2]; // undefined
console.log(arrayFusionado);
// ["🍎", "🍋", "🍇", "🍌", "🍅", "🍒"]
```

## Fusionar arrays con .concat()

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined
const array2 = new Array("🍌", "🍅", "🍒"); // undefined

const mergedArray1 = array1.concat(array2); // undefined
console.log(arrayFusionado);
// ["🍎", "🍋", "🍇", "🍌", "🍅", "🍒"]

const mergedArray2 = array1.concat("🍊");
console.log(mergedArray2);
// ["🍎", "🍋", "🍇", "🍊"]
```

## Vaciar Array

```js
let array1 = ["🍎", "🍋", "🍇"]; // undefined
const array2 = new Array("🍌", "🍅", "🍒"); // undefined

array1 = []; // []
console.log(array1);
// []

array2.length = 0; // 0
console.log(array1);
// []
```

# Métodos de iterador

- Son métodos de arrays
- Iteran sobre el array
- No modifican el array original

#### Que utilizan callback

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined
const array5 = ["🍊", "🍊", "🍊"];

array1.filter((e) => e === "🍋"); // ["🍋"]

array2.map((e) => (e = "🍎")); // ["🍎", "🍎", "🍎"]

array1.reduce((acc, e, i, arr) => {
  // Podemos utilizar:
  // acc: acumulador - e: elemento actual - i: índice - arr: array
  return (acc += e);
}, ""); // "🍎🍋🍇"
// "": Es la inicialización del acumulador

array1.some((e) => e === "🍇"); // true
array1.some((e) => e === "🍊"); // false

array1.every((e) => e === "🍎"); // false
array5.every((e) => e === "🍊"); // true
```

#### Que no utilizan callback

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.findIndex("🍎"); // 0
array1.findIndex("🍋"); // 1
array1.findIndex("🍊"); // -1

array1.at(0); // "🍎"
array1.at(1); // "🍋"
array1.at(-1); //"🍇"
array1.at(4); // undefined
```

A continuación veremos metodos que se pueden usar con los array.

Para desplegarlos hacer clic en las flechas de los diferentes metodos.

<hr>
<details><summary><b>.join()</b></summary>
<p>

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

const joined1 = array1.join(); // undefined
// En forma predeterminada separa mediante ","
console.log(joined1);
// "🍎,🍋,🍇"

const joined2 = array1.join(""); // undefined
// En forma predeterminada separa mediante ","
console.log(joined2);
// "🍎🍋🍇"

const joined3 = array1.join("+"); // undefined
// En forma predeterminada separa mediante ","
console.log(joined3);
// "🍎+🍋+🍇"

const joined4 = [].join(); // undefined
console.log(joined3);
// ""
```

</p>
</details>

<hr>
<details><summary><b>.fill()</b></summary>
<p>

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

const filledArray1 = array1.fill("🍊"); // undefined
console.log(filledArray1);
// ["🍊", "🍊", "🍊"]

const filledArray2 = array1.fill("🍊", 1, array1.length); // undefined
console.log(filledArray2);
// ["🍊", "🍊", "🍊"]

const filledArray3 = array1.fill("🍊", 1, 2); // undefined
console.log(filledArray3);
// ["🍎", "🍊", "🍇"]

const filledArray4 = array1.fill("🍊", 1, array1.length); // undefined
console.log(filledArray4);
// ["🍎", "🍊", "🍊"]
```

</p>
</details>

<hr>
<details><summary><b>.includes()</b></summary>
<p>

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.includes("🍎"); // true
array1.includes("🍍"); // false
```

</p>
</details>

<hr>
<details><summary><b>.indexOf() / .lastIndexOf()</b></summary>
<p>

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.indexOf("🍎"); // 0
array1.indexOf("🍍"); // -1

array1.push("🍊"); // 4
array1.push("🍊"); // 5
array1.lastIndexOf("🍊"); // 4
```

</p>
</details>

<hr>
<details><summary><b>.reverse()</b></summary>
<p>

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined

array1.reverse(); // ["🍇", "🍋", "🍎"];
```

## .sort()

```js
const array4 = [3, 10, 2];

const sortedArray1 = array4.sort(); // undefined
console.log(sortedArray1);
// [ 10, 2, 3 ]

const sortedArray2 = array4.sort(); // undefined
console.log(sortedArray2);
// [ 2, 3, 10 ]

const sortedArray3 = array4.sort(); // undefined
console.log(sortedArray3);
// [ 10, 3, 2 ]
```

</p>
</details>

<hr>
<details><summary><b>.splice()</b></summary>
<p>

```js
const array1 = ["🍎", "🍋", "🍇"]; // undefined
const array2 = new Array("🍌", "🍅", "🍒"); // undefined

// Parámetros: Start / DeleteElement / Items

array1.splice(1, 0, "🍊"); // []
console.log(array1);
// [ '🍎', '🍊', '🍋', '🍇' ]

array1.splice(0, 2); // ['🍎', '🍊']
console.log(array1);
// ['🍋', '🍇']

array2.splice(2, 1, "🍊"); // ['🍒']
console.log(array2);
// ['🍌', '🍅', '🍊']
```

</p>
</details>
<hr>

---

[⬅️ Volver al README](../../README.md)
