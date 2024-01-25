import { Stack } from "expo-router";
import { GluestackUIProvider, LinearGradient } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
        <Stack.Screen
          name="announcement/[id]"
          options={{
            headerTitle: "Announcement",
            headerStyle: {
              backgroundColor: "#224366",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen name="Tags" options={{ headerShown: false }} />
        <Stack.Screen
          name="Homescreen"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
