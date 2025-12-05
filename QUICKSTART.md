# 🚀 Guide de Démarrage Rapide - Rafiq-AI

## Configuration Initiale (5 minutes)

### 1. Obtenir une clé API Google Gemini (GRATUIT)

1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez la clé générée

### 2. Configurer l'environnement

Créez un fichier `.env` à la racine du projet :

```bash
# Copiez ceci dans le fichier .env
GOOGLE_GEMINI_API_KEY=VOTRE_CLE_API_ICI
```

## Démarrage avec Docker (Recommandé)

```bash
# Lancer l'application complète
docker-compose up --build

# Accéder à l'application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## Démarrage en Mode Développement

### Backend (Terminal 1)

```bash
cd backend
npm install
npm run start:dev
```

### Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

## Utilisation (Démo <1 minute)

### Étape 1 : Coller votre texte
Copiez la description de votre projet, FAQ, ou tout autre contenu dans la grande zone de texte.

### Étape 2 : Mettre à jour
Cliquez sur "Mettre à jour la base de connaissances" et attendez 2-5 secondes.

### Étape 3 : Posez vos questions !
Utilisez le chat pour poser n'importe quelle question sur le contenu que vous avez collé.

## Exemples de Textes à Tester

### Exemple 1 : Description d'un projet
```
Village Numérique Résistant est un projet innovant de la Nuit de l'Info 2025.
Notre objectif est de créer des solutions numériques durables et accessibles.
L'équipe "allez-y" développe Rafiq-AI, un chatbot intelligent basé sur RAG.
Contact: equipe-allez-y@nuitdelinfo.com
```

### Exemple 2 : FAQ d'un service
```
Q: Quels sont vos horaires d'ouverture ?
R: Nous sommes ouverts du lundi au vendredi de 9h à 18h.

Q: Comment nous contacter ?
R: Par email à contact@exemple.com ou par téléphone au 01 23 45 67 89.
```

## Changer de Base de Connaissances

1. Cliquez sur "Nouvelle base"
2. Collez un nouveau texte
3. Cliquez sur "Mettre à jour"
4. Rafiq devient instantanément expert du nouveau contenu !

## Dépannage

### Erreur de connexion au backend
- Vérifiez que le backend tourne sur le port 3001
- Vérifiez la clé API Gemini dans le fichier `.env`

### Base de connaissances ne se charge pas
- Vérifiez que le texte contient au moins 10 caractères
- Vérifiez la connexion internet (appels API Gemini)

### Messages d'erreur dans le chat
- La base de connaissances n'est peut-être pas chargée
- Rechargez la page et réessayez

## Fonctionnalités Avancées

- **Persistance** : Vos données restent même après un refresh
- **Sources** : Voir les extraits utilisés pour chaque réponse
- **Bilingue** : Français + compréhension du hassaniya
- **RAG Strict** : Réponses uniquement basées sur votre texte

## Technologies Utilisées

- **IA** : Google Gemini 1.5 Flash + Embeddings
- **Backend** : NestJS + ChromaDB
- **Frontend** : Next.js 15 + React
- **Déploiement** : Docker + Docker Compose

---

**Marhaba !** 🇲🇷 Profitez de Rafiq-AI !
