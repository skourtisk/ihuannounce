import { View, Text, RefreshControl } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import Announcement from "../components/Announcement";
import {
  Button,
  Pressable,
  PaperclipIcon,
  HStack,
  ScrollView,
  Spinner,
  Divider,
  Menu,
  MenuItem,
  MenuItemLabel,
  SettingsIcon,
  ButtonText,
  Icon,
  ChevronsRightIcon,
  ChevronsLeftIcon,
} from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function Homescreen() {
  // Local search parameters
  const params = useLocalSearchParams();

  // State variables
  const [tags, setTags] = useState(params.tags ? params.tags : []);
  const [page, setPage] = useState(1);
  const [announcements, setAnnouncements] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Date formatting
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so +1 and pad with 0
  const day = ("0" + date.getDate()).slice(-2); // Pad with 0
  const formattedDate = `${year}-${month}-${day}`;

  // Fetch data on page change
  useEffect(() => {
    fetchData();
  }, [page]);

  // Fetch data from API
  const fetchData = async () => {
    setIsLoading(true); // Set loading to true when fetch starts
    const access_token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      tags != ""
        ? `https://aboard.iee.ihu.gr/api/v2/announcements${
            "?" +
            tags
              .split("-")
              .map((n) => "tags[]=" + n)
              .join("&")
          }&page=${page}&updatedBefore=${formattedDate} `
        : `https://aboard.iee.ihu.gr/api/v2/announcements?page=${page}&updatedBefore=${formattedDate} `,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await response.json();
    setAnnouncements(data.data);
    await wait(100).then(() => setIsLoading(false));

    setIsLoading(false); // Set loading to false when fetch ends
  };

  // Delay function
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Refresh handler
  const onRefresh = async () => {
    setPage(1);
    setTags("");
    await fetchData();
  };

  // Loading state
  if (isLoading) {
    return (
      <HStack
        space="sm"
        style={{
          height: "100%",
          backgroundColor: "#224366",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
        <Text
          style={{
            color: "white",
          }}
          size="md"
        >
          Loading
        </Text>
      </HStack>
    );
  }

  // Rendered component
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#224366",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 60,
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}
          $dark-color="$textLight200"
          fontSize="md"
          my="$0.5"
        >
          Announcements
        </Text>
        <Menu
          style={{
            marginBottom: 10,
            marginRight: 5,
            backgroundColor: "grey",
          }}
          placement="top"
          trigger={({ ...triggerProps }) => {
            return (
              <Button {...triggerProps}>
                <ButtonText>Menu</ButtonText>
              </Button>
            );
          }}
        >
          <MenuItem
            key="tags"
            textValue="Tags"
            style={{
              color: "white",
              borderBottomWidth: 1,
              borderBottomColor: "white",
            }}
            onPress={() => {
              router.replace({
                pathname: "Tags",
                params: {
                  tags: tags,
                },
              });
            }}
          >
            <Icon as={PaperclipIcon} m="$2" w="$4" h="$4" />
            <MenuItemLabel
              style={{
                color: "white",
                borderBottomWidth: 1,
                borderBottomColor: "white",
              }}
              size="sm"
            >
              Tags
            </MenuItemLabel>
          </MenuItem>
          <MenuItem
            onPress={() => {
              router.replace("/");
            }}
            key="Logout"
            textValue="Logout"
          >
            <MenuItemLabel
              style={{
                color: "white",
              }}
              size="sm"
            >
              Logout
            </MenuItemLabel>
          </MenuItem>
        </Menu>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        style={{
          height: "90%",
        }}
      >
        {announcements &&
          announcements.map((announcement) => {
            return (
              <Announcement key={announcement.id} announcement={announcement} />
            );
          })}
        <View
          style={{
            marginBottom: 30,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {page > 1 && (
            <Button variant="link" onPress={() => setPage(page - 1)}>
              <ButtonText>
                <Icon
                  style={{
                    marginRight: 80,
                  }}
                  color="white"
                  as={ChevronsLeftIcon}
                  m="$2"
                  w="$2"
                  h="$2"
                />
              </ButtonText>
            </Button>
          )}
          {announcements?.length > 9 && (
            <View>
              <Button variant="link" onPress={() => setPage(page + 1)}>
                <ButtonText>
                  <Icon
                    style={{
                      marginRight: 80,
                    }}
                    color="white"
                    as={ChevronsRightIcon}
                    m="$2"
                    w="$2"
                    h="$2"
                  />
                </ButtonText>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
