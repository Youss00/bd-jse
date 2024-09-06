(https://bd-jse.web.app/)


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
## Bande quotidienne *Jean-Sébastien et Éric*
### Environnement nuagique `Firebase` à intégrer : `Firestore`, `Authentication`, `Storage`, et `Hosting`

## Travail d'équipe permis (mais pas plus de 2 personnes par équipe).

>Si vous travaillez en équipe, les deux personnes doivent accepter les fichiers du TP sur *GitHub Classroom*.

>Vous travaillez ensuite chacun.e sur votre version de code, que ce soit dans l'environnement nuagique `Codespaces` ou localement (ou une combinaison des deux, en autant que vous faites vos fusions et synchronisations du code correctement).

>Divisez le travail dans l'équipe de façon à simplifier/faciliter ces fusions (expérimentez, c'est le moment idéal !)

## Objectif/exigences généraux
* Vous créez une application `React` monopage nommée *Jean-Sébastien & Eric* (sigle : `jse`) dont les fonctionnalités minimales sont énumérées dans ce document (*démo* à la fin de ce devis)

>SVP prendre note que les *bandes quotidiennes* sont la propriété intellectuelle de `Dominic Gibeau`, et votre droit d'utilisation des images de ces bandes est limité à ce travail académique.

* Vous devez créer votre application avec les fonctionnalités exigées et illustrées dans la *démo*, mais la conception graphique, et l'interactivité sont entièrement libres (faites preuve de créativité et d'originalité !)

* L'interface utilisateur (UI) de votre application doit être adaptative (fonctionnelle, utilisable et conviviable sur toutes tailles d'écrans raisonnables : ça va être un défi d'afficher la *bande quotidienne* sur un appareil mobile... j'ai ma propre idée, mais avez-vous la vôtre ?) De plus, votre application doit être visuellement attrayante et bien sûr *réactive* et animée

* Les images utilisées dans l'application sont stockées dans `Firebase Storage`

* La gestion des utilisateurs est faite avec `Firebase Authentication` (uniquement `Google Provider` est demandé, mais si vous voulez implémenter plus de modes d'authentification, vous êtes bien sûr libre de le faire)

* Les données utilisateurs de l'application sont stockées et gérées dans `Firebase Firestore` ; certaines données doivent être gérées en temps réel (par exemple, le *plébiscite*, les *commentaires*, et les *votes* sur les commentaires)

* Votre application doit être hébergée sur `Firebase Hosting`, mais attention, les fichiers de déploiement doivent être obfusqués et compressés, et produits sans fichiers `sourcemap` (autrement dit attendez mes instructions en classe avant de déployer !)

* Utilisez `Sass` pour produire votre code `CSS` : un fichier par composant SVP ! 

* Les composants `React` doivent utiliser la syntaxe *fonctionnelle* (la seule que nous avons vu en classe)

* Préférez le code *déclaratif* (ou *fonctionnel*, ou *expressif*) au lieu du code *impératif* partout où c'est possible : on en a parlé en classe, mais sinon me demander des explications additionnelles au besoin

## Étapes à suivre
1. Un gabarit `Vite` est déjà fourni : installez les modules de base de l'appli (ou laissez le temps à `Codespaces` de finir l'installation :wink:)

1. Les modules de base sont déjà spécifiés dans le fichier `package.json` fourni ; installez les autres *modules* au fur et à mesure qu'ils sont requis dans votre solution

1. Commencez par produire la structure, le contenu et le format des composants statiques de l'interface utilisateur ; l'interface minimale et l'interactivité sont illustrées dans la démo jointe au bas de ces instructions (image `gif` animée), cependant la conception graphique et la mise en page peuvent être complètement différents ; n'oubliez pas de personnaliser les `title`, `meta/description`, et `favicon` de votre page Web

1. Utilisez des composants UI d'une librairie externe au besoin (par exemple `MUI`, mais explorez d'autres librairies si vous voulez ajouter à vos compétences. Par exemple : `ChakraUI` - https://v2.chakra-ui.com/, `Mantine` - https://mantine.dev/, etc.)

1. [cette étape sera complétée en classe avec mon aide] Créez le dossier `jse` dans `Firebase Storage` et téléversez-y les images des *bandes quotidiennes* disponibles (abbréviée à *bandes* dans tout ce qui suit) 

