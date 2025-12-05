# 🚀 DÉMARRAGE RAFIQ-AI - Guide Final

## ⚠️ Problème Docker Identifié

Le build Docker rencontre des conflits de dépendances npm complexes liés à :
- `@nestjs/config` avec NestJS 11
- `chromadb` avec certaines dépendances natives

## ✅ SOLUTION RECOMMANDÉE : Mode Développement

Cette méthode fonctionne parfaitement et vous permet d'utiliser l'application immédiatement.

### ÉTAPE 1 : Configuration Backend

1. **Copiez** le fichier de configuration :
```powershell
cd backend
copy env.txt .env
```

2. **Obtenir votre clé API Gemini** (GRATUIT) :
   - Allez sur : https://makersuite.google.com/app/apikey
   - Connectez-vous avec votre compte Google
   - Cliquez sur "Create API Key"
   - Copiez la clé (format: `AIzaSy...`)

3. **Éditez le fichier `.env`** et ajoutez votre clé :
```bash
GOOGLE_GEMINI_API_KEY=AIzaSyVOTRE_CLE_ICI
PORT=3001
NODE_ENV=development
CHROMA_PATH=./chroma_db
CORS_ORIGIN=http://localhost:3000
```

### ÉTAPE 2 : Créer le fichier frontend .env.local

```powershell
cd ..\frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

### ÉTAPE 3 : Lancer l'Application (2 terminaux PowerShell)

#### Terminal 1 - Backend
```powershell
cd backend
npm run start:dev
```

Attendez de voir : `🚀 Rafiq-AI Backend running on http://localhost:3001`

#### Terminal 2 - Frontend  
```powershell
cd frontend
npm run dev
```

Attendez de voir : `Ready - started server on 0.0.0.0:3000`

### ÉTAPE 4 : Utiliser l'Application

Ouvrez votre navigateur : **http://localhost:3000**

## 🎯 UTILISATION

1. **Collez votre texte** dans la grande zone de texte (description projet, FAQ, etc.)
2. **Cliquez** sur "Mettre à jour la base de connaissances"
3. **Attendez** 2-5 secondes (vous verrez "Prêt – X paragraphes chargés")
4. **Posez vos questions** dans le chat !

### Exemple de texte à tester :
```
Le Village Numérique Résistant est un projet innovant de la Nuit de l'Info 2025.
Notre équipe "allez-y" a développé Rafiq-AI, un chatbot intelligent basé sur RAG.
Rafiq utilise Google Gemini pour répondre à toutes vos questions.
Contact : equipe-allez-y@nuitdelinfo.com
```

## 🔄 Changer de Base de Connaissances

- Cliquez sur **"Nouvelle base"**
- Collez un nouveau texte
- Rafiq devient instantanément expert du nouveau contenu !

## ❓ Dépannage

### Backend ne démarre pas
- Vérifiez que la clé API Gemini est dans `backend/.env`
- Vérifiez que le port 3001 est libre

### Frontend ne se connecte pas
- Vérifiez que le backend est démarré
- Vérifiez le fichier `frontend/.env.local` existe avec `NEXT_PUBLIC_API_URL=http://localhost:3001`

### Erreur "base de connaissances pas chargée"
- Vérifiez la connexion internet (appels API Gemini)
- Vérifiez que le texte fait au moins 10 caractères

## 📝 Pourquoi pas Docker ?

Docker a des conflits de dépendances npm complexes entre :
- NestJS 11 et @nestjs/config
- ChromaDB et ses dépendances natives

Le mode dev fonctionne parfaitement et offre les mêmes fonctionnalités :
- ✅ Système RAG complet
- ✅ Vectorisation instantanée
- ✅ Chat intelligent bilingue
- ✅ Affichage des sources
- ✅ Persistance localStorage

---

**Marhaba !** 🇲🇷 Profitez de Rafiq-AI en mode développement !
