# O'Pong

> :warning: **N'oublie pas d'aller faire un tour sur le [wiki](https://github.com/slampazona/oclock-pong/wiki), il y a pas mal d'informations importantes sur le fonctionnement global. Comme par exemple, l'adresse du swagger, ou encore l'explication du déploiement !**

## :sunny: Pré-requis

### Le back

- Pour commencer à utiliser ce projet, créer un fichier de configuration `.env` dans le dossier racine
en prenant comme exemple le fichier `.env.example`
Il y a la possibilité d'avoir plusieurs fichiers `.env.*` comme `.env.development`, `.env.test` et `.env.production`,
permettant également d'écraser des variables définies individuellement dans le fichier `.env.*.local` approprié. Y'a juste à créer 2 base de données :
  - Une pour l'application: ex: pong
  - Une pour les tests : ex : pong_test
Il faut penser à bien configurer les fichier `.env.production` et `.env.test` en fonction.

- Ensuite il faut installer la BDD, c'est une mariaDB ( un simple serveur MySql fera très bien l'affaire )  

Si jamais vous avez un soucis avec les reqêtes SQL pendant le développement, notamment avec les `GROUP`, il faut changer votre [sql_mode](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html), y'a moyen de le faire de façon permanente en modifiant votre fichier de config `my.cnf`

Pour l'installation des tables, rien à faire. Sequelize va installer tout seul les tables manquantes :wink:

### Le front

Bah il a son propre dépôt, du coup c'est dans son propre [README.md](https://github.com/slampazona/oclock-pong-front#readme)


## :punch: Utilisation
- Installation des dépendances : `yarn`
- Lancement du serveur local : `yarn dev`
- Le serveur sera disponible sur le port configuré
Par défaut à cette adresse : [http://localhost:1331](http://localhost:1331)

</details>

## Liste des scripts

Ces derniers se trouvent dans le fichier `package.json`, et vont venir s’installer dans le dossier `node_modules`.

Installe les dépendances nécessaires au bon fonctionnement du projet
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

Lance l'application en production, mais nécessite d'avoir fait un build du front au préalable
```sh
yarn start
```

Vient exécuter tous les tests, une fois.
```sh
yarn test
```

Vient exécuter tous les tests, à chaque modification.
```sh
yarn test:watch
```

Lorsque cette commande est exécutée, le script va faire le tour de l’application (selon les arguments qu’on lui a donné) afin de vérifier que le projet est conforme aux règles ESlint présentes dans le fichier .eslintrc.
```sh
yarn lint
```

Va formater le code de l’application de façon universelle.
```sh
yarn pretty
```

## Compilation

On va pouvoir compiler à la fois le front et le back pour la production car il se trouve que le back va servir le front. 
Il va donc falloir faire une compilation du front :
```bash
cd front-react
yarn build
```

Puis revenir dans le back et build le back
```bash
cd ../
yarn build
```

Une fois que tout est build, on peut lancer le serveur de prod buildé : 
```bash
yarn start
```

En accédant sur le port configuré sur le fichier d'env `.env.production`, on devrait avoir l'application qui tourne en prod.