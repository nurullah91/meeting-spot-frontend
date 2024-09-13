# Meeting Spot

This project is a Meeting room management website frontend. An overview video of this projects is [link](https://drive.google.com/file/d/1X1OYIqwbcAmUvkd7rhigBhqio3l_GdSx/view?usp=drive_link)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Local Installation

To run this project locally first clone this repository and follow the commands in your terminal. Then it will run on the localhost 5073 port.

```
npm install
npm run dev
```

> - An overview video of this project [here](https://drive.google.com/file/d/1X1OYIqwbcAmUvkd7rhigBhqio3l_GdSx/view?usp=drive_link)
> - Server code [Link](https://github.com/nurullah91/meeting-sport-backend)
> - Server Live deployment [Link](https://meeting-spot-backend.vercel.app/)
> - Frontend Live deployment [Link](https://meeting-spot-backend.vercel.app/)
