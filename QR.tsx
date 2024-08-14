import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Button from './src/ui/elements/Button';

const App = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const [captureBarCodes, setCaptureBarCodes] = useState(false);
  const [qrCode, setQrCode] = useState<Array<string>>([]);

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
      if (captureBarCodes) {
        if (codes.length > 0) {
          const newCodes = codes.map(barcode => barcode.value);

          setQrCode([...new Set([...newCodes])] as Array<string>);
        }
      }
    },
  });

  if (!hasPermission) {
    return <PermissionsPage />;
  }
  if (device == null) {
    return <NoCameraDeviceError />;
  }

  if (qrCode.length && captureBarCodes) {
    return (
      <SafeAreaView style={styles.screen}>
        {qrCode.map(code => {
          return (
            <View key={code}>
              <Text selectable>{code}</Text>
            </View>
          );
        })}
        <Button
          title="Scan QR/Bar Code"
          onPress={() => {
            setCaptureBarCodes(false);
            setQrCode([]);
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Camera
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.floatingButtons}>
        <Button
          title="Capture BarCodes"
          onPress={() => setCaptureBarCodes(true)}
        />
      </View>
    </>
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
  floatingButtons: {
    width: '100%',
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
