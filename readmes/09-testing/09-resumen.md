FIXTURES:
--------
Datos de prueba reutilizables que representan entidades de nuestra aplicación.

Permiten mantener datos consistentes entre diferentes tests y evitar repetir la creación de objetos manualmente.

RENDER-WITH-PROVIDERS:
---------------------
Función auxiliar para renderizar componentes dentro del árbol de Providers necesario para que funcionen correctamente.

También permite precargar estados iniciales, por ejemplo, un usuario autenticado, productos, carrito, etc.

De esta manera, los tests pueden simular diferentes escenarios de la aplicación.

TEST DE REDUCER:
---------------
El Reducer tiene Funciones Puras:
	- Siempre devuelve el mismo resultado para los mismos argumentos.
	- No produce efectos secundarios, es decir, no modifica nada fuera de su propio ámbito ni depende de un estado externo que pueda cambiar.

Por lo tanto el Reducer:
	- No depende de React
	- No depende del DOM
	- No depende de Firebase
	- Recibe: Estado actual + Acción
	- Retorna: Nuevo estado

Por lo tanto, no necesitamos renderizar componentes ni utilizar React, testeamos únicamente la lógica de transformación del estado.

TEST DE HOOKS:
-------------
Testeamos el comportamiento de un hook y las piezas de lógica que utiliza.

Testeamos reducer (si lo tiene), contexto y provider.

El objetivo es verificar su comportamiento desde la perspectiva del consumidor, sin necesidad de testear la UI.


TEST DE COMPONENTES:
-------------------
Testeamos el comportamiento observable del componente a través de la interfaz:
	1. Interactuamos con el componente como lo haría un usuario: hacer clic, escribir, seleccionar opciones, etc.
	2. Verificamos que la interfaz muestre el resultado esperado después de cada interacción.

No testeamos directamente los detalles internos de implementación, sino el comportamiento visible para el usuario.

Si el componente utiliza Context y Reducer, una prueba exitosa puede validar que estas piezas funcionan correctamente en conjunto con la UI para el escenario probado.

MSW (MOCK SERVICE WORKER):
-------------------------
Intercepta las peticiones HTTP que realiza la aplicación y devuelve respuestas controladas por el test.

Por ejemplo:
	/api/presign → respuesta mockeada

Permite testear la comunicación con APIs sin depender de un backend real (S3).

