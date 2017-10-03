# puit canadien

## Introduction

Ceci était mon projet technologique de STI2D pendant l'année scolaire de 2015-2016. 
L'objectif de ce projet était de créer un puit canadien où l'utilisateur aurait pu configurer à distance celui-ci.

Je me suis occupé de la partie "web" du projet.
En effet, j'ai développé le serveur web avec nodejs et quelques frameworks utiles qu'on peut voir dans [package.json](https://github.com/lpenaud/puit_canadien/blob/master/package.json#L20).
Puis, j'ai réalisé l'interface web avec du CSS vanilla, de l'HTML5 et du [jQuery](http://jquery.com/ "Site officiel de jQuery") accompagné du plugin [jCanvas](https://projects.calebevans.me/jcanvas, "Site officiel de jCanvas").

## Images

Images illustrant le projet disponible dans le dossier [_images](https://github.com/lpenaud/puit_canadien/tree/master/_images).

### Sur navigateur web PC :

**Graphique**
![Page graphique PC](https://raw.githubusercontent.com/lpenaud/puit_canadien/master/_images/Puit%20Canadien%20Graphique.png)

**Thermomètre**
![Page thermomètre PC](https://raw.githubusercontent.com/lpenaud/puit_canadien/master/_images/Screenshot-2017-10-2%20Puit%20Canadien%20(2).png)

### Sur navigateur web Mobile :

| Thermomètre | Graphique |
| :---------: | :-------: |
| ![Page graphique mobile](https://raw.githubusercontent.com/lpenaud/puit_canadien/master/_images/Screenshot-Graphique-mobile.png) | ![Page thermométre mobile](https://raw.githubusercontent.com/lpenaud/puit_canadien/master/_images/Screenshot-Thermo-mobile.png)

## À faire

- [x] Faire des graphiques création du boucle dans la fonction begin().
- [x] Analyser rapport d'erreur d'écriture de json pour ensuite bien confirmer coté client.
- [x] Tester les données côté client.
- [x] Rajouté la partie style et script du tableau du document PageGraph.html.
- [x] Rajouté les grilles X,Y à la demande de l'utilisateur.
- [x] Faire une bonne interface pour les mobiles.
- [x] Faire une bonne interface pour les tablettes.
- [x] Ajout de personnlisation concercant la taille des nombres pour le graphique.
- [ ] Ajout de choix de couleur pour la courbe.
- [ ] Tester le serveur sur un Rapsberry-pi.
- [ ] Ajout d'un script générant l'historique des données reçus du puits (donnée pour la courbe).
- [ ] Ajout d'un système de compte.
- [ ] Ajout de création d’un programme de réglage des horaires selon les intentions de l’utilisateur.

