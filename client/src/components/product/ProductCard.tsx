import React from 'react';

import { Product } from '@/lib/constants';

import ProductCardDetail from './ProductCardDetail';
import ProductCardSkeleton from './ProductCardSkeleton';

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product?: Product;
  loading?: boolean;
}

const ProductPreviewCard: React.FC<ProductCardProps> = ({ product, loading = false, ...props }) => {
  if (loading) return <ProductCardSkeleton />;

  if (product) {
    return <ProductCardDetail {...props} product={product} />;
  }

  return null;
};

export default ProductPreviewCard;
