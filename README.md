# Critical Edition Viewer

## 1. Overview

This repo is for the core template of the Fortunoff Archive's
[Critical Editions Project](https://editions.fortunoff.library.yale.edu).

Most of the time, you won't need to modify this repository, and you should be
working with the site builder tool. It allows you to create and maintain your
own Critical Editions site with your own content, without getting into any
programming. To get started, check out the
[site builder](https://github.com/jakekara/essay-formatter) and start building
your own site.

## 2. Development

### 2.1. Do you really need to be here

Once you have a Critical Editions site instance set up with the site builder
mentioned in the previous section, and you find that you do need to modify the
core template — either fixing bugs or adding features or changing the design —
then read on.

### 2.2. Bring your own public folder

To get started developing, you'll need to bring a [public](https://create-react-app.dev/docs/using-the-public-folder/) folder and copy it the
root of this directory. You should already have one that you've generated with
the site builder. You can also fetch a copy of the public folder using
`yarn fetch-public`. This script will get you started with the data from
[Critical Editions site](https://editions.fortunoff.library.yale.edu). This
content, including artwork and essays, is copyright protected, so use it only to
test your template development against it.

### 2.3. Get started

This app is built using `create-react-app` (`react-scripts`). After cloning the
repo and bringing your public folder as discussed in the last section, follow these steps.

Install dependencies

```bash
yarn
```

Start the development server

```
yarn start
```

This will start the react dev server.

### 2.2.4 Other npm scripts

The `package.json` includes several other scripts. You will find these ones
useful — and they do exactly what they sound like:

```
yarn lint
```

```
yarn format
```

```
yarn test
```

You will not find the `deploy*` scripts useful unless you have access to the
Fortunoff s3 bucket. These scripts are for deploying bundled versions of the
core template. These bundles are fetched by the `site-builder` to build the
latest version of the site.

You may wish to rewrite these scripts to push to your own s3 bucket, and update
the site-builder to pull templates from your own production build directory.

## Software license

The software license in this repository does not apply to the public folder, it
does not include any fonts, images, or essay content that may exist in this
repo, including in past or commits. The Critical Edition series published by the
Fortunoff Video Archive for Holocaust testimonies is copyrighted with all rights
reserved by the authors and archive.
