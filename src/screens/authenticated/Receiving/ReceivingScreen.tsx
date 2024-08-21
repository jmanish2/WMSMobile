import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, Asset, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import MLKitBarcodeScanner, { Barcode } from '@react-native-ml-kit/barcode-scanning';
import ImageEditor from '@react-native-community/image-editor';
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

  // Crop and scan image
  const cropAndScanImage = async (uri: string, width: number, height: number) => {
    try {
      // Define crop sections with offset and size
      const cropSections = [
        { offset: { x: 0, y: 0 }, size: { width: width / 2, height: height / 2 } },
        { offset: { x: width / 2, y: 0 }, size: { width: width / 2, height: height / 2 } },
        { offset: { x: 0, y: height / 2 }, size: { width: width / 2, height: height / 2 } },
        { offset: { x: width / 2, y: height / 2 }, size: { width: width / 2, height: height / 2 } },
      ];

      const barcodeResults: string[] = [];

      for (const section of cropSections) {
        const { offset, size } = section;

        const cropData = {
          offset: {
            x: offset.x,
            y: offset.y,
          },
          size: {
            width: size.width,
            height: size.height,
          },
        };

        // Perform cropping
        const cropResult = await ImageEditor.cropImage(uri, cropData);

        // Ensure cropResult has a uri property
        if (cropResult?.uri) {
          const croppedImageUri = cropResult.uri;

          // Scan the cropped image
          const results: Barcode[] = await MLKitBarcodeScanner.scan(croppedImageUri);
          results.forEach(barcode => {
            if (barcode.value) {
              barcodeResults.push(barcode.value);
            }
          });
        }
      }

      setBarcodes([...new Set(barcodeResults)]);
    } catch (error) {
      console.error('Image cropping and scanning error:', error);
    }
  };

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

    launchCamera(options, async (response: ImagePickerResponse) => {
      console.log('Camera response:', response);
      handleImageResponse(response);
    });
  };

  // Handle image library
  const openImageLibrary = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      console.log('Image Library response:', response);
      handleImageResponse(response);
    });
  };

  // Handle image picker response
  const handleImageResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image Picker Error: ', response.errorCode);
      Alert.alert('Image Picker Error', response.errorCode);
    } else if (response.assets && response.assets.length > 0) {
      const capturedAsset: Asset = response.assets[0];
      const uri = capturedAsset.uri;
      const width = capturedAsset.width;
      const height = capturedAsset.height;
      if (uri && width && height) {
        setImageUri(uri);
        await cropAndScanImage(uri, width, height);
      }
    }
  };

  // Reset function
  const reset = () => {
    setImageUri(undefined);
    setBarcodes([]);
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={openCamera} />
      <Button title="Select from Gallery" onPress={openImageLibrary} />
      <Button title="Reset" onPress={reset} />
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
