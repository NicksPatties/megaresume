# MegaResume

This project allows you to create a resume using all of your work experience you've accrued over the years. Control what experience is visble, sort your highlights in the desired order. Job looking for a specific set of experience and don't want to rewrite your resume? Use the tag system to hide irrelevant highlights, and export your document in PDF format. Never rewrite a resume again!

## Using MegaResume

Follow [the link here](https://nickspatties.github.io/megaresume) to use MegaResume!

Click the icon on the upper left corner of the screen to open the menu, your main interface to MegaResume. Click the `Instructions` button to learn more about how the app works.

## Contributing to MegaResume

### Development requirements

To set up the project, [install pnpm](https://pnpm.io/next/installation). You may (probably) also use `npm` to build the project, but this hasn't been tested yet.

- Package manager (pnpm, or npm)
- Node 16.x and up

### Some handy commands

**Start your development server**

```
$ pnpm run dev
```

You can access your development environment using the link in the output below.

**Run unit tests with `vitest`**

```
$ pnpm test
```

**Run end to end tests with playwright**

```
$ pnpm e2e
```

Note that you may be asked to install `playwright` if this is your first time running the end to end tests.

```
$ npx playwright install
```

**Build and review a production version of the application**

Build a production version of the project like so:

```
$ pnpm run build
```

You can preview the production build on your machine using this command:

```
$ pnpm run preview
```
