import {
  Text,
  View,
  Box,
  Image,
  VStack,
  Divider,
  Heading,
  Link,
  ScrollView,
  FlatList,
} from "@gluestack-ui/themed";
import { useWindowDimensions } from "react-native";
import { Linking } from "react-native";
import HTML from "react-native-render-html";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Dimensions } from "react-native";

export default function postPage() {
  const { id } = useLocalSearchParams();
  const [announcement, setAnnouncement] = useState({});
  const [attachments, setAttachments] = useState([]);
  const fetchData = async () => {
    const access_token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      `https://aboard.iee.ihu.gr/api/v2/announcements/${id} `,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await response.json();
    setAnnouncement(data.data);
    setAttachments(data.data.attachments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: "#224366",
        }}
      >
        <View p="$1">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text color="white" fontSize="$sm" my="$1">
              {announcement.created_at}
            </Text>
            <Text color="white" fontSize="$sm" my="$1">
              {announcement.author?.name}
            </Text>
          </View>

          <Heading color="#f5f5f5" textAlign="center" size="sm">
            {announcement.title}
          </Heading>
          <Divider my="$0" />
          <View
            style={{
              //add border
              borderColor: "#f5f5f5",
              height: Dimensions.get("window").height / 2,
              marginTop: 10,
            }}
          >
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: "#224366",
              }}
            >
              <Text
                mx="$1"
                $dark-color="$textLight200"
                overflow="hidden"
                textAlign="justify"
                fontSize="$xs"
              >
                <HTML
                  baseStyle={{
                    color: "white",
                  }}
                  source={{ html: announcement.body }}
                  contentWidth={useWindowDimensions().width}
                />
              </Text>
            </ScrollView>
            <Divider my="$3" />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#224366",
            height: Dimensions.get("window").height / 2,
          }}
        >
          <Text color="white" fontSize="$xl" textAlign="center" my="$1.5">
            Attachments
          </Text>
          <Divider my="$1" />

          {attachments && attachments.length > 0 ? (
            <FlatList
              style={{
                flex: 1,
              }}
              data={attachments}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Link key={item.id} href={item.attachment_url} isExternal>
                    <Text
                      color="$light100"
                      fontSize="$sm"
                      textAlign="center"
                      underline={true}
                    >
                      {item.filename}
                    </Text>
                    <Divider my="$1" />
                  </Link>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
