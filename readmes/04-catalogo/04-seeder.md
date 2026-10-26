# Seeder de Productos

[⬅️ Volver al README](../../README.md)

1. Dependencias necesarias:

```bash
# SDK de Firebase:
npm install firebase

# Necesario para correr el Seeder en NodeJS:
npm install dotenv
npm install -D tsx

# Definiciones de tipo para NodeJS:
npm i --save-dev @types/node
```

2. En "tsconfig.node.json":
    - Lo siguiente permite que el Entorno de Node reconozca "process"
        - TypeScript no aplica configuraciones globalmente.
        - Solo afecta a los archivos incluidos en cada tsconfig (Entorno de Node).

```json
{
    "compilerOptions": {
        // ----- ----- ----- -----
    },
    "include": ["vite.config.ts", "scripts/**/*.ts"]
}
```

3. Proyecto de Firebase con Base de Datos en Firestone

- Read/write abierto por 30 días — necesario para que el seed pueda escribir sin estar autenticado

4. En ".env" agregamos las credenciales de Firebase/Firestone

- También incluimos un ".env.example"

```.env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

5. ARCHIVO "src/config/firebase.ts":

- Creamos la conexión con Firebase/Firestone
- Exportamos "app" y "db"

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

6. En ARCHIVO "scripts/seed.ts" en la Raíz del Proyecto:

- Poblará la colección "products" con 60 productos.
- Si la colección "products" no existe, la creará.
- Este script se ejecuta en NodeJS, por eso definimos nuevamente las credenciales.

```ts
import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
    collection,
    doc,
    getFirestore,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

// Lo ideal sería tener una Colección de Categorías en Firestone:
type CategoryId = "accessories" | "clothing" | "shoes";

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CATALOG: Record<CategoryId, string[]> = {
    shoes: [
        "Nike Air Max",
        "Nike Pegasus",
        "Nike Revolution",
        "Nike Free Run",
        "Nike Zoom",
        "Nimbus Cloud",
        "Ninja Runner",
        "Adidas Originals",
        "Adidas Ultraboost",
        "Adidas Stan Smith",
        "Puma Suede",
        "Puma RS-X",
        "Reebok Classic",
        "Reebok Nano",
        "Vans Old Skool",
        "Vans Sk8-Hi",
        "Converse Chuck Taylor",
        "New Balance 990",
        "New Balance 327",
        "Asics Gel-Kayano",
        "Brooks Ghost",
        "Saucony Endorphin",
        "Hoka Bondi",
        "On Cloud",
        "Salomon Speedcross",
    ],
    clothing: [
        "Nike Tech Fleece",
        "Nike Dri-FIT Tee",
        "Nike Sportswear Hoodie",
        "Adidas Tiro",
        "Adidas Track Jacket",
        "Adidas Originals Tee",
        "Levi's 501",
        "Levi's Trucker Jacket",
        "Champion Hoodie",
        "Carhartt WIP Tee",
        "Uniqlo Heattech",
        "Uniqlo Airism",
        "Patagonia Better Sweater",
        "North Face Denali",
        "Columbia Fleece",
        "Under Armour Tee",
        "Lululemon ABC Pant",
        "Calvin Klein Tee",
        "Tommy Hilfiger Polo",
        "Ralph Lauren Polo",
    ],
    accessories: [
        "Ray-Ban Aviator",
        "Ray-Ban Wayfarer",
        "Oakley Holbrook",
        "Casio G-Shock",
        "Apple Watch Band",
        "Herschel Backpack",
        "Fjallraven Kanken",
        "JanSport Classic",
        "Nike Cap",
        "Adidas Beanie",
        "New Era 9Fifty",
        "Patagonia Hat",
        "Carhartt Beanie",
        "Stance Socks",
        "Nike Crew Socks",
    ],
};

function randomPrice(): number {
    return Number((80 + Math.random() * 270).toFixed(2));
}

function randomStock(): number {
    return Math.floor(Math.random() * 46) + 5;
}

function createDescription(name: string, category: CategoryId): string {
    return `${name} pertenece a la categoría "${category}". Fabricado con materiales de calidad que ofrecen comodidad, durabilidad y un diseño moderno para el uso diario.`;
}

async function seed() {
    const products = Object.entries(CATALOG).flatMap(([categoryId, names]) =>
        names.map((name) => ({
            name,
            nameLower: name.toLowerCase(),
            image: `https://picsum.photos/seed/${encodeURIComponent(name)}/300/300`,
            description: createDescription(name, categoryId as CategoryId),
            price: randomPrice(),
            stock: randomStock(),
            categoryId: categoryId as CategoryId,
        })),
    );

    console.log(`🌱 Sembrando ${products.length} productos...\n`);

    for (const product of products) {
        const ref = doc(collection(db, "products"));
        await setDoc(ref, {
            ...product,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        console.log(`✔ ${product.name}`);
    }

    console.log(`\n✅ ${products.length} productos creados correctamente.`);
    process.exit(0);
}

seed().catch((error) => {
    console.error("❌ Error al ejecutar el seeder:");
    console.error(error);
    process.exit(1);
});
```

⚠️ IMPORTANTE: Este Seeder creará productos según la siguiente interfaz:

- Adaptar el Seeder a tu propia Interfaz.
- Recordar que el tipo representa un producto para el Front (TypeScript), por lo que tiene "id", y maneja fechas en formato "Date".

```ts
// Lo ideal sería tener una Colección de Categorías en Firestone:
export type CategoryId = "accessories" | "clothing" | "shoes";

export type Product = {
    id: string;
    name: string;
    nameLower: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    categoryId: CategoryId;
    createdAt?: Date;
    updatedAt?: Date;
};
```

7. En "package.json" Agregamos Script:

```json
{
	// ----- ----- ----- -----
	"scripts": {
		// ----- ----- ----- -----
		"seed": "tsx scripts/seed.ts"
```

8. Ejecutamos script en Terminal Integrada:

```bash
npm run seed
```

9. En ARCHIVO "firestore.rules" en la Raíz del Proyecto:

- Permitimos la lectura pública de la colección products.
- Bloqueamos la creación, edición y eliminación de documentos desde la aplicación.
- Como en esta homework trabajaremos únicamente con consultas (read-only), no necesitamos habilitar escrituras.
- 💡 En proyectos reales las reglas suelen depender de autenticación y roles de usuario. Aquí utilizamos reglas simples para concentrarnos en el aprendizaje de React y Firestore.
- Este paso puede hacerse incluyendo las reglas directamente en la Consola de Firestone ó mediante el Archivo "firestone.rules" en la raíz del proyecto y luego pushear las reglas por medio del comando `firebase deploy --only firestore:rules` en terminal integrado.

```.rules
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /products/{productId} {
			allow read: if true;
			allow write: if false;
		}
	}
}
```

10. En ARCHIVO ""firestone.indexes.json" en la Raíz del Proyecto:

- Podemos ingresar manualmente los "Indexados".
- O hacerlo automáticamente desde la Consola de Firestone.

```
{
	"indexes": [],
	"fieldOverrides": []
}
```

[⬅️ Volver al README](../../README.md)
