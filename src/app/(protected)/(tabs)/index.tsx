import { getAllProducts } from '@/src/api/ProductsApi';

import { FlatList, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import '@/ReactotronConfig';
import { Product } from '@/src/api/productsResponse.dto';
import ProductListItem from '@/src/components/productListItem';
import i18n from '@/src/language';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);
  const fetchAllProducts = async (skip?: string) => {
    setLoading(true);
    const productsResponse = await getAllProducts(skip);

    setProducts((prev) => [...prev, ...productsResponse?.products]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts('');
  }, []);

  return (
    <SafeAreaView edges={['top']}>
      <I18nextProvider i18n={i18n}>
        <View>
          (
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item?.title}
            key={'products_flat_list'}
            style={styles.flatListStyle}
            renderItem={({ item }) => (
              <ProductListItem
                key={item?.title}
                item={item}
                onPress={() =>
                  router.push({
                    pathname: `/product/[productId]`,
                    params: {
                      productId: item?.id,
                    },
                  })
                }
              />
            )}
            onEndReached={() => fetchAllProducts(products.length.toString())}
            refreshing={loading}
            onRefresh={() => console.warn('Refreshing...')}
          />
          )
        </View>
      </I18nextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListStyle: {
    alignContent: 'stretch',
    padding: 10,
  },
});
