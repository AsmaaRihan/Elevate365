import { getAllProducts } from '@/src/api/ProductsApi';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useProducts = () => {
  const fetchAllProducts = async ({ pageParam = 0 }) => {
    return await getAllProducts(pageParam);
  };

  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const lastItem = lastPage.products.at(-1);
      if (!lastItem) return undefined;
      return lastItem.id;
    },
  });
};
