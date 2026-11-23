  # 🟥🟦 Trivium 🟨🟩
  ### Experiencia interactiva de trivia y conocimiento impulsada por Inteligencia Artificial

  [![Sitio en Producción](https://img.shields.io/badge/Demo_en_Producci%C3%B3n-triviumc.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://triviumc.netlify.app)
  [![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-green.svg?style=for-the-badge)](./LICENCE)

  <br/>

  <!-- TECH STACK BADGES -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-13.1.5-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Cohere_AI-API_v2-39594C?style=for-the-badge&logo=cohere&logoColor=white" alt="Cohere AI" />
    <img src="https://img.shields.io/badge/Zustand-State_Management-764ABC?style=for-the-badge" alt="Zustand" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify" />
  </p>

  **🌐 Acceso en línea:** [https://triviumc.netlify.app](https://triviumc.netlify.app)
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
<summary><b>Índice de Contenidos</b> (click para desplegar)</summary>

- [Descripción General](#descripción-general)
- [Características y Funcionamiento](#características-y-funcionamiento)
  - [Modos de Juego](#modos-de-juego)
  - [Categorías Temáticas](#categorías-temáticas)
  - [Sistema de Comodines](#sistema-de-comodines)
  - [Feedback Multimedia](#feedback-multimedia)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
  - [Flujo de Datos y Componentes](#flujo-de-datos-y-componentes)
  - [Gestión de Estado Global](#gestión-de-estado-global)
  - [Estrategia Híbrida de Preguntas (IA + Fallback)](#estrategia-híbrida-de-preguntas-ia--fallback)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración Local](#instalación-y-configuración-local)
- [Colaboradores](#colaboradores)
- [Licencia](#licencia)
</details>

---

## Descripción General

**Trivium** es una aplicación web moderna de preguntas y respuestas diseñada para desafiar el conocimiento general de los usuarios a través de una experiencia interactiva, dinámica y audiovisual. 

El núcleo del juego combina el rendimiento de **Next.js** y **React** con las capacidades generativas de la **API de Cohere AI**, permitiendo la creación de preguntas contextuales e inéditas en tiempo real, respaldadas por un sistema de contingencia local que asegura la continuidad de las partidas en todo momento.

Despliegue oficial en producción: **[https://triviumc.netlify.app](https://triviumc.netlify.app)**

## Características y Funcionamiento

### Modos de Juego
1. **Modo Clásico:** Partidas por rondas donde el usuario responde a un conjunto predeterminado de preguntas (5, 10 o 15), evaluando su porcentaje de precisión al finalizar.
2. **Modo Contra Reloj:** Cada pregunta cuenta con un límite de tiempo estricto (15 segundos) representado visualmente por una barra de progreso regresiva, añadiendo adrenalina a la toma de decisiones.
3. **Modo Infinito:** Una experiencia de supervivencia continua donde las preguntas se suministran por lotes progresivos y el jugador avanza hasta agotar sus vidas disponibles.

### Categorías Temáticas
El usuario puede personalizar su desafío seleccionando una o múltiples disciplinas del saber:
- 🎨 **Arte**
- 🎬 **Entretenimiento**
- 📚 **Cultura General**
- 🌍 **Geografía**
- 🏛️ **Historia**
- 🔬 **Ciencia**
- 🚀 **Espacio**
- 💻 **Tecnología**

### Sistema de Comodines
Para enriquecer la jugabilidad y la toma de decisiones estratégicas, los participantes disponen de comodines configurables:
* **50 / 50 (`fifty`):** Elimina instantáneamente dos respuestas incorrectas del tablero.
* **Saltar Pregunta:** Omite la pregunta en curso sin sumar penalizaciones.
* **Vidas Extra:** Permite continuar la partida ante fallos accidentales, fundamental en los modos desafiantes e infinito.

### Feedback Multimedia
- **Efectos de sonido posicionales:** Sonidos para navegación entre botones, selección de respuestas, confirmación de aciertos, fallos y música de victoria.
- **Microinteracciones y Confeti:** Celebración gráfica con partículas dinámicas mediante Canvas Confetti al superar partidas con calificaciones destacadas.
- **Diseño Adaptativo (Responsive):** Experiencia fluida garantizada en teléfonos móviles, tabletas y monitores de alta resolución.

---

## Arquitectura del Proyecto

Trivium implementa una arquitectura desacoplada y orientada a componentes aprovechando el modelo híbrido cliente-servidor de Next.js:

```
trivium/
├── public/                 # Recursos estáticos servidos directamente
│   ├── categories-icons/   # Iconografía SVG de las categorías
│   ├── images/             # Fondos y gráficos de la aplicación
│   ├── sounds/             # Efectos de audio en MP3
│   └── favicon.svg         # Favicon vectorial con viewBox escalable
├── src/
│   ├── assets/             # Recursos empaquetados y banco local de preguntas (JSON)
│   ├── components/         # Componentes modulares reutilizables de UI
│   │   ├── Form/           # Modal y selectores de configuración de partida
│   │   ├── Home/           # Hero, catálogo de categorías y modos de juego
│   │   ├── Play/           # Tablero de juego, encabezado y modales de resultado
│   │   └── Questions/      # Renderizado de preguntas, opciones y comodines
│   ├── helpers/            # Lógica de juego, validadores, audio y llamadas a APIs
│   ├── pages/              # Enrutamiento basado en archivos (Next.js Pages Router)
│   │   ├── api/            # Endpoints backend serverless (/api/questions)
│   │   ├── play/           # Página de partida (/play)
│   │   ├── _app.js         # Configuración global, fuentes y modales
│   │   ├── _document.js    # Metadatos HTML, Open Graph y favicon
│   │   └── index.js        # Página de inicio
│   ├── store/              # Capa de estado global con Zustand
│   └── styles/             # Estilos globales y reglas de Tailwind CSS
```

### Flujo de Datos y Componentes
1. **Configuración de Partida:** Desde la página principal (`/`), el usuario selecciona el modo y categorías deseadas mediante el formulario `NewGameForm`.
2. **Navegación Parametrizada:** La configuración se serializa en parámetros de consulta (`query params`) seguros hacia la ruta `/play`.
3. **Inicialización y Validación:** El helper `gameConfig.js` valida los parámetros entrantes y notifica al almacén global de Zustand (`useBoundStore`).
4. **Carga Inteligente de Preguntas:** Se efectúa la petición interna hacia `/api/questions` para obtener o generar las preguntas de la partida.

### Gestión de Estado Global
El estado se administra mediante **Zustand** a través de una tienda combinada dividida en módulos de responsabilidad única:
- **`useQueries`:** Almacena y sincroniza la configuración de la partida activa (modos, temporizador, cantidad y categorías).
- **`useQuestions`:** Controla la lista de preguntas recibidas, índice de la pregunta activa, respuestas del usuario, estado de carga (`loading`) y errores.
- **`useWildcards`:** Supervisa la disponibilidad, activación y consumo de cada comodín durante el ciclo de juego.

### Estrategia Híbrida de Preguntas (IA + Fallback)
Para garantizar alta disponibilidad y evitar que la partida dependa exclusivamente de servicios externos, la aplicación implementa una estrategia de datos resiliente en `src/pages/api/questions.js`:

1. **Generación con Cohere AI:** Se construye un prompt estructurado solicitando preguntas en formato JSON con su texto, 4 opciones equilibradas y el índice de la respuesta correcta.
2. **Filtro de Seguridad y Fallback:** Si la API de Cohere no responde, excede la cuota de uso o la variable de entorno no está configurada, el sistema activa de forma transparente el banco local clasificado (`src/assets/questions.json`), asegurando una experiencia continua sin pantallas de error para el usuario.

---

## Tecnologías Utilizadas

| Categoría | Tecnología | Uso Principal |
| :--- | :--- | :--- |
| **Framework Web** | [Next.js 13](https://nextjs.org/) | Enrutamiento por páginas, SSR y rutas de API Serverless |
| **Biblioteca de UI** | [React 18](https://react.dev/) | Construcción de componentes modulares y reactividad |
| **Inteligencia Artificial** | [Cohere AI](https://cohere.com/) | Generación dinámica de preguntas temáticas |
| **Gestión de Estado** | [Zustand](https://github.com/pmndrs/zustand) | Estado global centralizado, predecible y ligero |
| **Estilos y Diseño** | [Tailwind CSS](https://tailwindcss.com/) | Utilidades CSS para interfaces modernas y responsivas |
| **Iconografía** | [React Icons](https://react-icons.github.io/react-icons/) | Iconos SVG ligeros para categorías, comodines y botones |
| **Efectos Visuales** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Animaciones de celebración en pantalla completa |
| **Plataforma de Despliegue** | [Netlify](https://www.netlify.com/) | Alojamiento, CDN global y despliegue continuo en producción |

---

## Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/caesarlaiton/trivium.git
cd trivium
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno (Opcional para IA)
Crea un archivo `.env.local` en la raíz del proyecto para habilitar la generación dinámica de preguntas con Cohere:
```env
COHERE_API_KEY=tu_clave_de_api_de_cohere_aqui
```
*(Si no configuras la clave, el juego funcionará fluidamente utilizando el banco de preguntas local).*

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador la dirección [http://localhost:3000](http://localhost:3000) para ver la aplicación en ejecución.

### 5. Compilar para producción
```bash
npm run build
npm run start
```

---

## Colaboradores

Proyecto desarrollado para la asignatura de Programación Multimedia por el equipo de desarrollo:

* 👨‍💻 **Francisco Ramos** — C.I. `29.910.837`
* 👨‍💻 **Efren Valerio** — C.I. `27.904.811`
* 👨‍💻 **Jesús Ramírez** — C.I. `29.572.677`
* 👨‍💻 **Cesar Laiton** — C.I. `27.678.619`

---

## Licencia

Distribuido bajo la Licencia **MIT**. Consulta el archivo [`LICENCE`](./LICENCE) para obtener más información.

<p align="right"><a href="#top">⬆️ Volver al inicio</a></p>
