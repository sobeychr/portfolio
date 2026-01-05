# Portfolio/utils

## Introduction

Various utils files with Jest and Rollup.

This application is showcasing a simple utils files with its Unit Tests. The final content is bundled via RollUp and makes it available for publishing. Each functions are described below, as all libraries should have their own documentation.

### build.js - getBuildDetails()

Provides Node version, NPM version and current operating system.

```javascript
const details = getBuildDetails();

details.nodeVersion; // `process.versions.node` print Node version via `process` environment
details.npmVersion; // `$ npm -v` print NPM version via CLI
details.osName; // `process.platform` print operating system via `process` environment, only prints "Linux", "Windows" or "!invalid"
```

### build.js - getGitLogs()

Provides details on the latest Git commit and tag.

```javascript
const gitLogs = getGitLogs();

gitLogs.shortHash; // `$ git log --max-count=1 --date=unix --pretty="%h,%ad"` prints the latest Git log shorthash via CLI
gitLogs.tag; // `$ git tag -l --sort=-taggerdate` prints the latest Git tag entry via CLI
gitLogs.timestamp; // `$ git log --max-count=1 --date=unix --pretty="%h,%ad"` prints the latest Git log timestamp via CLI
```

### build.js - tsAliasToVite()

Converts Typescript aliases to Vite aliases.

```javascript
/** vite.config.js */

import { resolve } from 'node:path';
import tsConfigs from './tsconfig.js';
/*
tsConfigs = {
  "compilerOptions": {
    "paths": {
      "@app": [
        "src/app/*"
      ]
    }
  }
};
*/

const pathProcess = resolve(process.cwd(), '.').concat('/');

const aliases = tsAliasToVite(tsConfigs, pathProcess + 'src/');
/*
aliases = {
  '@app': "/my-path/to-test-project/src/app
}
*/
```
