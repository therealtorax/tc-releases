# TC.RELEASES — TechCafé Play

> Ton calendrier personnalisé des sorties de jeux vidéo.

Filtre les prochaines sorties par plateforme et par genre. Aucun compte requis, aucun serveur. Tout tourne dans le navigateur.

---

## Démo rapide

1. Ouvre l'app
2. Entre ta clé RAWG gratuite (30 secondes sur [rawg.io/apidocs](https://rawg.io/apidocs))
3. Sélectionne tes plateformes et genres
4. Profite

---

## Déploiement sur GitHub Pages (5 minutes)

### 1. Fork ou clone ce repo

```bash
git clone https://github.com/TON_COMPTE/tc-releases.git
cd tc-releases
```

### 2. Active GitHub Pages via GitHub Actions

Dans ton repo sur GitHub :
- Va dans **Settings → Pages**
- Source : **GitHub Actions**

### 3. Push sur `main`

Le workflow `.github/workflows/deploy.yml` se déclenche automatiquement et déploie l'app sur :

```
https://TON_COMPTE.github.io/tc-releases/
```

C'est tout.

---

## Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173).

---

## Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [API RAWG](https://rawg.io/apidocs) — gratuite, 20 000 requêtes/mois
- Zéro dépendance UI externe
- Zéro backend

---

## Données & confidentialité

La clé API RAWG est stockée uniquement dans le `localStorage` du navigateur de l'utilisateur. Elle ne transite par aucun serveur tiers. Chaque membre de la communauté utilise sa propre clé.

---

## Contribuer

Issues et PRs bienvenus. Projet communautaire TechCafé Play.

---

*Fait avec 🎮 pour la communauté [TechCafé](https://techcafe.fr)*
