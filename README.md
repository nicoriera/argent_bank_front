# Argent Bank - Application Bancaire

Ce projet est une application bancaire front-end permettant aux utilisateurs de se connecter et de gérer leurs comptes en interagissant avec une API backend.

## Fonctionnalités

- Page d'accueil présentant les services de la banque
- Authentification des utilisateurs (connexion/déconnexion)
- Page de profil utilisateur avec possibilité de modifier les informations (nom/prénom)
- Affichage des comptes bancaires de l'utilisateur (solde et transactions de base)

## Technologies utilisées

- React 19
- Redux Toolkit pour la gestion d'état
- React Router pour la navigation
- Vite comme outil de build

## Prérequis

- Node.js (version recommandée: >= 18)
- npm ou yarn
- [API Backend Argent Bank](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API) (doit être lancée séparément)
  - _Note : Les maquettes de design initiales (HTML/CSS statiques, wireframes) sont disponibles dans ce dépôt (`/designs`)._

## Installation & Lancement

1.  **Clonez ce dépôt :**

    ```bash
    git clone https://github.com/nicoriera/argent_bank_front.git
    cd argent_bank_front
    ```

2.  **Installez les dépendances :**

    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configurez les variables d'environnement :**
    Créez un fichier `.env` à la racine du projet et ajoutez l'URL de l'API :

    ```env
    VITE_API_URL=http://localhost:3001/api/v1
    ```

    _(Assurez-vous que l'API backend est en cours d'exécution à cette adresse)_

4.  **Lancez l'application en mode développement :**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```
    L'application sera accessible sur `http://localhost:5173` (ou un autre port indiqué par Vite).

## Scripts NPM disponibles

- `npm run dev`: Lance le serveur de développement avec Hot Module Replacement (HMR).
- `npm run build`: Construit l'application pour la production dans le dossier `dist/`.
- `npm run lint`: Lance ESLint pour vérifier la qualité et le style du code.
- `npm run preview`: Lance un serveur local pour prévisualiser la version de production (après un `npm run build`).

## Utilisateurs de test

L'API backend fournit les utilisateurs suivants pour les tests :

### Tony Stark

- **Email**: `tony@stark.com`
- **Password**: `password123`

### Steve Rogers

- **Email**: `steve@rogers.com`
- **Password**: `password456`

## Structure du projet

```
/
├── public/          # Fichiers statiques publics
├── src/
│   ├── assets/      # Images, icônes, etc.
│   ├── components/  # Composants React réutilisables
│   ├── features/    # Logique métier (slices Redux, hooks spécifiques)
│   │   ├── auth/    # Authentification (slice, actions, selectors)
│   │   └── user/    # Gestion du profil utilisateur (slice, actions, selectors)
│   ├── layouts/     # Composants de mise en page (Header, Footer)
│   ├── pages/       # Composants représentant les pages de l'application
│   ├── router/      # Configuration de React Router
│   ├── services/    # Fonctions pour interagir avec l'API
│   ├── store/       # Configuration du store Redux
│   ├── styles/      # Fichiers CSS globaux ou spécifiques (si non Tailwind pur)
│   ├── App.jsx      # Composant racine de l'application
│   └── main.jsx     # Point d'entrée de l'application
├── .env.example     # Exemple de fichier de variables d'environnement (Optionnel)
├── .eslintrc.cjs    # Configuration ESLint
├── .gitignore       # Fichiers ignorés par Git
├── index.html       # Template HTML principal
├── package.json     # Dépendances et scripts NPM
├── README.md        # Ce fichier
└── vite.config.js   # Configuration de Vite
```

## Phase 2 : Transactions (Non implémentée)

**Note :** Les fonctionnalités décrites ci-dessous font partie de la phase 2 du projet et ne sont **pas encore implémentées** dans cette version.

La phase 2 consistera à implémenter les fonctionnalités de transactions, permettant aux utilisateurs de :

- Visualiser toutes leurs transactions pour le mois en cours.
- Visualiser les détails d'une transaction spécifique.
- Ajouter, modifier ou supprimer des informations (catégorie, notes) sur une transaction.

La spécification OpenAPI (Swagger) pour ces futurs endpoints est définie dans le fichier `swagger-transactions.yaml` à la racine de ce projet.

## Auteur

Développé dans le cadre du projet Argent Bank pour Remede Agency.
