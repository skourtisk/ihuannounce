import { Text, View } from "@gluestack-ui/themed";
import { Icon, ArrowLeftIcon } from "@gluestack-ui/themed";
import { Pressable } from "react-native";
import { router } from "expo-router";
export default function Settings() {
  return (
    <View
      style={{
        backgroundColor: "#224366",
        height: "100%",
      }}
    >
      <View
        style={{
          marginTop: 60,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#224366",
          height: 50,
        }}
      >
        <Pressable
          onPress={() => {
            router.replace("Homescreen");
          }}
        >
          <Icon
            as={ArrowLeftIcon}
            m="$2"
            w="$8"
            h="$8"
            style={{
              color: "white",
            }}
          />
        </Pressable>

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Settings
        </Text>
      </View>
    </View>
  );
}
