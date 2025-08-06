# react-native-sign-here

[![npm](https://img.shields.io/npm/v/@amwebexpert/react-native-sign-here)](https://www.npmjs.com/package/@amwebexpert/react-native-sign-here)
[![npm downloads](https://img.shields.io/npm/dm/@amwebexpert/react-native-sign-here)](https://www.npmjs.com/package/@amwebexpert/react-native-sign-here) [![License](https://img.shields.io/npm/l/@amwebexpert/react-native-sign-here)](./LICENSE) ![GitHub last commit](https://img.shields.io/github/last-commit/amwebexpert/react-native-sign-here) ![Latest tag](https://img.shields.io/github/v/tag/amwebexpert/react-native-sign-here)

> *Under active development*
> 
> ⚠️ This project is currently under development: Features may be incomplete, unstable, or subject to breaking changes.

A React Native signature pad with SVG support and smooth drawing capabilities. Perfect for capturing digital signatures and handwriting in mobile applications with the following native dependencies:

- [`react-native-svg`](https://www.npmjs.com/package/react-native-svg)
- [`react-native-gesture-handler`](https://www.npmjs.com/package/react-native-gesture-handler)
- [`react-native-reanimated`](https://www.npmjs.com/package/react-native-reanimated)

If this project has helped you out, please support us with a star 🌟.

## Features

- Smooth signature drawing with gesture handling
- SVG-based rendering for crisp signatures
- Support for both `iOS` and `Android`
- Built-in `TypeScript` definitions
- Customizable stroke width and color
- Undo, Clear and Reset features
- Import & Export signatures as SVG paths

## Screenshots

iOS                                                   | Android
------------------------------------------------------|----------------------------------------------------------
<img width="300" src="docs/images/example-ios.png" /> | <img width="300" src="docs/images/example-android.jpg" />


## Setup

### Install

To install the library and all its peer dependencies, run one of the following commands:

```bash
yarn add react-native-sign-here react-native-gesture-handler react-native-reanimated react-native-svg
```

or

```bash
npm install --save react-native-sign-here react-native-gesture-handler react-native-reanimated react-native-svg
```

### Basic Usage

The simplest way to use the signature pad:

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import DrawHere, { ExportFormat, DrawHereRef } from 'react-native-sign-here';

const SignatureScreen = () => {
  const signatureRef = useRef<DrawHereRef>(null);

  const handleSave = async () => {
    if (signatureRef.current) {
      const svg = await signatureRef.current.exportSvg();
      console.log('Signature SVG:', svg);
    }
  };

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <DrawHere
        ref={signatureRef}
        strokeColor="black"
        strokeWidth={1}
        onChange={(state: DrawingState) => {
          console.log('Drawing state changed:', state);
        }}
      />
      <Button title="Save Signature" onPress={handleSave} />
      <Button title="Clear" onPress={handleClear} />
    </View>
  );
};
```

### Advanced Usage

#### Custom Styling and Configuration

```tsx
import React, { useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';
import DrawHere, { DrawingState, ExportFormat, DrawHereRef } from 'react-native-sign-here';

const AdvancedSignatureScreen = () => {
  const signatureRef = useRef<DrawHereRef>(null);
  const [isSigned, setIsSigned] = useState(false);

  const handleSignatureChange = (state: DrawingState) => {
    setIsSigned(state.elements.length > 0);
  };

  const handleUndo = () => {
    signatureRef.current?.undo();
  };

  const handleReset = () => {
    signatureRef.current?.reset();
  };

  const handleImportSvg = () => {
    const sampleSvg = `<svg width="200" height="100">
      <path d="M10 10 L50 50 L90 10" stroke="#000" stroke-width="2" fill="none"/>
    </svg>`;
    signatureRef.current?.importSvg(sampleSvg);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        {isSigned ? 'Signature captured' : 'Please sign below'}
      </Text>
      
      <DrawHere
        ref={signatureRef}
        strokeColor="#2E86AB"
        strokeWidth={3}
        onChange={handleSignatureChange}
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <Button title="Undo" onPress={handleUndo} />
        <Button title="Reset" onPress={handleReset} />
        <Button title="Import SVG" onPress={handleImportSvg} />
      </View>
    </View>
  );
};
```

## Examples

Working examples are available in the `src/examples/` directory:

- **Basic Usage**: Simple signature capture with save and clear functionality
- **Advanced Usage**: Custom styling, undo/reset, and SVG import capabilities  
- **Form Validation**: Integration with form validation and submission

You can import these examples directly:

```tsx
import { BasicUsage, AdvancedUsage, FormValidation } from 'react-native-sign-here';
```

## API Reference

### DrawHere Component

The main component for capturing signatures and drawings.

#### Props

| Prop          | Type                            | Default     | Description                               |
|---------------|---------------------------------|-------------|-------------------------------------------|
| `strokeColor` | `string`                        | `"black"`   | Color of the drawing stroke               |
| `strokeWidth` | `number`                        | `1`         | Width of the drawing stroke               |
| `onChange`    | `(state: DrawingState) => void` | `undefined` | Callback fired when drawing state changes |

#### Ref Methods

| Method                  | Parameters                | Return Type | Description                                     |
|-------------------------|---------------------------|-------------|-------------------------------------------------|
| `clear()`               | -                         | `void`      | Clears all drawings from the canvas             |
| `undo()`                | -                         | `void`      | Undoes the last drawing action                  |
| `reset(elements?)`      | `SvgElement[]` (optional) | `void`      | Resets the canvas, optionally with new elements |
| `exportSvg()`         |                           | `string`    | Exports the drawing as SVG string               |
| `importSvg(svg)`        | `string`                  | `void`      | Imports an SVG string into the canvas           |

## References

* [Usefull infos & commands](docs/usefull-commands.md)
* [Contributing](docs/CONTRIBUTING.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
