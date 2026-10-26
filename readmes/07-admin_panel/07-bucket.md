# ✅ Crear bucket S3

[⬅️ Volver al README](../../README.md)

## ⚙️ Paso 1: Crear bucket

1. Abrimos la Consola de AWS
2. Buscamos "S3" en el buscador superior
3. Seleccionamos "Buckets"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260518233425.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

4. Seleccionamos "Crear bucket"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260518233558.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

5. En la Siguiente Pantalla Configuramos Solamente:
   1. Región AWS: us-east-1
      - Tiene que coincidir con el de nuestro ".env"
   2. Tipo de bucket: Uso general
   3. Espacio de nombres: Espacio de nombres global
   4. Nombre del bucket:
      - Debe ser:
        - único globalmente,
        - sin espacios,
        - solo minúsculas.
      - Ejemplo: demo-ecommerce-admin-panel
      - Agregamos ese nombre en el ARVHIVO ".env":
        - S3_BUCKET=demo-ecommerce-admin-panel
   5. Propiedad de objetos: ACL deshabilitadas (recomendado)
   6. ⚠️Bloqueo acceso público:
      - Destildar: Bloquear todo el acceso público
      - Muestra Advertencia: "Reconozco que la configuración actual puede provocar que este bucket y los objetos que contiene se vuelvan públicos."
        - Tildamos casilla de verificación aceptando la advertencia
      - Queremos acceder a las imágenes desde el Navegador
      - El upload será seguro gracias a la URL firmada, no porque el bucket sea privado
      - 🚨 ACLARACIÓN importante: Esto NO sería ideal en producción real, pero:
        - Simplifica muchísimo la demo
   7. Control de versiones de buckets:
      - Dejamos: Desactivar
   8. Tags/Etiquetas: Ignoramos
   9. Cifrado Predeterminado: Dejamos "SSE-S3"
      - Cifrado del servidor con claves administradas de Amazon S3 (SSE-S3)
   10. Clave de bucket:
       - Dejamos valor por defecto: "Habilitar"
   11. Click en "Crear bucket"
   12. Si el Bucket se crea correctamente, nos redirigirá a la Consola

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260518235450.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

## ⚙️ Paso 2. Configurar CORS en bucket S3

1. CONCEPTOS IMPORTANTES:
   - El navegador:
     - bloquea requests cross-origin,
     - salvo que el servidor los permita explícitamente.
   - Importante para PUT directo desde React hacia S3
2. Ingresamos al Bucket
3. Vamos a la Pestaña "Permisos"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260518235857.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

4. Bajamos hasta "Uso compartido de recursos entre orígenes (CORS)"
   - Cross-origin resource sharing (CORS)
5. Click en Editar

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519000105.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

6. En la pantalla pegamos el siguiente código JSON:
   - Permite realizar "PUT" y "GET" a "http://localhost:5173"
   - CORS es seguridad del Navegador, NO de AWS

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedOrigins": ["http://localhost:3000"],
    "ExposeHeaders": []
  }
]
```

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519000725.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

7. Click en "Guardar cambios" abajo de todo

## ⚙️ Paso 3. # IAM User + Access Keys

1. CONCEPTOS IMPORTANTES:
   - Esto servirá para:
     - la serverless function,
     - generar presigned URLs,
     - firmar uploads.
   - Estas credenciales JAMÁS van al frontend, solo a:
     - backend,
     - Vercel Functions,
     - `.env.local`
   - El Frontend NO conoce AWS Credentials (NO guarda secretos)

2. En la Consola de AWS, en el Buscador de Arriba Buscamos:
   - "IAM" (Administrar el acceso a los recursos de AWS)
   - Seleccionamos la opción

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519002933.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

3. En el menú lateral izquierdo de la nueva pantalla
   - Buscamos la opción "Usuarios de IAM"

4. Elegimos "Crear persona"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519003227.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

5. Ingresamos un Nombre
   - Por ejemplo: demo-s3-user
   - NO Tildamos: "Proporcione acceso de usuario a la consola de administración de AWS: *opcional*"
     - NO necesitamos login humano, solo acceso programático
6. Click en Siguiente

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519003536.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

7. Seleccionamos la Opción de la Derecha: Adjuntar políticas directamente

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519003851.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

8. En el Recuadro de Abajo (Políticas de permisos):
   - Buscamos: AmazonS3FullAccess
   - Tildamos la opción que nos aparece
     - Esto NO es ideal en Producción, ya que da demasiados privilegios
     - Permite crear objetos, leer, subir archivos y generar URLs firmadas
     - Pero es la opción mas sencilla para la Demo, ya que evita problemas
   - Click en Siguiente (Abajo de todo)

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519004235.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

9. En la Pantalla "Revisar y crear"
   - Click en "Crear Persona" (Abajo de todo)

## ⚙️ Paso 4. Crear Access Keys

1. CONCEPTOS IMPORTANTES:
   - Esto es lo que usará:
     - la serverless function,
     - para firmar URLs.
   - 🚨 IMPORTANTE
     - La `Secret Access Key` se muestra UNA sola vez!!!!!

2. Ingresamos a "demo-s3-user" en la Consola IAM

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519004931.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

3. Vamos a la Pestaña "Credenciales de Seguridad"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519005148.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

4. Bajamos hasta la Sección "Claves de Acceso"
   - Click en "Crear clave de acceso"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519005300.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

5. En "Caso de uso" Seleccionamos la Opción:
   - "Aplicación ejecutada fuera de AWS"
     - Planea usar esta clave de acceso para autenticar las cargas de trabajo que se ejecutan en su centro de datos u otra infraestructura externa a AWS que necesitan acceder a sus recursos de AWS.
   - Nos permite ejecutar desde Vercel, localhost, Node, etc
6. Click en "Siguiente"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519005639.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

7. En Pantalla "Establecer el valor de etiqueta de descripción - opcional"
   - Damos un nombre para identificar: demo-admin-panel-local

8. Click en "Crear clave de acceso"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260519010008.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

9. Copiamos las Claves
   - ES EL ÚNICO MOMENTO EN QUE SE NOS MUESTRAN!!!!!
     - Podemos descargar el ".csv"

10. En ARCHIVO ".env" Pegamos las Credenciales:
    - NO USAMOS `VITE_AWS_ACCESS_KEY_ID=`
      - Es la convención para variables de entorno accesibles en el Navegador

11. Revisar que el ".env" se encuentre Ignorado en el ARCHIVO ".gitignore"

```.gitignore
.env
```

## ⚙️ Paso 5. Dar permisos de lectura en Bucket

1. En Consola de AWS Ingresamos al Bucket
2. Nos dirigimos a la pestaña "Permisos"

<div style="text-align: center;">
  <img src="./assets/Pasted image 20260617092637.png" style="width: 60%;" alt="Servicio S3">
</div>
<br/>

3. En la Sección "Bloquear acceso público (configuración del bucket)":
   - Desmarcamos todas las opciones

4. En la sección "Política de bucket"
5. Click en "Editar"
6. Ingresamos lo siguiente:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadImages",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::demo-ecommerce-admin-panel/*"
    }
  ]
}
```

6. Click en "Guardar Cambios"

---

[⬅️ Volver al README](../../README.md)
