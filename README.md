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
cp .env.example .env
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

## 🎨 Frontend - Interface Shopizee

Interface utilisateur pour gérer la liste de courses

### Installation

```bash
cd client
cp .env.example .env
npm install
```

### Démarrage

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🛠️ Scripts disponibles

### Backend (dans `/server`)
```bash
npm run dev      # Démarrage en développement
npm run build    # Compilation TypeScript
npm run start    # Démarrage en production
npm run lint     # Vérification ESLint
npm run format   # Formatage Prettier
```

### Frontend (dans `/client`)
```bash
npm run dev      # Démarrage en développement
npm run build    # Build de production
npm run preview  # Aperçu du build de production
npm run lint     # Vérification ESLint
```

---

## 🚀 Démarrage complet

### 1. Backend
```bash
cd server
cp .env.example .env  # Si le fichier .env.example existe
npm install
npm run dev
```

### 2. Frontend (dans un autre terminal)
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

### 3. Accès
- **API** : http://localhost:3000
- **Interface** : http://localhost:5173