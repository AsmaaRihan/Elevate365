import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const SearchBar = ({
  fetchProductsBySearch,
}: {
  fetchProductsBySearch: (text: string) => Promise<void>;
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Ionicons
          name="search"
          size={28}
          color="#007AFF"
          style={{ marginRight: 8 }}
          onPress={() => setShowSearch((prev) => !prev)}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#007AFF",
            fontWeight: "bold",
          }}
          onPress={() => setShowSearch((prev) => !prev)}
        >
          Search
        </Text>
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={22}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#888"
            autoFocus
            onChangeText={_.debounce((text: string) => {
              fetchProductsBySearch(text);
            }, 300)}
          />
        </View>
      )}
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    paddingHorizontal: 12,
    borderColor: "#007AFF",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});
