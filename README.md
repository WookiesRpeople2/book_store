#Tech stack:
react ruseables
TanStack Query
react native
expo
nativewind

#Justifications
1. React Reusables
J’ai choisi d’utiliser des composants réutilisables React afin de favoriser la modularité et la maintenabilité du code. Cela permet de réduire la duplication de code, d’assurer une cohérence visuelle et fonctionnelle dans toute l’application, et de faciliter les évolutions futures.

2. TanStack Query
TanStack Query (anciennement React Query) a été utilisé pour la gestion des données asynchrones. Cette bibliothèque simplifie la récupération, la mise en cache et la synchronisation des données avec le backend, ce qui améliore la performance et l’expérience utilisateur sans avoir à gérer manuellement des états complexes de chargement ou d’erreurs.

3. React Context
J’ai intégré React Context pour la gestion de l’état global de l’application. Cela permet de partager des données entre différents composants sans avoir besoin de prop drilling, ce qui rend le code plus lisible et plus facile à maintenir.

4. NativeWind
NativeWind a été utilisé pour le styling en React Native. Cette bibliothèque permet d’appliquer des classes utilitaires similaires à Tailwind CSS, ce qui accélère le développement des interfaces tout en assurant une cohérence visuelle et une personnalisation facile.

#Lancer la projet
```
npx expo start
```


#if problems with metro
make a metro.config.js file and place this code inside
```
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);
 
module.exports = withNativeWind(config, { input: 'assets/global.css', inlineRem: 16 });
```
```
```
```
```


• Afficher la liste des livres (GET /books).✓
• Ajouter un livre (POST /books).✓
• Modifier un livre (PUT /books/:id).✓
• Supprimer un livre (DELETE /books/:id).✓
• Changer le statut “lu / non lu”.✓
• Navigation entre écrans ✓
• Notes liées à un livre ( ) -> Affichage sur Details✓
• Favoris✓
• UI améliorée✓
• Rating ✓
• Recherche / filtrage✓
• Couverture photo✓
• Persistance locale (mode offline)✓
• Statistiques / Dashboard✓
• Intégration de l’API OpenLibrary✓
• Thèmes personnalisables (mode clair/sombre)✓
