import React, { useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';
import DrawHere, { DrawingState, ExportFormat, DrawHereRef } from '../';

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

export default AdvancedSignatureScreen;