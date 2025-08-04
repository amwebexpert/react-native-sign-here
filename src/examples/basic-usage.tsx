import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import DrawHere, { ExportFormat, DrawHereRef } from '../';

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
        onChange={(state) => {
          console.log('Drawing state changed:', state);
        }}
      />
      <Button title="Save Signature" onPress={handleSave} />
      <Button title="Clear" onPress={handleClear} />
    </View>
  );
};

export default SignatureScreen; 