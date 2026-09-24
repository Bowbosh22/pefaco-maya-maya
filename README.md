# Pefaco Hotels — Maya-Maya & Alima Palace (démonstration)

Site de démonstration commerciale réalisé par l'Atelier KPM pour Pefaco Hotels, présentant
deux établissements : **Pefaco Hotel Maya-Maya** (Brazzaville) et **Pefaco Hotel Alima
Palace** (Oyo).

Ce n'est pas un site officiel Pefaco : c'est un outil de prospection montrant ce à quoi
pourrait ressembler le site web de chaque hôtel. Les tarifs et catégories de chambres pour
Maya-Maya proviennent de la plaquette officielle communiquée par Pefaco ; les informations
pour Oyo restent à confirmer avec l'hôtel (tarifs estimés, photos provisoires).

## Stack technique

- React 18 + Vite
- react-router-dom (HashRouter, pour un déploiement GitHub Pages sans configuration serveur)
- Aucune dépendance de style externe : CSS custom (`src/styles/global.css`) + variables CSS

## Développement local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run preview
```

## Déploiement

Le site est déployé automatiquement sur **GitHub Pages** via GitHub Actions
(`.github/workflows/deploy.yml`) à chaque push sur `main`. Le workflow build le
projet puis publie le contenu de `dist/`.

Pour activer Pages sur ce dépôt (une seule fois) : Settings → Pages → Source →
« GitHub Actions ».

## Structure

```
src/
  data/hotels.js          Modèle de données (les deux hôtels, toutes les chambres)
  context/HotelContext.jsx Contexte React exposant l'hôtel courant aux pages
  components/             Composants partagés (Navbar, Footer, cartes, etc.)
  pages/                  Une page par route
  utils/reservation.js    Logique du formulaire de réservation (dates, tarifs, etc.)
  styles/global.css       Design system (couleurs, typographies, boutons)
```

## Historique

Ce dépôt a été reconstruit à partir de la version précédemment publiée du site (via
Claude Artifacts) après un changement d'hébergement (Vercel → GitHub Pages). Voir le
projet « Landing page prospect » (document `PEFACO-MAYA-MAYA-SUIVI.md`) pour l'historique
complet des échanges avec Pefaco et des décisions prises sur ce projet.
