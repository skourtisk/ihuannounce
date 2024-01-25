import * as React from "react";
import { useAuthRequest } from "expo-auth-session";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  Button,
  ButtonText,
  ButtonIcon,
  AddIcon,
} from "@gluestack-ui/themed";

//variable for access token

const cID = "";
const cSecret = "";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://login.iee.ihu.gr/authorization",
  tokenEndpoint: "https://aboard.iee.ihu.gr/api/v2/authenticate",
};

export default function LoginPage() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: cID,
      response_type: "code",
      scopes: ["announcements,profile,notifications"],
      redirectUri: "exp://192.168.1.2:19000",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      //exhange code for token

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `https://aboard.iee.ihu.gr/api/v2/authenticate?code=${code}`,
        requestOptions
      )
        .then((response) => response.text())
        .then(async (result) => {
          result = JSON.parse(result);
          await SecureStore.setItemAsync("token", result.access_token);
          router.replace("Homescreen");
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image
        alt="Logo"
        source={require("../assets/images/logo.png")}
        style={{ width: 150, height: 150, marginTop: 100, marginBottom: 50 }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 20,
          color: "white",
          textAlign: "center",
        }}
      >
        International Hellenic University {"\n"}
      </Text>

      <Button
        size="md"
        action="positive"
        isDisabled={false}
        onPress={() => promptAsync()}
        isFocusVisible={false}
      >
        <ButtonText>Login </ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#224366",
  },
});
