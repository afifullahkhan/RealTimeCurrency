import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

function MainScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const takePicture = async () => {
    if (camera) {
    //   navigation.navigate('ResultScreen');
    //   const data = await camera.takePictureAsync(null);
    //   setImage(data.uri);
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff"  />
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />

        <View style={styles.buttonLayout}>
          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <View>
              <Icon name="camera-reverse" size={38} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => takePicture()}
          >
            <View>
              <Icon name="camera" size={38} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonLayout: {
    position: "absolute",
    flexDirection: "row",
    width:'100%',
    bottom:20,
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 30,
    padding:10,
    backgroundColor: "#aaabad",
  },
});
