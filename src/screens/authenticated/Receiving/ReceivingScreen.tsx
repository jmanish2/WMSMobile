import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import MLKitBarcodeScanner, { Barcode } from '@react-native-ml-kit/barcode-scanning';
import { Text } from 'react-native-paper';

const ImagePickerExample: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [barcodes, setBarcodes] = useState<string[]>([]);

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      console.log('Camera permission status:', result);
      return result === 'granted';
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  };

  // Handle image picker
  // const openImagePicker = () => {
  //   const options: ImageLibraryOptions = {
  //     mediaType: 'photo',
  //     quality: 1,
  //   };

  //   launchImageLibrary(options, async response => {
  //     console.log('Image picker response:', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorCode);
  //     } else if (response.assets && response.assets.length > 0) {
  //       const selectedAsset: Asset = response.assets[0];
  //       const uri = selectedAsset.uri;
  //       console.log('Selected URI:', uri);
  //       if (uri) {
  //         setImageUri(uri);
  //         try {
  //           const barcodeResults: Barcode[] = await MLKitBarcodeScanner.scan(uri);
  //           console.log('Barcode results:', barcodeResults);

  //           // Extract values from barcode results
  //           const newBarcodes = barcodeResults.map(barcode => barcode.value || '');

  //           setBarcodes(prevBarcodes => [...new Set([...prevBarcodes, ...newBarcodes])]);
  //         } catch (error) {
  //           console.error('Barcode scanning error:', error);
  //         }
  //       }
  //     }
  //   });
  // };

  // Handle camera
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission not granted');
      return;
    }

    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, async response => {
      console.log('Camera response:', response);
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const capturedAsset: Asset = response.assets[0];
        const uri = capturedAsset.uri;
        if (uri) {
          setImageUri(uri);
          try {
            const barcodeResults: Barcode[] = await MLKitBarcodeScanner.scan(uri);
            console.log('Barcode results:', barcodeResults);

            // Extract values from barcode results
            const newBarcodes = barcodeResults.map(barcode => barcode.value || '');

            setBarcodes(prevBarcodes => [...new Set([...prevBarcodes, ...newBarcodes])]);
          } catch (error) {
            console.error('Barcode scanning error:', error);
          }
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={openCamera} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Text style={styles.barcodeText}>
        Scanned Barcodes: {barcodes.join(', ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  barcodeText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});

export default ImagePickerExample;
