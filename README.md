# livebench.github.io

Static react-based website for livebench.ai.

## Development

This should be done on a local machine so that changes may be verified with browser prior to pushing. GitHub Workspaces should also work.

### Setup
```bash
npm install
```

### Run dev server
```bash
npm run start
```

Automatically reloads on file changes and serves at [http://localhost:3000](http://localhost:3000) by default.

### Deploying
```bash
npm run build
npm run deploy
```

This will build the project and push it to the `gh-pages` branch.

