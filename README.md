
# Documentation de Petify

## Explication du Projet Choisi

Ce projet vise à réinventer les Tamagotchis en utilisant les dernières avancées technologiques afin d'améliorer différents aspects du concept original. Les Tamagotchis, bien qu'étant une idée de jeu simple, offrent de nombreux avantages, notamment en termes de besoin de compagnie, de responsabilité éducative et de divertissement. En recréant ce concept, nous cherchons à apporter une nouvelle expérience numérique qui conserve l'essence de ces avantages tout en les adaptant aux exigences modernes.

Notre objectif est de créer une application mobile interactive qui permettra aux utilisateurs de s'engager avec leurs "nouveaux Tamagotchis" de manière plus immersive et personnalisée. Grâce à des fonctionnalités telles que l'intelligence artificielle et la connectivité en ligne, nous visons à offrir une expérience enrichie qui stimule l'interaction sociale, l'apprentissage et le divertissement.

En résumé, ce projet s'inspire du concept original des Tamagotchis tout en le modernisant pour répondre aux besoins et aux attentes de notre époque, offrant ainsi une expérience ludique et éducative pour les utilisateurs de tous âges.

## Problème Résolu

Notre projet vise à résoudre les limitations des Tamagotchis dans plusieurs aspects clés, notamment la complexité, l'interactivité, la personnalisation et l'adaptabilité, le divertissement, ainsi que la simulation :

- Complexité : Les Tamagotchis originaux étaient limités en termes de complexité de jeu, offrant des interactions relativement simples. Notre projet cherche à résoudre ce problème en introduisant des mécanismes de jeu plus complexes, tels que des choix de narration, des quêtes interactives et des défis évolutifs, offrant ainsi une expérience de jeu plus enrichissante et stimulante.

- Interactivité : Bien que les Tamagotchis aient été conçus pour offrir une certaine forme d'interaction, leur portée était souvent limitée. En utilisant des technologies modernes telles que la réalité augmentée, l'intelligence artificielle et la connectivité en ligne, notre projet vise à améliorer l'interactivité en permettant aux utilisateurs d'engager des conversations plus riches, d'explorer des environnements virtuels et d'interagir avec d'autres joueurs.

- Personnalisation et Adaptabilité : Les Tamagotchis traditionnels offraient une personnalisation limitée et ne s'adaptaient pas nécessairement aux préférences individuelles des utilisateurs. Notre projet cherche à résoudre ce problème en proposant une gamme étendue de options de personnalisation, permettant aux utilisateurs de modifier l'apparence, la personnalité et les préférences de leur compagnon virtuel pour créer une expérience unique et adaptée à leurs besoins.

- Divertissement : Bien que les Tamagotchis aient été divertissants à leur époque, leur attrait peut être limité pour les utilisateurs habitués aux jeux vidéo modernes. Notre projet vise à relever ce défi en offrant une expérience de divertissement plus immersive et dynamique, intégrant des éléments de jeu traditionnels tels que des objectifs, des récompenses et des événements spéciaux pour maintenir l'intérêt des joueurs sur le long terme.

- Simulation : Les Tamagotchis originaux étaient des simulations simples de la vie quotidienne avec un animal de compagnie virtuel. Notre projet cherche à étendre cette simulation en introduisant des aspects plus réalistes et détaillés, tels que la modélisation du comportement, les besoins physiologiques et émotionnels, ainsi que les interactions sociales, offrant ainsi une expérience de simulation plus immersive et authentique.

En abordant ces limitations, notre projet aspire à offrir une nouvelle génération de Tamagotchis qui repousse les frontières de l'interaction virtuelle et offre une expérience de jeu plus riche et engageante pour les utilisateurs de tous âges.

## Technologies Utilisées et Justification

Pour ce projet, nous avons opté pour les technologies suivantes :

- [Kotlin] : Nous avons choisi Kotlin pour le développement du module natif en raison de sa compatibilité avec Android et de sa syntaxe concise qui permet un développement efficace et fiable.

- [TypeScript] : TypeScript a été utilisé pour le développement de l'application et de l'API en raison de sa forte typage statique qui améliore la robustesse du code, ainsi que pour sa capacité à être transpilé en JavaScript, ce qui facilite l'intégration avec d'autres technologies.

- [React Native] : Nous avons opté pour React Native pour le développement de l'interface utilisateur en raison de sa capacité à créer des applications mobiles multiplateformes avec une seule base de code, offrant ainsi un développement plus rapide et une maintenance simplifiée.

- [NestJS] : NestJS a été choisi pour le développement de l'API en raison de son architecture modulaire basée sur les standards et de son intégration transparente avec TypeScript, offrant ainsi une structure claire et organisée pour notre backend.

- [Jest] : Jest a été utilisé pour les tests unitaires en raison de sa simplicité d'utilisation, de sa vitesse d'exécution et de ses fonctionnalités intégrées telles que le mocking, ce qui permet de garantir la qualité du code tout au long du développement.

- [Axios] : Axios a été utilisé pour les requêtes HTTP en raison de sa simplicité, de sa compatibilité avec les navigateurs et les environnements Node.js, ainsi que de sa prise en charge des promesses, offrant ainsi une gestion asynchrone efficace des requêtes réseau.

- [MongoDB] : Nous avons choisi MongoDB comme base de données en raison de sa flexibilité, de sa scalabilité et de sa capacité à stocker des données non structurées, ce qui est idéal pour un projet nécessitant une manipulation dynamique des données.

- [OpenAI] : OpenAI a été utilisé pour intégrer des fonctionnalités d'intelligence artificielle dans notre application, offrant ainsi des fonctionnalités avancées telles que la génération de texte, la compréhension du langage naturel et la modélisation de conversations.

