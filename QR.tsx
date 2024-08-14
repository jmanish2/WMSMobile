import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import CameraOverlay from './src/ui/components/CameraOverlay';
import Button from './src/ui/elements/Button';
import Input from './src/ui/elements/Input';

const App = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: [
      'qr',
      'ean-13',
      'ean-8',
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'itf',
      'upc-e',
      'pdf-417',
    ],
    onCodeScanned: codes => {
      // console.log(`Scanned ${codes.length} codes!`);

      for (const code of codes) {
        console.log(code);
        // console.log(code.type, code.value); // <-- ❌ On iOS, we receive 'ean-13'
        setQrCode(code.value as string);
      }
    },
  });

  if (!hasPermission) {
    return <PermissionsPage />;
  }
  if (device == null) {
    return <NoCameraDeviceError />;
  }

  if (qrCode) {
    return (
      <SafeAreaView style={styles.screen}>
        <Input
          value={qrCode}
          placeholder="Scanned qr code"
          onChangeText={text => setQrCode(text)}
          selectTextOnFocus
        />
        <Button title="Scan QR/Bar Code" onPress={() => setQrCode('')} />
      </SafeAreaView>
    );
  }

  return (
    <CameraOverlay>
      <Camera
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        style={StyleSheet.absoluteFill}
      />
    </CameraOverlay>
  );
};

export default App;

const PermissionsPage = () => {
  return (
    <View>
      <Text>Permissions denied</Text>
    </View>
  );
};

const NoCameraDeviceError = () => {
  return (
    <View>
      <Text>No camera device error</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {padding: 12, gap: 12},
});
