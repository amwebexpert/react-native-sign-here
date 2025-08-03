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
- Zero native dependencies
- Built-in TypeScript definitions
- Customizable stroke width and color
- Clear and reset functionality
- Export signatures as SVG paths
- Responsive design that works on all screen sizes

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

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { SignHere, SignHereRef } from 'react-native-sign-here';

const MyComponent = () => {
  const signHereRef = useRef<SignHereRef>(null);

  const handleClear = () => {
    signHereRef.current?.clear();
  };

  const handleGetSignature = () => {
    const signature = signHereRef.current?.getSignature();
    console.log('Signature path:', signature);
  };

  return (
    <View style={{ flex: 1 }}>
      <SignHere
        ref={signHereRef}
        style={{ flex: 1, backgroundColor: '#f0f0f0' }}
        strokeWidth={3}
        strokeColor="#000000"
      />
      <View style={{ flexDirection: 'row', padding: 16 }}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Get Signature" onPress={handleGetSignature} />
      </View>
    </View>
  );
};
```

## API Reference

### Props

| Prop              | Type        | Default         | Description                               |
|-------------------|-------------|-----------------|-------------------------------------------|
| `strokeWidth`     | `number`    | `3`             | Width of the signature stroke             |
| `strokeColor`     | `string`    | `"#000000"`     | Color of the signature stroke             |
| `backgroundColor` | `string`    | `"transparent"` | Background color of the signature area    |
| `style`           | `ViewStyle` | `{}`            | Custom styles for the signature component |

### Methods

| Method           | Description                                   |
|------------------|-----------------------------------------------|
| `clear()`        | Clears the current signature                  |
| `getSignature()` | Returns the signature as an SVG path string   |
| `isEmpty()`      | Returns `true` if no signature has been drawn |

## Advanced Usage

### Custom Styling

```tsx
<SignHere
  style={{
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  }}
  strokeWidth={5}
  strokeColor="#ff0000"
  backgroundColor="#ffffff"
/>
```

### Handling Signature Events

```tsx
<SignHere
  onSignatureStart={() => console.log('Signature started')}
  onSignatureEnd={() => console.log('Signature ended')}
  onSignatureChange={(isEmpty) => console.log('Signature changed:', isEmpty)}
/>
```

### Exporting Signatures

```tsx
const handleExport = () => {
  const signature = signHereRef.current?.getSignature();
  if (signature) {
    // Send signature to server or save locally
    console.log('SVG Path:', signature);
  }
};
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
