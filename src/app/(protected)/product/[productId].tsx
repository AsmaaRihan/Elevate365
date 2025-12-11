import Card from '@/src/components/card';
import useProductDetails from '@/src/hooks/useProducts/useProductDetails';
import colors from '@/src/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Category() {
  const { productId } = useLocalSearchParams();

  const { data: product, isLoading } = useProductDetails(productId as string);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.viewStyle}>
      <ScrollView style={styles.container}>
        <Image style={styles.productImage} source={{ uri: product?.images?.[0] }} resizeMode="contain" />
        <Text style={styles.titleStyle}>{product?.title}</Text>
        <Text style={styles.categoryStyle}>{product?.category}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>Rating: </Text>
          {product?.rating && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < Math.floor(product.rating) ? 'star' : 'star-outline'}
                  size={18}
                  color="#FFD700"
                  style={{ marginRight: 2 }}
                />
              ))}
            </>
          )}
        </View>
        <Text style={styles.descriptionStyle}>{product?.description}</Text>
        <Card>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.priceValue}>{`$${product?.price}`}</Text>
            {product?.discountPercentage && (
              <Text style={styles.discountBadge}>{`-${product.discountPercentage}%`}</Text>
            )}
          </View>
          <Text style={styles.availability}>{product?.availabilityStatus}</Text>
        </Card>
        <Card>
          <Text style={styles.titleStyle}>Reviews</Text>
          <FlatList
            data={product?.reviews}
            keyExtractor={(item) => item?.reviewerEmail}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <View style={styles.reviewRatingRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < Math.round(item.rating) ? 'star' : 'star-outline'}
                      size={14}
                      color="#FFD700"
                      style={{ marginRight: 1 }}
                    />
                  ))}
                  <Text style={styles.reviewRatingValue}>{item.rating}</Text>
                </View>
                <Text style={styles.reviewComment}>{item.comment}</Text>
                <Text style={styles.reviewMeta}>
                  {item.reviewerName} • {new Date(item.date).toLocaleDateString()}
                </Text>
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
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 4,
    color: colors.text,
  },
  categoryStyle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    marginLeft: 2,
  },
  ratingLabel: { fontSize: 14, color: colors.textSecondary, marginRight: 4 },
  ratingValue: { fontSize: 14, color: colors.textSecondary, marginLeft: 4 },
  productImage: {
    width: '100%',
    height: 300,
    padding: 14,
  },
  descriptionStyle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 6,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 10,
  },
  discountBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.background,
    backgroundColor: colors.error,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  availability: { fontSize: 13, color: colors.success, marginTop: 4, marginLeft: 2 },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
    marginBottom: 4,
  },
  reviewRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  reviewRatingValue: { fontSize: 12, color: colors.textSecondary, marginLeft: 4 },
  reviewComment: { fontSize: 13, color: colors.text, marginBottom: 2 },
  reviewMeta: { fontSize: 11, color: colors.textSecondary },
  priceStyle: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
  },
  discountPrice: {
    fontSize: 15,
    padding: 10,
    color: 'red',
    textDecorationLine: 'line-through',
  },
});
