# react-native-sign-here

> *Under active development*
> 
> ⚠️ This project is currently under development and is **NOT READY** for production use. 
> Features may be incomplete, unstable, or subject to breaking changes.

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

The simplest way to use the signature pad:

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import DrawHere, { ExportFormat, DrawHereRef } from 'react-native-sign-here';

const SignatureScreen = () => {
  const signatureRef = useRef<DrawHereRef>(null);

  const handleSave = async () => {
    if (signatureRef.current) {
      const svg = await signatureRef.current.exportAs(ExportFormat.SVG);
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

#### Using with Form Validation

```tsx
import React, { useRef, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import DrawHere, { DrawingState, ExportFormat, DrawHereRef } from 'react-native-sign-here';

const FormWithSignature = () => {
  const signatureRef = useRef<DrawHereRef>(null);
  const [hasSignature, setHasSignature] = useState(false);

  const handleSubmit = async () => {
    if (!hasSignature) {
      Alert.alert('Error', 'Please provide your signature');
      return;
    }

    try {
      const svgSignature = await signatureRef.current?.exportAs(ExportFormat.SVG);
      // Send signature to server or process further
      console.log('Form submitted with signature:', svgSignature);
    } catch (error) {
      console.error('Error exporting signature:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <DrawHere
        ref={signatureRef}
        onChange={(state: DrawingState) => setHasSignature(state.elements.length > 0)}
        strokeColor="black"
        strokeWidth={1}
      />
      
      <Button 
        title="Submit Form" 
        onPress={handleSubmit}
        disabled={!hasSignature}
      />
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

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `strokeColor` | `string` | `"black"` | Color of the drawing stroke |
| `strokeWidth` | `number` | `1` | Width of the drawing stroke |
| `onChange` | `(state: DrawingState) => void` | `undefined` | Callback fired when drawing state changes |

#### Ref Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `clear()` | - | `void` | Clears all drawings from the canvas |
| `undo()` | - | `void` | Undoes the last drawing action |
| `reset(elements?)` | `SvgElement[]` (optional) | `void` | Resets the canvas, optionally with new elements |
| `exportAs(format)` | `ExportFormat` | `Promise<string>` | Exports the drawing as SVG string |
| `importSvg(svg)` | `string` | `void` | Imports an SVG string into the canvas |

### Types

#### DrawingState

```tsx
interface DrawingState {
  elements: SvgElement[];           // Array of SVG elements on canvas
  undoHistory: SvgElement[][];      // History for undo functionality
  isDrawGestureDirty: boolean;      // Whether the current gesture is dirty
}
```

**Note**: To check if the canvas is empty, use `state.elements.length === 0`.

#### SvgElement

```tsx
interface SvgElement {
  id: number;                       // Unique identifier
  type: SvgElementType;             // Type of SVG element
  strokeColor?: string;             // Stroke color
  strokeWidth?: number;             // Stroke width
  fill?: string;                    // Fill color
  isSelected?: boolean;             // Selection state
}
```

#### ExportFormat

```tsx
enum ExportFormat {
  SVG = 'svg'                       // Export as SVG string
  // PNG = 'png'                    // Not supported yet
}
```

#### CanvasMode

```tsx
enum CanvasMode {
  ZOOM_PAN = 'ZOOM_PAN',           // Zoom and pan mode
  DRAW = 'DRAW',                    // Drawing mode
  SELECTOR = 'SELECTOR',            // Selection mode
  TRANSFORM = 'TRANSFORM'           // Transform mode
}
```

### Constants

#### Default Aspect Ratio

```tsx
const DEFAULT_ASPECT_RATIO: AspectRatio = { width: 9, height: 16 };
```

### Utility Functions

The library also exports various utility functions for working with SVG elements and geometry:

- `isPath(element)`: Type guard for path elements
- `isCircle(element)`: Type guard for circle elements  
- `isEllipse(element)`: Type guard for ellipse elements

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
