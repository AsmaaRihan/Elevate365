import { FlatList, StyleSheet, View } from 'react-native';

import { I18nextProvider } from 'react-i18next';

import '@/ReactotronConfig';
import ProductListItem from '@/src/components/productListItem';
import { useProducts } from '@/src/hooks/useProducts/useProducts';
import i18n from '@/src/language';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  const { data, isLoading: loading, fetchNextPage } = useProducts();
  const products = data?.pages?.map((page) => page?.products).flat() || [];

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
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.5}
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
