import {
  View,
  Text,
  FlatList,
  Box,
  HStack,
  VStack,
  Avatar,
  Pressable,
  AvatarImage,
  Heading,
  Divider,
  Spinner,
  Button,
  ArrowLeftIcon,
  ButtonText,
  Link,
  PlusIcon,
  MinusIcon,
  Icon,
  ScrollView,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  AccordionTitleText,
  AccordionContentText,
} from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import { ChevronDownIcon, ChevronUpIcon } from "@gluestack-ui/themed";
import React from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Collapsible from "react-native-collapsible";
import { act } from "react-test-renderer";

export default function Tags() {
  const params = useLocalSearchParams();

  const [tags, setTags] = React.useState([]);
  const [activeTags, setActiveTags] = React.useState(
    params.tags ? params.tags.split("-").map(Number) : []
  );
  React.useEffect(() => {
    fetchTags();
  }, []);
  const handlePress = (id) => {
    console.log(activeTags);
    setActiveTags((prevTags) => {
      if (prevTags.includes(id)) {
        // If the id is already in activeTags, remove it
        return prevTags.filter((tagId) => tagId !== id);
      } else {
        // If the id is not in activeTags, add it
        return [...prevTags, id];
      }
    });
  };
  const fetchTags = async () => {
    const access_token = await SecureStore.getItemAsync("token");

    const response = await fetch(
      `https://aboard.iee.ihu.gr/api/v2/filtertags`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await response.json();
    setTags(data);
  };

  return (
    <Box
      style={{
        backgroundColor: "#224366",
      }}
    >
      <View
        style={{
          backgroundColor: "#224366",
        }}
      >
        <View
          style={{
            marginTop: 60,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#224366",
            height: 70,
          }}
        >
          <Pressable
            onPress={() => {
              router.replace({
                pathname: "Homescreen",
                params: {
                  tags: activeTags ? activeTags.join("-") : "",
                },
              });
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
          <Button
            variant="outline"
            action="negative"
            style={{
              marginLeft: "auto",
              margin: 10,
            }}
            onPress={() => {
              setActiveTags([]);
            }}
          >
            <ButtonText
              style={{
                color: "white",
              }}
            >
              Clear
            </ButtonText>
          </Button>
          <Button
            style={{
              marginLeft: "auto",
              margin: 10,
            }}
            onPress={() => {
              router.replace({
                pathname: "Homescreen",
                params: {
                  tags: activeTags ? activeTags.join("-") : "",
                },
              });
            }}
          >
            <ButtonText>Filter...</ButtonText>
          </Button>
        </View>
      </View>

      <FlatList
        style={{ padding: 4, backgroundColor: "#224366" }}
        data={tags}
        height="85%"
        renderItem={({ item }) =>
          item.children_recursive.length > 0 ? (
            <Accordion
              style={{ backgroundColor: "#224366" }}
              width="100%"
              maxWidth={640}
              type="multiple"
              size="md"
              m="$0"
              shadowColor="transparent"
              borderColor="$borderLight300"
              $dark-borderColor="$borderDark700"
            >
              <AccordionItem
                value="a"
                style={{ backgroundColor: "#224366" }}
                borderBottomWidth={1}
                borderBottomColor="$borderLight300"
                $dark-borderBottomColor="$borderDark700"
              >
                <AccordionHeader
                  style={{ backgroundColor: "#224366" }}
                  backgroundColor="$backgroundLight50"
                  $dark-backgroundColor="$backgroundDark700"
                >
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText
                            onPress={() => {
                              handlePress(item.id);
                            }}
                            style={{
                              color: activeTags.includes(item.id)
                                ? "#90EE90"
                                : "white",
                            }}
                          >
                            {item.title}
                          </AccordionTitleText>
                          {isExpanded ? (
                            <AccordionIcon
                              style={{
                                color: "white",
                              }}
                              as={ChevronUpIcon}
                            />
                          ) : (
                            <AccordionIcon as={ChevronDownIcon} />
                          )}
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <FlatList
                    style={{ backgroundColor: "#224366" }}
                    data={item.children_recursive}
                    renderItem={({ item }) =>
                      item.children_recursive.length > 0 ? (
                        <Accordion
                          width="100%"
                          maxWidth={640}
                          type="multiple"
                          style={{ backgroundColor: "#224366" }}
                          size="md"
                          m="$0"
                          shadowColor="transparent"
                          borderColor="$borderLight300"
                          $dark-borderColor="$borderDark700"
                        >
                          <AccordionItem
                            value="a"
                            style={{ backgroundColor: "#224366" }}
                            borderBottomWidth={1}
                            borderBottomColor="$borderLight300"
                            $dark-borderBottomColor="$borderDark700"
                          >
                            <AccordionHeader
                              style={{ backgroundColor: "#224366" }}
                              backgroundColor="$backgroundLight50"
                              $dark-backgroundColor="$backgroundDark700"
                            >
                              <AccordionTrigger>
                                {({ isExpanded }) => {
                                  return (
                                    <>
                                      <AccordionTitleText
                                        onPress={() => {
                                          handlePress(item.id);
                                        }}
                                        style={{
                                          color: activeTags.includes(item.id)
                                            ? "#90EE90"
                                            : "white",
                                        }}
                                      >
                                        {item.title}
                                      </AccordionTitleText>
                                      {isExpanded ? (
                                        <AccordionIcon
                                          style={{
                                            color: "white",
                                          }}
                                          as={ChevronUpIcon}
                                        />
                                      ) : (
                                        <AccordionIcon as={ChevronDownIcon} />
                                      )}
                                    </>
                                  );
                                }}
                              </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent>
                              <FlatList
                                style={{ backgroundColor: "#224366" }}
                                data={item.children_recursive}
                                renderItem={({ item }) =>
                                  item.children_recursive.length > 0 ? (
                                    <Accordion
                                      width="100%"
                                      maxWidth={640}
                                      style={{ backgroundColor: "#224366" }}
                                      type="multiple"
                                      size="md"
                                      m="$0"
                                      shadowColor="transparent"
                                      borderColor="$borderLight300"
                                      $dark-borderColor="$borderDark700"
                                    >
                                      <AccordionItem
                                        value="a"
                                        style={{ backgroundColor: "#224366" }}
                                        borderBottomWidth={1}
                                        borderBottomColor="$borderLight300"
                                        $dark-borderBottomColor="$borderDark700"
                                      >
                                        <AccordionHeader
                                          style={{ backgroundColor: "#224366" }}
                                          backgroundColor="$backgroundLight50"
                                          $dark-backgroundColor="$backgroundDark700"
                                        >
                                          <AccordionTrigger>
                                            {({ isExpanded }) => {
                                              return (
                                                <>
                                                  <AccordionTitleText
                                                    onPress={() => {
                                                      handlePress(item.id);
                                                    }}
                                                    style={{
                                                      color:
                                                        activeTags.includes(
                                                          item.id
                                                        )
                                                          ? "#90EE90"
                                                          : "white",
                                                    }}
                                                  >
                                                    {item.title}
                                                  </AccordionTitleText>
                                                  {isExpanded ? (
                                                    <AccordionIcon
                                                      style={{
                                                        color: "white",
                                                      }}
                                                      as={ChevronUpIcon}
                                                    />
                                                  ) : (
                                                    <AccordionIcon
                                                      as={ChevronDownIcon}
                                                    />
                                                  )}
                                                </>
                                              );
                                            }}
                                          </AccordionTrigger>
                                        </AccordionHeader>
                                        <AccordionContent>
                                          <FlatList
                                            style={{
                                              backgroundColor: "#224366",
                                            }}
                                            data={item.children_recursive}
                                            renderItem={({ item }) => (
                                              <Accordion
                                                width="100%"
                                                maxWidth={640}
                                                height={60}
                                                type="multiple"
                                                size="md"
                                                style={{
                                                  backgroundColor: "#224366",
                                                }}
                                                shadowColor="transparent"
                                                borderColor="$borderLight300"
                                                $dark-borderColor="$borderDark700"
                                              >
                                                <AccordionItem
                                                  value="a"
                                                  borderBottomWidth={1}
                                                  borderBottomColor="$borderLight300"
                                                  $dark-borderBottomColor="$borderDark700"
                                                >
                                                  <AccordionHeader
                                                    style={{
                                                      backgroundColor:
                                                        "#224366",
                                                    }}
                                                    backgroundColor="$backgroundLight50"
                                                    $dark-backgroundColor="$backgroundDark700"
                                                  >
                                                    <AccordionTrigger>
                                                      {({ isExpanded }) => {
                                                        return (
                                                          <>
                                                            <AccordionTitleText
                                                              onPress={() => {
                                                                handlePress(
                                                                  item.id
                                                                );
                                                              }}
                                                              style={{
                                                                color:
                                                                  activeTags.includes(
                                                                    item.id
                                                                  )
                                                                    ? "#90EE90"
                                                                    : "white",
                                                              }}
                                                            >
                                                              {item.title}
                                                            </AccordionTitleText>
                                                          </>
                                                        );
                                                      }}
                                                    </AccordionTrigger>
                                                  </AccordionHeader>
                                                </AccordionItem>
                                              </Accordion>
                                            )}
                                          />
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  ) : (
                                    <Accordion
                                      width="100%"
                                      maxWidth={640}
                                      height={60}
                                      type="multiple"
                                      size="md"
                                      shadowColor="transparent"
                                      borderColor="$borderLight300"
                                      $dark-borderColor="$borderDark700"
                                    >
                                      <AccordionItem
                                        value="a"
                                        borderBottomWidth={1}
                                        borderBottomColor="$borderLight300"
                                        $dark-borderBottomColor="$borderDark700"
                                      >
                                        <AccordionHeader
                                          style={{ backgroundColor: "#224366" }}
                                          backgroundColor="$backgroundLight50"
                                          $dark-backgroundColor="$backgroundDark700"
                                        >
                                          <AccordionTrigger>
                                            {({ isExpanded }) => {
                                              return (
                                                <>
                                                  <AccordionTitleText
                                                    onPress={() => {
                                                      handlePress(item.id);
                                                    }}
                                                    style={{
                                                      color:
                                                        activeTags.includes(
                                                          item.id
                                                        )
                                                          ? "#90EE90"
                                                          : "white",
                                                    }}
                                                  >
                                                    {item.title}
                                                  </AccordionTitleText>
                                                </>
                                              );
                                            }}
                                          </AccordionTrigger>
                                        </AccordionHeader>
                                      </AccordionItem>
                                    </Accordion>
                                  )
                                }
                              />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <Accordion
                          width="100%"
                          maxWidth={640}
                          style={{ backgroundColor: "#224366" }}
                          height={60}
                          type="multiple"
                          size="md"
                          shadowColor="transparent"
                          borderColor="$borderLight300"
                          $dark-borderColor="$borderDark700"
                        >
                          <AccordionItem
                            value="a"
                            borderBottomWidth={1}
                            borderBottomColor="$borderLight300"
                            $dark-borderBottomColor="$borderDark700"
                          >
                            <AccordionHeader
                              style={{ backgroundColor: "#224366" }}
                              backgroundColor="$backgroundLight50"
                              $dark-backgroundColor="$backgroundDark700"
                            >
                              <AccordionTrigger>
                                {({ isExpanded }) => {
                                  return (
                                    <>
                                      <AccordionTitleText
                                        onPress={() => {
                                          handlePress(item.id);
                                        }}
                                        style={{
                                          color: activeTags.includes(item.id)
                                            ? "#90EE90"
                                            : "white",
                                        }}
                                      >
                                        {item.title}
                                      </AccordionTitleText>
                                    </>
                                  );
                                }}
                              </AccordionTrigger>
                            </AccordionHeader>
                          </AccordionItem>
                        </Accordion>
                      )
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Accordion
              width="100%"
              maxWidth={640}
              style={{ backgroundColor: "#224366" }}
              height={60}
              type="multiple"
              size="md"
              shadowColor="transparent"
              borderColor="$borderLight300"
              $dark-borderColor="$borderDark700"
            >
              <AccordionItem
                value="a"
                borderBottomWidth={1}
                borderBottomColor="$borderLight300"
                $dark-borderBottomColor="$borderDark700"
              >
                <AccordionHeader
                  style={{ backgroundColor: "#224366" }}
                  $dark-backgroundColor="$backgroundDark700"
                >
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText
                            onPress={() => {
                              handlePress(item.id);
                            }}
                            style={{
                              color: activeTags.includes(item.id)
                                ? "#90EE90"
                                : "white",
                            }}
                          >
                            {item.title}
                          </AccordionTitleText>
                        </>
                      );
                    }}
                  </AccordionTrigger>
                </AccordionHeader>
              </AccordionItem>
            </Accordion>
          )
        }
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
