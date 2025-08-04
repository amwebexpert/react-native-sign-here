import React, { useRef, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import DrawHere, { DrawingState, ExportFormat, DrawHereRef } from '../';

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

export default FormWithSignature; 