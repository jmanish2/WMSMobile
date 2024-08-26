import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import MLKitBarcodeScanner, {
  Barcode,
} from '@react-native-ml-kit/barcode-scanning';
import ImageEditor from '@react-native-community/image-editor';
import {Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AuthenticatedStackNavigatorScreenProps} from '../../../types/navigation';
import Screen from '../../../ui/components/Screen';

interface BarCodeScannerProps
  extends AuthenticatedStackNavigatorScreenProps<'BarCodeScanner'> {}

interface ImageData {
  uri: string;
  barcodes: string[];
}

const BarCodeScanner: React.FC<BarCodeScannerProps> = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const navigation = useNavigation();

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
  const cropAndScanImage = async (
    uri: string,
    width: number,
    height: number,
  ): Promise<string[]> => {
    try {
      const cropSections = [
        {offset: {x: 0, y: 0}, size: {width: width / 2, height: height / 2}},
        {
          offset: {x: width / 2, y: 0},
          size: {width: width / 2, height: height / 2},
        },
        {
          offset: {x: 0, y: height / 2},
          size: {width: width / 2, height: height / 2},
        },
        {
          offset: {x: width / 2, y: height / 2},
          size: {width: width / 2, height: height / 2},
        },
      ];

      const barcodeResults: string[] = [];

      for (const section of cropSections) {
        const {offset, size} = section;

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

        const cropResult = await ImageEditor.cropImage(uri, cropData);

        if (cropResult?.uri) {
          const croppedImageUri = cropResult.uri;

          const results: Barcode[] = await MLKitBarcodeScanner.scan(
            croppedImageUri,
          );
          results.forEach(barcode => {
            if (barcode.value) {
              barcodeResults.push(barcode.value);
            }
          });
        }
      }

      return [...new Set(barcodeResults)];
    } catch (error) {
      console.error('Image cropping and scanning error:', error);
      return [];
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
      await handleImageResponse(response);
    });
  };

  // Handle image library
  const openImageLibrary = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      console.log('Image Library response:', response);
      await handleImageResponse(response);
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
        const barcodes = await cropAndScanImage(uri, width, height);
        setImages(prevImages => [...prevImages, {uri, barcodes}]);
        console.log(barcodes);
        // Navigate and pass the barcode data
        navigation.navigate('ReceivingByOptionScreen', {barcodeData: barcodes});
      }
    }
  };

  // Reset function
  const reset = () => {
    navigation.navigate;
  };

  // Convert image data to JSON format
  const getJsonData = () => {
    return JSON.stringify(images, null, 2);
  };

  return (
    <ScrollView>
      <Screen>
        <TouchableOpacity style={styles.cardContainer} onPress={openCamera}>
          <Card>
            <Card.Content style={styles.cardContent}>
              <Text>TAKE A PHOTO</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={openImageLibrary}>
          <Card>
            <Card.Content style={styles.cardContent}>
              <Text>SELECT FROM GALLERY</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => navigation.goBack()}>
          <Card>
            <Card.Content style={styles.cardContent}>
              <Text>BACK</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Text style={styles.barcodeText}>
              Scanned Barcodes: {image.barcodes.join(', ')}
            </Text>
          </View>
        ))} */}

        {/* <View style={styles.jsonContainer}>
          <Text style={styles.jsonText}>JSON Data: {getJsonData()}</Text>
        </View> */}
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  barcodeText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  cardContainer: {
    marginBottom: 8,
  },
  cardContent: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  jsonContainer: {
    marginTop: 20,
  },
  jsonText: {
    fontSize: 14,
    color: 'black',
  },
});

export default BarCodeScanner;
