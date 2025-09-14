# Shopizee - Liste de course Fullstack JS (React / Fastify)

## 📁 Structure du projet

```
shopizee/
├── server/          # Backend TypeScript avec Fastify
└── client/          # Frontend TypeScript avec React
```

---

## 🚀 Backend - API Shopizee

API REST complète pour gérer une liste de courses

### Installation

```bash
cd server
npm install
```

### Démarrage

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`

### Routes disponibles

#### Page d'accueil
- **GET /** - Listing des routes disponibles

#### Liste de courses
- **GET /shopping** - Récupérer tous les items
  - Query params: `purchased` (true/false) pour filtrer par statut d'achat
- **GET /shopping/:id** - Récupérer un item par ID
- **POST /shopping** - Créer un nouvel item
- **PUT /shopping/:id** - Mettre à jour un item
- **PATCH /shopping/:id/toggle** - Marquer comme acheté/non acheté
- **DELETE /shopping/:id** - Supprimer un item

---

## 🛠️ Scripts disponibles

### Backend (dans `/server`)
```bash
npm run dev      # Démarrage en développement
npm run build    # Compilation TypeScript
npm run start    # Démarrage en production
npm run lint     # Vérification ESLint
npm run format   # Formatage Prettier
```