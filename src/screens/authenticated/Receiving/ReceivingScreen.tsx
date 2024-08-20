import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

// Define the type for the barcode read event
interface BarCodeReadEvent {
  data: string;
  type: string;
}

const MultiQRCodeScanner = () => {
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const [scannedCodes, setScannedCodes] = useState<Set<string>>(new Set());

  // Correctly typed onBarCodeRead handler
  const onBarCodeRead = (event: BarCodeReadEvent) => {
    try {
      const { data, type } = event;
      if (type === RNCamera.Constants.BarCodeType.qr) {
        if (!scannedCodes.has(data)) {
          setScannedCodes((prevSet) => new Set(prevSet).add(data));
          setBarcodes((prevBarcodes) => [...prevBarcodes, data]);
        }
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarCodeRead} // Update here
      >
        {barcodes.length > 0 && (
          <View style={styles.barcodeContainer}>
            {barcodes.map((barcode, index) => (
              <Text key={index} style={styles.barcodeText}>
                {barcode}
              </Text>
            ))}
          </View>
        )}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  barcodeContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  barcodeText: {
    fontSize: 16,
    color: 'black',
  },
});

export default MultiQRCodeScanner;
