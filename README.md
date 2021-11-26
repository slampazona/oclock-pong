# {{PlanifBack}}

Toute modification pour améliorer ce starter est la bienvenue :heart:

## :sunny: Pré-requis

- Pour commencer à utiliser ce projet, créer un fichier de configuration `.env` dans le dossier racine
en prenant comme exemple le fichier `.env.example`
Il y a la possibilité d'avoir plusieurs fichiers `.env.*` comme `.env.development`, `.env.test` et `.env.production`,
permettant également d'écraser des variables définies individuellement dans le fichier `.env.*.local` approprié.

- Ensuite il faut installer la BDD, c'est une mariaDB ( un simple serveur MySql fera très bien l'affaire )  
Le fichier SQL comportant la structure et quelques données de test se trouve dans le dossier [.assets](./.assets) à la racine du project
( Au passage y'a aussi le [MCD](./.assets/Programmes.svg) dans ce dossier ).  
Y'a plus qu'a importer le fichier [planif_back.sql](./.assets/planif_back.sql)  
Si jamais vous avez un soucis avec les reqêtes SQL pendant le développement, notamment avec les `GROUP`, il faut changer votre [sql_mode](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html)  
Y'a moyen de le faire de façon permanente en modifiant votre fichier de config `my.cnf`

## :punch: Utilisation
<details>
  <summary>Initialiser le serveur Node</summary>
  <p>

- Installation des dépendances : `yarn`
- Lancement de votre serveur local : `yarn start`
- Le serveur sera disponible sur le port que vous avez configuré
Par défaut à cette adresse : [http://localhost:3130](http://localhost:3130)

    </p>
  </details>

 ## Liste des scripts

Installe les dépendances nécessaires au bon fonctionnement du projet...
Ces derniers se trouvent dans le fichier `package.json`, et vont venir s’installer dans le dossier `node_modules`.
```sh
yarn
```

Va compiler nos fichiers dans une version qui est nécessaire pour le développement de l’application. Également, grâce à un serveur que l’on va appeler « watcher », l’application va pouvoir se recharger automatiquement lorsque nous effectuons une modification. De cette façon, nous allons voir les modifications de façon quasi instantanée.
```sh
yarn dev
```

Compile et prépare les fichiers sources pour la production.
```sh
yarn build
```

Lance l'application en production, mais nécessite d'avoir fait un build au préalable
```sh
yarn start
```

Vient exécuter tous les tests, une fois. Toutefois, il est possible de tester un fichier en particulier en le passant en tant que paramètre. Par exemple : `yarn test tests/reducers/xxx/xxx.test.js`
```sh
yarn test
```

Lorsque cette commande est exécutée, le script va faire le tour de l’application (selon les arguments qu’on lui a donné) afin de vérifier que le projet est conforme aux règles ESlint présentes dans le fichier .eslintrc.
```sh
yarn lint
```

Va formater le code de l’application de façon universel.
```sh
yarn pretty
```

