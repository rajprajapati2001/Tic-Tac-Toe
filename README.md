![Tic Tac Toe](src/assets/icon/tic-tac-toe-128x128.png)

# Tic Tac Toe

A simple and responsive Tic Tac Toe game built using React and Vite, designed as a lightweight project to demonstrate modern frontend development practices. This project focuses on learning core concepts of React, fast build tooling with Vite, and creating clean, interactive user interfaces.

![Tic Tac Toe](https://img.shields.io/badge/Tic%20Tac%20Toe-Game-blue?style=for-the-badge) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![CSS](https://img.shields.io/badge/CSS-663399?style=for-the-badge&logo=CSS&logoColor=FFFFFF) ![JavaScript](https://img.shields.io/badge/JavaScript-222222?style=for-the-badge&logo=JavaScript&logoColor=F7DF1E) ![Gameloft](https://img.shields.io/badge/Gameloft-000000?style=for-the-badge&logo=Gameloft&logoColor=FFFFFF) ![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=FFFFFF) 


🌐 Website: [https://tic-tac-toe-mu-murex-80.vercel.app/](https://tic-tac-toe-mu-murex-80.vercel.app/)

## Screenshots  
![Screenshot](/src/assets/compltescreenshot.jpg) 

## Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Animations | Motion |

## Project Structure

```
tic-tac-toe/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── audio
│   │   │   └── soundEffects.ts
│   │   └── icons
│   │       └── tic-tac-toe-header-icon.png
│   ├── components/
│   │   ├── BackgroundOrbs.tsx
│   │   ├── GameBoard.tsx
│   │   ├── GameMenu.tsx
│   │   ├── GameStatus.tsx
│   │   └── Game.jsx
│   ├── types/
│   │   └── game.ts
│   ├── utilities/
│   │   └── game.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── images.d.ts
├── .dockerignore
├── Dockerfile
├── README.md
├── docker-compose.yaml
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```
---
## 🚀 Getting Started — Local Development

### Install & Run
1. Install dependencies
```bash
npm install
```
2. Start the dev server (React + Vite)
```bash
npm run dev
```
- The Vite dev server runs on port 3000 by default. (See `dev` script in [package.json](package.json#L1))
- Open http://localhost:3000 in your browser.

---
## 🐳 Run with Docker

This project includes a `Dockerfile` and `docker-compose.yaml` for running the app in a container, providing a consistent environment across machines.


1. Build & start the app (rebuild)

```bash
docker-compose up --build
```
2. Start using an existing image (no rebuild)

```bash
docker-compose up
```
3. Stop and remove containers

```bash
docker-compose down
```
>The app is available at http://localhost:3000

>Port mapping: `3000 (host) → 3000 (container)>`

>See the `docker-compose.yaml` for service configuration.

## Useful Files

- `Dockerfile` — container image build instructions ([Dockerfile](Dockerfile#L1)).
- `docker-compose.yaml` — service definition and port mapping ([docker-compose.yaml](docker-compose.yaml#L1)).
- `package.json` — npm scripts used for development and build ([package.json](package.json#L1)).

## Development tips

- If running in Docker, the compose file mounts the project directory so HMR updates work.
- If you change the port, update the `dev` script in [package.json](package.json#L1) and the port mapping in [docker-compose.yaml](docker-compose.yaml#L1).

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
**Raj Prajapati**

Developed on `17th March 2026`/`Tuesady`.
