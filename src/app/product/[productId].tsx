import { getProductsById } from "@/src/api/ProductsApi";
import { Product } from "@/src/api/productsResponse.dto";
import Card from "@/src/components/card";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Category() {
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    (async () => {
      const _product = await getProductsById(productId as string);
      setProduct(_product);
    })();
  });

  return (
    <View style={styles.viewStyle}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.productImage}
          source={{ uri: product?.images?.[0] }}
          resizeMode="cover"
        />
        <Text style={styles.titleStyle}>{product?.title}</Text>
        <Text style={styles.descriptionStyle}>{product?.description}</Text>
        <Text style={styles.descriptionStyle}>{product?.category}</Text>
        <Card>
          <Text style={styles.priceStyle}>
            {`Price: `}
            <Text
              style={[styles.priceStyle, styles.discountPrice]}
            >{`${product?.price} `}</Text>
            {product?.discountPercentage && (
              <Text style={styles.priceStyle}>
                {product?.discountPercentage}
              </Text>
            )}
          </Text>
        </Card>
        <Text style={styles.descriptionStyle}>
          {`Rating: `}
          <Text style={styles.descriptionStyle}>{product?.rating}</Text>
        </Text>
        <Text style={styles.descriptionStyle}>
          {product?.availabilityStatus}
        </Text>

        <Card>
          <Text style={styles.titleStyle}>Reviews</Text>
          <FlatList
            data={product?.reviews}
            keyExtractor={(item) => item?.reviewerEmail}
            renderItem={({ item }) => (
              <View>
                <Text>{item.rating}</Text>
                <Text>{item.comment}</Text>
                <Text>{item.date}</Text>
                <Text>{item.reviewerName}</Text>
              </View>
            )}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewStyle: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
    paddingTop: 10,
  },
  titleStyle: { fontWeight: "bold", fontSize: 18 },
  productImage: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
    padding: 14,
  },
  descriptionStyle: { fontSize: 12, padding: 10 },
  priceStyle: {
    fontSize: 15,
    padding: 10,
    fontWeight: "bold",
  },
  discountPrice: {
    fontSize: 15,
    padding: 10,
    color: "red",
    textDecorationLine: "line-through",
  },
  // button: {
  //   alignItems: "center",
  //   backgroundColor: "red",
  //   borderRadius: 6,
  //   height: 44,
  //   paddingHorizontal: 2,
  //   justifyContent: "center",
  //   margin: 5,
  // },
  // titleButton: { color: "white" },
});
