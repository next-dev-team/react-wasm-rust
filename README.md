
# React-Wasm

The next generation of enterprise web applications with react and wasm `Preview:`<https://wasm-react.netlify.app>

## Teach Stack

- [WasmRust](https://github.com/rustwasm/wasm-bindgen) Wasm with rust using Wasm-bindgen
- [Webpack MFSU](https://umijs.org/blog/mfsu-faster-than-vite) - Familiar with Webpack features
- [React](https://react.dev/) - React official website
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Ant-Design V5](https://ant.design) - Enterprise UI library
- [Antd procomponents](https://procomponents.ant.design/) - Antd procomponent

## Development

 Preparation tools

- [Node](http://nodejs.org/) and [git](https://git-scm.com/)
- [Rust](https://www.rust-lang.org/tools/install)

 Develop

- Install pnpm: `npm i -g pnpm`
- Compile rust: `Cargo update`
- Run dev: `npm run dev`
- Run build: `npm run build`

## Translate

- Fist init check config in `script/locale/locale-config.json`

### Auto translate with lobe/i18n using gpt

- Setup: `lobe-i18n -0`
- Enter key or proxy server
- Translate `npm run locale:sync` will auto extract all translate to default lang and translate to all language that config in scrip/locale-config.json

## Rust lib ref

<https://github.com/MoeYc/umi4-wasm-example/blob/main/packages/widget/.umirc.ts>
<https://github.com/tkat0/react-wasm-tutorial>
<https://github.com/DavidZemon/SccaSoloPointsCalculator/tree/master>
<https://github.com/monroeclinton/wasm-learn>
 <https://www.tkat0.dev/posts/how-to-create-a-react-app-with-rust-and-wasm/#create-rust-library-for-wasm>

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Submit [issues](https://github.com/next-dev-team/react-next-admin/issues) to report bugs or ask questions.

## MIT License