1. [cette étape sera complétée en classe avec mon aide] Produisez des données de test dans `Firestore` : 
    
    Une ***bande*** a les caractéristiques suivantes : 
    1. *identifiant* : vous pouvez laisser `Firestore` s'en occuper
    1. *date de publication* : je suggère d'utiliser un *timestamp* **ou** une chaîne de caractères en format **AAAAMMJJ** (l'idée importante ici étant de pouvoir facilement trier par ordre de date)
    1. *mots-clés* (optionnel) : une liste de chaînes de caractères
    1. *url de la bande* : adresse *http* sur `Firebase Storage` du fichier image de la bande
    1. *statut aime* ou *plebiscite* de l'image : un tableau contenant les identifiants des utilisateurs ayant *aimé* cette bande
    1. Un ensemble de commentaires associés à la bande (affichés par date d'ajout en ordre chronologique descendant)

    Un ***commentaire*** a les caractéristiques suivantes : 
    1. *identifiant* : je suggère de laisser `Firestore` le générer dynamiquement
    1. *texte* : texte du commentaire
    1. *nom de l'utilisateur* : nom de l'utilisateur ayant laissé le commentaire
    1. *identifiant de l'utilisateur* : identifiant de l'utilisateur ayant laissé ce commentaire
    1. *timestamp* : format évident (pas affiché, mais utilisé pour ordonner l'affichage des commentaires)
    1. *votes* : un tableau associatif (*map*) contenant les votes laissés par les utilisateurs sur ce commentaire

    Un ***utilisateur*** a les caractéristiques suivantes : 
    1. *identifiant* : c'est l'identifiant retourné par `Firebase Authentication`
    1. *nom* : c'est la valeur retournée par `Google Provider`
    1. *avatar* : c'est la valeur retournée par `Google Provider`
    1. *courriel* : c'est la valeur retournée par `Google Provider`

      >suggestion : une *collection* `Firestore` est nécessaire pour gérer les bandes et toutes les données associées, et une deuxième collection **séparée** pour gérer les utilisateurs)
  
1. Produisez les fonctionnalités requises par l'interactivité de votre application : 
    1. Afficher la bande quotidienne et toutes les données associées à partir de `Firestore` ; par défaut il s'agit de la dernière bande disponible (identifiable par la date de publication la plus récente)
    
        >IMPORTANT : l'affichage du *plébisicite*, des *commentaires* et des *votes* doivent raffraîchir l'interface utilisateur de tous les navigateurs connectés à l'application **en temps réel** (sans nécéssiter un raffraîchissement manuel de la page Web)
    
        >IMPORTANT : l'affichage d'un *commentaire* est *priorisé*/*pénalisé* selon le différentiel de votes *positifs*/*négatifs* qu'il a reçu (à vous de déterminer le mode exacte d'implémentation de cette fonctionnalité : vous n'êtes pas obligé de vous en tenir à ce qui est montré dans la *démo*)
    
    1. Afficher la bande quotiodienne *précédente*, *suivante*, *première*, *dernière* (le tout étant déterminé par date de publication)
    1. Se connecter/déconnecter avec `Google` (utiliser `Firebase Authentication`)
    1. Aimer/Désaimer une bande (seul un utilisateur connecté peut faire ça) 
    1. Ajouter un commentaire à une bande (seul un utilisateur connecté peut faire ça)
    1. Supprimer un commentaire à une bande (seul l'utilisateur connecté et ayant laissé le commentaire peut faire ça)
    1. Voter sur un commentaire à une bande (seul un utilisateur connecté peut faire ça) : le vote peut être *positif* (👍), *négatif* (👎), ou *neutre* (ni 👍, ni 👎)

1. Gérez les messages de l'interface utilisateur (messages *toast*) comme dans l'application *démo* fournie ; au minimum vous devez produire les messages suivants : 
    1. Fonctionnalité réservée
    1. Connexion 
    1. Déconnexion 
    1. Commentaire ajouté
    1. Commentaire supprimé

1. [FACULTATIF - POINTS BONIS] Implémentez le UI et la logique de code requis pour les fonctionnalités facultatives suivantes :
    1. (facile) Affichage d'une bande quotidienne aléatoire
    1. (plus difficile - points bonis en masse !) Affichage des bandes quotidiennes par mots-clés (à mon avis, le plus difficile ici c'est de concevoir la bonne interactivité UI/UX)

1. Compilez le code source de votre solution complétée et déployez-le sur `Firebase Hosting` : testez extensivement **toutes** les fonctionnalités, à partir de plusieurs ordinateurs différents, avec des *utilisateurs* différents

1. Synchronisez (`add`, `commit`, `push`) fréquemment votre solution complétée avec le dépôt `GitHub` qui vous a été assigné lorsque vous avez accepté le travail (c'est le dépôt distant (*remote*) déjà défini dans votre projet)
:warning: en particulier faites une dernière synchro après avoir complété la dernière étape ci-dessous :warning:

1. :bangbang: :warning: :x: NON, NON, et NON : pour ce travail, **NE DÉPLOYEZ PAS** votre solution sur `GitHub Pages` (sinon, risque de plagiat) :bangbang: :warning: :x:

1. Effacez **TOUT** le contenu de ce fichier `README.md` et remplacez le par une seule ligne contenant l'URL de votre solution hébergée sur `Firebase Hosting`

### Gardez une copie personnelle de votre travail : le dépôt de remise sur `582-4PA` sera supprimé une fois la correction complétée et les notes publiées.

---

<img src="/admin/demo.gif" alt="demo de la solution" title="Démo de la solution modèle" />
