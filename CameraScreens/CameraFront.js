// import react from react
import React from "react";
// importing styling and operational components such as buttons, text, view
// from react-native framework
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Camera, Permissions } from "expo";
// import { FontAwesome } from "@expo/vector-icons";
// import {camera, permissions} from "@expo" for usage of camera functions
// for code computing

// Has no camera permissions
// Camera Flash turned off witht the start of state
export default class CameraFront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermitted: null,
      cameraClickType: Camera.Constants.cameraClickType.back,
      lightFlashbackModeOn: Camera.Constants.FlashMode.off
    };
  }

  // Navigation object option: pictureMachine
  static navigate = {
    title: "pictureMachine"
  };

  //ask for camera permission
  //Status: granting permission to the for syncing the camera 
  async insertCameraComponent() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPermitted: status === "granted"
    });
  }

  //flip the camera
  //if the camera is facing backwards, a click for facing frontwards
  //if the camera is facing frontwards, a click for facing backwards
  cameraFliping = () => {
    this.setState({
      cameraClickType:
        this.state.cameraClickType === Camera.Constants.cameraClickType.back
          ? Camera.Constants.cameraClickType.front
          : Camera.Constants.cameraClickType.back
    });
  };

  //Toggle flash light
  //if the flash light is off, then turn on click
  //if the flash lisht is on, then turn off click
  lightFlashback = () => {
    this.setState({
      lightFlashbackModeOn:
        this.state.lightFlashbackModeOn === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
    });
  };

  //take picture and send that to home screen
  cameraPictureClick = async () => {
    if (this.camera) {
      let picture = await this.camera.cameraPictureClickAsync();
      this.props.navigation.navigate("Home", { picture: picture });
    }
  };

  render() {
    const { cameraPermitted } = this.state;

    //if camera permission are null show testing phase in execution
    if (cameraPermitted === null) {
      return (
        <View>
          <Text>Error while Executing</Text>
          <Text>Texting areas and permissions</Text>
        </View>
      );
    
    //if permision has not granted to the camera: "Access denied"
    } else if (cameraPermitted === false) {
      return (
        <View>
          <Text>Access not granted by the device</Text>
          <Text>Recheck the system settings</Text>
        </View>
      );

    //if permision granted, perform the camera function
    } else if (cameraPermitted === true) {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.cameraView}
            cameraClickType={this.state.cameraClickType}
            flashMode={this.state.lightFlashbackModeOn}
            ref={ref => {
              this.camera = ref;
            }}
          >
            {/* Learned the specific styles from internet and course section 
            for better front end design */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => this.cameraFliping()}
                style={styles.iconHolder}
              >
                <FontAwesome name="camera" size={35} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.cameraPictureClick()}
                style={styles.iconHolder}
              >
                <FontAwesome name="circle" size={35} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.lightFlashback()}
                style={styles.iconHolder}
              >
                <FontAwesome name="flash" size={35} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

//styling of the image displayed onscreen while photo clicking
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraView: {
    flex: 1
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  iconHolder: {
    flex: 1,
    alignItems: "center",
    alignSelf: "flex-end"
  },
  icon: {
    marginBottom: 30,
    color: "#f1b1e6"
  }
});
