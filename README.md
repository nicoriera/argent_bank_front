# Argent Bank - Application Bancaire

Ce projet est une application bancaire permettant aux utilisateurs de se connecter et de gérer leurs comptes.

## Fonctionnalités

- Page d'accueil présentant les services de la banque
- Authentification des utilisateurs (connexion/déconnexion)
- Page de profil utilisateur avec possibilité de modifier les informations
- Affichage des comptes bancaires de l'utilisateur

## Technologies utilisées

- React 19
- Redux Toolkit pour la gestion d'état
- React Router pour la navigation
- Vite comme outil de build

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Lancez l'application en mode développement avec `npm run dev`

## Utilisateurs de test

Pour tester l'application, vous pouvez utiliser les comptes suivants :

### Tony Stark

- **Email**: `tony@stark.com`
- **Password**: `password123`

### Steve Rogers

- **Email**: `steve@rogers.com`
- **Password**: `password456`

## Structure du projet

- `/src/components` : Composants réutilisables
- `/src/pages` : Pages principales de l'application
- `/src/features` : Slices Redux et logique métier
- `/src/store` : Configuration du store Redux
- `/src/services` : Services pour les appels API (maintenant implémentés)
- `/src/assets` : Images et autres ressources statiques

## Phase 2 : Transactions

La phase 2 du projet consistera à implémenter les fonctionnalités de transactions, permettant aux utilisateurs de :

- Visualiser toutes leurs transactions pour le mois en cours
- Visualiser les détails d'une transaction
- Ajouter, modifier ou supprimer des informations sur une transaction

## Auteur

Développé dans le cadre du projet Argent Bank pour Remede Agency.
