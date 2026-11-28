# Tastebook: Recipe Finder

A responsive React application for discovering recipes. Users can search by name, browse recipe cards, and open a details page with timing, nutrition, ingredients, and step-by-step instructions.

**Live demo:** [Add your deployed URL here]

## Features

- Search recipes by name
- Responsive recipe grid (1 to 4 columns depending on screen size)
- Recipe details page with prep time, cook time, servings, calories, ingredients, and instructions
- Loading indicator while data is fetched
- Error state with a retry option
- Empty state for searches with no results
- Client-side routing with no full page reloads

## Tech Stack

| Category | Technology |
|---|---|
| UI library | React |
| Build tool | Vite |
| Routing | React Router (`react-router-dom`) |
| Styling | Tailwind CSS |
| Data source | [DummyJSON Recipes API](https://dummyjson.com/docs/recipes) |

No API key or environment variables are required.

## Project Structure

```
Recipe-Finder/
├── public/
├── src/
│   ├── components/
│   │   └── layouts/
│   │       └── NavBar.jsx          # Site navigation
│   ├── pages/
│   │   ├── Home.jsx                # Search and recipe listing
│   │   └── RecipeDetails.jsx       # Recipe details (/recipes/:id)
│   ├── App.jsx                     # Route definitions
│   ├── App.css
│   ├── index.css                   # Tailwind directives
│   └── main.jsx                    # Entry point with BrowserRouter
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/assemkaram/Recipe-Finder.git
cd Recipe-Finder
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API Endpoints

| Purpose | Endpoint |
|---|---|
| List recipes | `https://dummyjson.com/recipes?limit=12` |
| Search recipes | `https://dummyjson.com/recipes/search?q={query}` |
| Get a recipe | `https://dummyjson.com/recipes/{id}` |

## Routes

| Path | Page |
|---|---|
| `/` | Home: search and recipe list |
| `/recipes/:id` | Recipe details |
| `*` | Not found |

## Deployment

This project can be deployed to [Vercel](https://vercel.com/). Because it uses client-side routing, include the following `vercel.json` in the project root so that direct URLs and page refreshes resolve correctly:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Author

**Assem Karam**, Front-End / React Developer

- GitHub: [@assemkaram](https://github.com/assemkaram)
- LinkedIn: [linkedin.com/in/assemkaram](https://linkedin.com/in/assemkaram)
- Portfolio: [assem-karam-portfolio.vercel.app](https://assem-karam-portfolio.vercel.app/)
