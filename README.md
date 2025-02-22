"# Application de Fitness - React Native

## 📱 Présentation

Application de fitness complète développée avec React Native (Expo) permettant aux utilisateurs de suivre leurs entraînements, consulter des exercices et gérer leur profil.

![Capture d'écran de l'application](https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800)

## ✨ Fonctionnalités

- 🔐 Authentification sécurisée avec Firebase
- 💪 Bibliothèque d'exercices détaillée
- 🏋️ Programmes d'entraînement personnalisés
- 📊 Suivi de progression
- 👤 Gestion de profil utilisateur
- 🌙 Mode sombre natif

## 🛠 Technologies Utilisées

- React Native (Expo)
- Firebase Authentication
- Expo Router
- AsyncStorage
- React Native Reanimated
- TypeScript

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI
- Compte Firebase

## 🚀 Installation

1. Clonez le repository :
bash
git clone [url-du-repo]


2. Installez les dépendances :
bash
npm install


3. Configurez Firebase :
   - Créez un projet dans Firebase
   - Activez l'authentification par email/mot de passe
   - Copiez vos identifiants Firebase dans firebaseConfig.ts

4. Lancez l'application :
bash
npm run dev


## 📱 Structure du Projet

app/
├── _layout.tsx              # Layout principal
├── login.tsx               # Écran de connexion
└── (tabs)/                 # Navigation par onglets
    ├── _layout.tsx         # Configuration des onglets
    ├── index.tsx           # Liste des entraînements
    ├── exercises.tsx       # Bibliothèque d'exercices
    └── profile.tsx         # Profil utilisateur


## 🔒 Authentification

L'application utilise Firebase Authentication pour la gestion des utilisateurs :
- Connexion par email/mot de passe
- Persistance de session
- Protection des routes
- Gestion des erreurs de connexion

## 🎯 Fonctionnalités Principales

### Entraînements
- Liste des programmes disponibles
- Détails des exercices
- Suivi de progression
- Statistiques d'entraînement

### Exercices
- Bibliothèque complète
- Instructions détaillées
- Filtrage par niveau
- Marquage des favoris

### Profil
- Statistiques personnelles
- Historique des entraînements
- Gestion des paramètres
- Options de personnalisation

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier .env à la racine du projet :

env
EXPO_PUBLIC_FIREBASE_API_KEY=votre_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=votre_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=votre_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=votre_app_id


## 📚 Documentation

- [Documentation Technique](docs/technical.md)
- [Guide Utilisateur](docs/user-guide.md)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

-https://github.com/medlamsiah/GymFit-MobileApp

## 🙏 Remerciements

- Images fournies par [Unsplash](https://unsplash.com)
- Icônes par [Ionicons](https://ionicons.com)" generer un PDF garder les logos 
