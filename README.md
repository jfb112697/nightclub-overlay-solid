# Nightclub Overlay Re-write

A full re-write of the [nightclub-overlay](https://github.com/jfb112697/nightclub-overlay) React project in SolidJS!

With an emphasis on optimizing state management, easier reusability and to be compatible with the updated scoreboard data model in [nycmelee-scoreboard](https://github.com/jfb112697/nycmelee-scoreboard) which itself is a replacement of an ancient WinForms application.

### Goals
The initial goal between this and nycmelee-scoreboard is to meet total parity with nightclub-overlay and worlstar-scoreboard while maintaining backwards compatibility and introducing forwards compatiblity with worldstar-scoreboard.

The end goal is to provide a solid and extremely stable broadcast pipeline and to then work in customizability

## Usage

I host this on Firebase for use in broadcast, however any solution will work.

```bash
$ pnpm install # or npm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `pnpm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `pnpm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vitejs.dev/guide/static-deploy.html)
