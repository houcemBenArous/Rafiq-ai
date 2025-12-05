# Rafiq-AI 🤖

**Secrétaire virtuel intelligent du Village Numérique Résistant**

Transformez instantanément n'importe quel texte en un chatbot intelligent capable de répondre à toutes les questions liées à ce contenu. Propulsé par Google Gemini et un système RAG (Retrieval-Augmented Generation).

## ✨ Caractéristiques

- 🚀 **Mise à jour instantanée** : Collez votre texte → Chatbot prêt en moins de 5 secondes
- 🎯 **RAG avancé** : Réponses basées uniquement sur votre contenu avec affichage des sources
- 🌍 **Bilingue** : Support du français et compréhension du hassaniya (arabe mauritanien)
- 💾 **Persistance** : Sauvegarde automatique de la base de connaissances et de l'historique
- 🐳 **Dockerisé** : Déploiement ultra-simple avec `docker-compose up`
- 🎨 **Interface premium** : Design moderne avec glassmorphism et animations fluides

## 🛠️ Technologies

- **Backend** : NestJS + Google Gemini API + ChromaDB
- **Frontend** : Next.js 15 + React + TypeScript
- **Déploiement** : Docker + Docker Compose

## 📋 Prérequis

- Docker & Docker Compose installés
- Clé API Google Gemini (gratuite) : [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🚀 Installation & Démarrage

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd rafiq-ai
```

### 2. Configurer la clé API
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env et ajouter votre clé API Gemini
# GOOGLE_GEMINI_API_KEY=votre_clé_ici
```

### 3. Lancer l'application
```bash
docker-compose up --build
```

L'application sera accessible sur :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001

## 📖 Guide d'utilisation

### Démo en moins d'1 minute 🎬

1. **Ouvrir** http://localhost:3000
2. **Coller** votre texte (description de projet, FAQ, etc.) dans la zone de texte
3. **Cliquer** sur "Mettre à jour la base de connaissances"
4. **Attendre** 2-5 secondes (affichage du statut en temps réel)
5. **Poser** des questions dans le chat → Réponses instantanées avec sources !

### Changer de base de connaissances

- Cliquez sur "Nouvelle base" → Collez un nouveau texte → Rafiq devient instantanément expert de ce nouveau contenu !

### Navigation

- **Effacer la conversation** : Réinitialise le chat (conserve la base de connaissances)
- **Sources** : Panneau à droite montrant les extraits utilisés pour chaque réponse

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │ ← Port 3000
└────────┬────────┘
         │ HTTP
         ↓
┌─────────────────┐
│   Backend       │
│   (NestJS)      │ ← Port 3001
└────────┬────────┘
         │
    ┌────┴────┬──────────────┐
    ↓         ↓              ↓
┌────────┐ ┌─────────┐  ┌──────────┐
│Gemini  │ │ChromaDB │  │ RAG      │
│ API    │ │(Vector) │  │ Service  │
└────────┘ └─────────┘  └──────────┘
```

### Flux RAG

1. **Texte entrant** → Découpage en chunks sémantiques
2. **Vectorisation** → Embeddings via Gemini `text-embedding-004`
3. **Stockage** → Indexation dans ChromaDB
4. **Question** → Recherche sémantique des chunks pertinents
5. **Génération** → Prompt enrichi avec contexte → Réponse Gemini
6. **Réponse** → Texte + Sources utilisées

## 🧪 Tests & Validation

### Test manuel

```bash
# Backend health check
curl http://localhost:3001/api/chat/status

# Test vectorisation
curl -X POST http://localhost:3001/api/chat/update-knowledge \
  -H "Content-Type: application/json" \
  -d '{"text": "Rafiq-AI est un chatbot intelligent créé pour la Nuit de l Info 2025."}'

# Test question
curl -X POST http://localhost:3001/api/chat/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "C est quoi Rafiq-AI ?"}'
```

### Critères de succès ✅

- ✅ Vectorisation en < 5 secondes (même avec 5000+ mots)
- ✅ Réponses basées uniquement sur le texte fourni
- ✅ Refus poli si information absente
- ✅ Message de bienvenue bilingue (français + hassaniya)
- ✅ Affichage des sources pour chaque réponse
- ✅ Persistance après refresh de page
- ✅ Lancement avec un seul `docker-compose up`

## 🎯 Cas d'usage

- **Projet Nuit de l'Info** : Devenez expert instantané de n'importe quel projet concurrent
- **Support client** : Base de connaissances FAQ instantanée
- **Documentation** : Assistant intelligent sur vos docs techniques
- **Événements** : Secrétaire virtuel connaissant tout le programme

## 👥 Équipe

**Équipe allez-y** - Nuit de l'Info 2025

## 📄 Licence

Ce projet a été développé pour la Nuit de l'Info 2025.

## 🙏 Remerciements

- Google Gemini pour l'API d'IA générative
- ChromaDB pour la base vectorielle
- La communauté Nuit de l'Info

---

**Marhaba !** 🇲🇷 Ana Rafiq, votre secrétaire virtuel. **Shnu bghiti tə'raf?**
