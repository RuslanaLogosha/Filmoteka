## Webpack5 basic kit

:fork_and_knife: If needed, this repo can be forked and used further. 

:warning: If this repo is cloned directly please don't forget to remove `.git` folder associated with current repo.

Once done, all dependancies should be installed via npm:

```shell
npm install
```
Available scripts are listed in `package.json` file:

### Development mode:

Intended for development process utilizing powerful `webpack development server`.

```shell
npm run dev
```

Default port: 7000 [http://localhost:7000](http://localhost:7000). It can be changed in `devServer` settings in `dev.js` config file located at `config/dev.js`.

### Production mode:

Used to create optimized files for further usage on hosting. 

```shell
npm run build
```

Files shall be placed to `build` folder.

### Deploying to GitHub

To create branch named `gh-pages` in GitHub pages which will publish a project the following steps are required:

Field `homepage` in `package.json` file should be changed to reflect actual project's repo address. 

```json
"homepage": "https://user-name.github.io/repo-name"
```

After that the following command shall create a build and publish it to `gh-pages` branch.

```shell
npm run deploy
```
