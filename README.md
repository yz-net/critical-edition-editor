# Critical Edition Editor

- Uses editorJS block style editor to create and update critical editions for the [Critical Editions](https://editions.fortunoff.library.yale.edu/) project.
- Deployed on AWS http://edit.editions.fortunoff.library.yale.edu/

## Building

- Make sure to run `npm i` first to download dependencies.
- Building: `npm run build`
- Deploying: `npm run deploy`

If you get any errors while building try `rm -r out/` and build again.

You need to be authenticated with AWS to be able to use the `deploy` command.
