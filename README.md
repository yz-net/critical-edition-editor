# Critical Edition Viewer

This repo is for the core for the Fortunoff Archive's [Critical Editions Project](https://editions.fortunoff.library.yale.edu).

If you want to build new instances of a Critical Editions site, check out the site builder repo: [https://github.com/jakekara/essay-formatter](https://github.com/jakekara/essay-formatter).

This React app is built for the Critical Editions project but is designed to be entirely configurable by replacing the data in the public/data folder, rather than hard-coding any of the content into the app. However the files in this folder are not easily editable by humans, so the [site builder](https://github.com/jakekara/essay-formatter) can be used to to generate this data from Markdown files for each essay and a YAML config file.
