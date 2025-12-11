import { getProductsById } from '@/src/api/ProductsApi';
import { useQuery } from '@tanstack/react-query';

const useProductDetails = (productId: string) => {
  const fetchProductDetails = async (productId: string) => await getProductsById(productId);

  return useQuery({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductDetails(productId),
    enabled: !!productId,
  });
};
export default useProductDetails;
