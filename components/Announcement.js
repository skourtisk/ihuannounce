import { View, Pressable } from "react-native";
import {
  VStack,
  Divider,
  Heading,
  Text,
  ScrollView,
} from "@gluestack-ui/themed";
import { router } from "expo-router";

// Announcement component
export default function Announcement({ announcement }) {
  // Destructure the announcement object
  const { preview, title, created_at, author } = announcement;

  // Function to navigate to the post
  const goToPost = () => {
    router.push({
      pathname: `announcement/${announcement.id}`,
    });
  };

  // Render the announcement
  return (
    <Pressable onPress={goToPost} $hover-bg="$primary400">
      <VStack px="$4" pt="$5" pb="$0">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
            $dark-color="$textnormal200"
            fontSize="$sm"
            my="$0.5"
          >
            {created_at}
          </Text>
          <Text
            style={{
              color: "white",
            }}
            $dark-color="$textLight500"
            fontSize="$sm"
            my="$0.5"
          >
            {author.name}
          </Text>
        </View>

        <Heading
          style={{
            color: "white",
          }}
          $dark-color="$textLight200"
          size="sm"
        >
          {title}
        </Heading>
        <Text
          style={{
            color: "white",
          }}
          my="$1.5"
          $dark-color="$textLight200"
          fontSize="$xs"
        >
          {preview + "..."}
        </Text>

        <Divider my="$0" />
      </VStack>
    </Pressable>
  );
}
