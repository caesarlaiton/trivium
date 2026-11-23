<div id="top"></div>

<!-- PROJECT LOGO -->
<div align="center">
  <img src="./readme/header.webp" alt="Trivium Logo" />
  <br/>
  <br />

  # 🟥🟦 Trivium 🟨🟩

  Un juego de preguntas y trivia con diferentes modos de juego, categorías y comodines. Las preguntas son generadas dinámicamente con inteligencia artificial mediante la API de [Cohere](https://dashboard.cohere.ai/).
</div>

<!-- TABLE OF CONTENTS -->
<details>
<summary>Tabla de contenidos</summary>

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Construido Con](#construido-con)
- [Cómo Empezar](#cómo-empezar)
- [Licencia](#licencia)
- [Hoja de Ruta](#hoja-de-ruta)
</details>

<!-- ABOUT THE PROJECT -->
## Acerca del Proyecto

Trivium es un juego interactivo de trivia desarrollado con **Next.js**, **React** y la API de **Cohere**. Permite seleccionar diferentes modos de juego y categorías temáticas, además de contar con comodines de ayuda. La IA de Cohere genera preguntas y respuestas de manera dinámica.

> **Nota:** El juego cuenta con un modo híbrido: genera preguntas en tiempo real mediante IA y utiliza un banco de preguntas local para asegurar una experiencia fluida y sin interrupciones.

<p align="right"><a href="#top">⬆️ Volver arriba</a></p>

<!-- SCREENSHOTS -->
## Capturas de Pantalla

<table>
    <tr>
      <td>
          <img src="./readme/home_mobile.webp" width="100%" title="Home Móvil"  />
      </td>
      <td>
          <img src="./readme/home_tablet.webp" width="100%" title="Home Tablet"/>
      </td>
      <td>
          <img src="./readme/home_desktop.webp" width="100%" title="Home Escritorio"/>
      </td>
    </tr>
    <tr>
      <td>
          <img src="./readme/play_classic_mobile.webp" width="100%" title="Modo clásico Móvil"  />
      </td>
      <td>
          <img src="./readme/play_classic_tablet.webp" width="100%" title="Modo clásico Tablet"/>
      </td>
      <td>
          <img src="./readme/play_classic_desktop.webp" width="100%" title="Modo clásico Escritorio"/>
      </td>
    </tr>
    <tr>
      <td>
          <img src="./readme/play_time_mobile.webp" width="100%" title="Modo tiempo Móvil"  />
      </td>
      <td>
          <img src="./readme/play_time_tablet.webp" width="100%" title="Modo tiempo Tablet"/>
      </td>
      <td>
          <img src="./readme/play_time_desktop.webp" width="100%" title="Modo tiempo Escritorio"/>
      </td>
    </tr>
</table>

<p align="right"><a href="#top">⬆️ Volver arriba</a></p>

### Construido Con

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Zustand](https://github.com/pmndrs/zustand)
* [Cohere AI](https://cohere.ai)
* [Tailwind CSS](https://tailwindcss.com/)
* [AnimatiSS](https://xsgames.co/animatiss/)
* [React Icons](https://react-icons.github.io/react-icons/)
* [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

<p align="right"><a href="#top">⬆️ Volver arriba</a></p>

<!-- GETTING STARTED -->
## Cómo Empezar

1. Dirígete a la carpeta `source_code`:
```sh
cd source_code
```
2. Instala las dependencias:
```sh
npm install
```
3. Inicia el servidor de desarrollo:
```sh
npm run dev
```

Para habilitar la generación de preguntas con IA en desarrollo, crea un archivo `.env.local` en `source_code` con tu API Key de Cohere:

```env
COHERE_API_KEY=tu_api_key_aqui
```

<p align="right"><a href="#top">⬆️ Volver arriba</a></p>

<!-- LICENSE -->
## Licencia

Distribuido bajo la Licencia MIT. Consulta [`LICENCE`](./LICENCE) para más información.

<p align="right"><a href="#top">⬆️ Volver arriba</a></p>

<!-- ROADMAP -->
## Hoja de Ruta

- [x] Modo offline / híbrido
- [x] Sonidos para botones e interacción
- [x] Sonidos de victoria y derrota
- [x] Integración con Cohere Chat API v2
- [x] Nueva identidad visual y responsive
- [ ] Soporte multilingüe
- [ ] Modo PWA

<p align="right"><a href="#top">⬆️ Volver arriba</a></p>