En combinant ces technologies, nous avons pu développer une application mobile moderne et performante qui répond aux exigences de notre projet tout en offrant une expérience utilisateur fluide et enrichissante.

## Description des Pages du Projet

### Page d'Accueil
Cette page permet aux utilisateurs de se connecter à leur compte existant ou de s'inscrire s'ils n'en ont pas encore. Les utilisateurs peuvent saisir leurs informations d'identification telles que leur nom d'utilisateur et leur mot de passe pour accéder à l'application.

### Page d'Accueil
La page d'accueil est la première page que les utilisateurs voient après s'être connectés. Elle offre plusieurs fonctionnalités clés :

- Discussion : Les utilisateurs peuvent interagir avec leur Pet virtuel en utilisant des commandes de discussion. Ils peuvent poser des questions, donner des ordres ou simplement converser avec leur compagnon virtuel.

- Choix des Animaux : Cette section permet aux utilisateurs de choisir parmi une sélection d'animaux virtuels appartenant a l'utilisateur. Chaque animal a ses propres caractéristiques et besoins, offrant ainsi une expérience unique à chaque utilisateur.

- Ajout d'Animal : Un bouton sur la page d'accueil permet aux utilisateurs d'accéder à une page dédiée où ils peuvent ajouter un nouvel animal à leur collection en saisissant son nom et en sélectionnant ses caractéristiques.

- Indicateur de l'Animal et de ses Statistiques : Cette section affiche un aperçu de l'animal actuellement sélectionné par l'utilisateur, ainsi que ses statistiques telles que sa santé, sa nourriture, son bonheur, etc. Cela permet aux utilisateurs de surveiller facilement l'état de leur compagnon virtuel et de prendre les mesures nécessaires pour répondre à ses besoins.

Cette organisation permet une navigation intuitive et offre aux utilisateurs un accès facile à toutes les fonctionnalités importantes de l'application dès leur arrivée sur la page d'accueil.

### Page d'Ajout d'Animal
La page d'ajout d'animal permet aux utilisateurs de créer un nouvel animal virtuel en remplissant un formulaire. Voici les champs inclus dans ce formulaire :

- Nom : Les utilisateurs peuvent saisir un nom pour leur nouvel animal.

- Type d'Animal : Cette section offre aux utilisateurs la possibilité de choisir le type d'animal qu'ils souhaitent ajouter à leur collection. Par exemple, ils peuvent choisir parmi des options telles que lapin, chien, chat, etc.

- Traits de Personnalité : Les utilisateurs peuvent sélectionner les traits de personnalité de leur nouvel animal parmi une liste prédéfinie. Ces traits peuvent inclure des caractéristiques telles que joueur, calme, curieux, etc. Cette sélection influencera le comportement et les interactions de l'animal virtuel dans l'application.

- Talents : Cette section permet aux utilisateurs de choisir les talents ou les compétences spéciales de leur nouvel animal. Par exemple, un animal peut avoir un talent pour la danse, pour chanter, pour jouer à des jeux, etc. Ces talents ajoutent de la diversité et du dynamisme à l'expérience de jeu.

Une fois que les utilisateurs ont rempli tous les champs du formulaire, ils peuvent soumettre leurs informations pour créer leur nouvel animal virtuel. Cette page offre une expérience conviviale et interactive pour permettre aux utilisateurs de personnaliser leur expérience de jeu selon leurs préférences.

## Génération d'un APK Signé

Pour générer un APK signé, suivez les étapes suivantes :

1. Assurez-vous que [conditions préalables requises].
2. Exécutez la commande suivante dans votre terminal :

```bash
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

3. Une fois la génération terminée, déplacez l'apk signé dans le dossier "android/app" directement dans votre dossier de projet.

4. Suivez la création et notez les informations demandées par la commande.

5. Editez votre fichier "~/.gradle/gradle.properties" et ajoutez les variables suivantes (mot de passe défini précédemment).

```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=***** (ajouter le mot de passe)
MYAPP_RELEASE_KEY_PASSWORD=***** (ajouter le mot de passe)
```

6. Modifiez le fichier android/app/build.gradle dans le dossier de votre projet et ajoutez la configuration de signature.

```bash
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

7. Génération de l'APK de sortie : Le projet n'a pas de fichier react.gradle. Nous devons regrouper le paquet JavaScript et les ressources dessinables manuellement en faisant ce qui suit dans un terminal :

```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

8. Tester la version release de l'application

```bash
cd android && gradlew assembleRelease
```

## Configuration et Exécution du Projet

Pour configurer et exécuter le projet, suivez les étapes suivantes :


1. Clonez ce référentiel sur votre machine locale.


### App (ATTENTION, L'APPLICATION PEUT ÊTRE LENTE À COMMUNIQUER EN FONCTION DE LA PLATEFORME/DE L'ÉMULATEUR UTILISÉS)

2. Assurez-vous d'avoir suivi le guide suivant [https://reactnative.dev/docs/next/environment-setup?guide=native], qui va permettre la mise en place de l'environnement react native.
3. Ajoutez les données requises au fichier .env à la suite du fichier .env-sample.
4. Exécutez la commande suivante pour obtenir tous les packages de l'application

```bash
npm i
```

6. Pour lancer l'app, exécutez la commande suivante :

```bash
npm start
```

### Api

5. Ajoutez les données requises au fichier .env à la suite du fichier .env-sample.
6. Exécutez la commande suivante pour obtenir tous les packages de l'api :

```bash
yarn install
```

6. Pour lancer l'api, exécutez la commande suivante :

```bash
yarn start
```
