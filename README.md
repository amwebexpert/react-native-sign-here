# react-native-sign-here

> ⚠️ **WORK IN PROGRESS** ⚠️
> 
> This project is currently under development and is **NOT READY** for production use. 
> Features may be incomplete, unstable, or subject to breaking changes.
> 
> Please do not use this in production applications until a stable release is available.

[![License](https://img.shields.io/npm/l/react-native-sign-here)](./LICENSE)


A gesture handler signature pad for React Native with SVG support and smooth drawing capabilities. Perfect for capturing signatures in mobile applications having the following native dependencies:

- react-native-svg
- react-native-gesture-handler
- react-native-reanimated

If this project has helped you out, please support us with a star 🌟.

## Features

- Smooth signature drawing with gesture handling
- SVG-based rendering for crisp signatures
- Support for both iOS and Android
- Built-in TypeScript definitions
- Customizable stroke width and color
- Clear and reset functionality
- Export signatures as SVG paths

## Screenshots

### iOS

TBD

### Android

TBD

## Setup

### Install

```bash
yarn add react-native-sign-here
```

or

```bash
npm install --save react-native-sign-here
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
yarn add react-native-gesture-handler react-native-reanimated react-native-svg
```

### Basic Usage

TBD

## API Reference

TBD

## Usefull infos & commands

npm module public link:
- https://www.npmjs.com/package/@amwebexpert/react-native-sign-here

Whenever we publish, due to the @ package prefix we need to be explicit regarding public access:
- `npm publish --access=public`

Token generation on npmjs:
- `npm login`
- then goto https://www.npmjs.com/settings/amwebexpert/tokens
  - Generate New Token
  - Granular Access Token
- then on Github project, for the GitHub action to be able to publish:
  - goto https://github.com/VikingLichens/ci-cd-trials/settings/secrets/actions
  - add a repository secret (tokenname + value)
  - use it within the github action like so: `secrets.<token_name_here>`


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
