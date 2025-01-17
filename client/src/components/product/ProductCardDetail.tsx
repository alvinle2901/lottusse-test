import React from 'react';

import Image from 'next/image';

import { Product } from '@/lib/constants';

import { Button } from '../ui/button';

export interface ProductCardDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}

const ProductPreviewCardPurchasable: React.FC<ProductCardDetailProps> = ({ product, ...props }) => {
  const { name, title, imageLink = '', price } = product;
  const containerClassNames =
    'relative flex flex-col gap-4 overflow-visible text-primary lg:min-w-0';

  return (
    <div {...props} className={[containerClassNames, props.className].join(' ')}>
      <div className="bg-[#f6f6f6] inline-block p-4 relative group">
        <Image
          src={imageLink}
          alt={''}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
        <Button
          variant={'outline'}
          className="relative w-full bg-white uppercase font-semibold text-sm lg:text-medium opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-md"
          size="lg"
        >
          <span>Add to Cart</span>
        </Button>
      </div>

      <div className="flex flex-col">
        <div className="line-clamp-2 text-primary text-md font-semibold uppercase lg:text-medium">
          {name}
        </div>
        <span
          className="line-clamp-2 text-sm text-body"
          dangerouslySetInnerHTML={{ __html: title || '' }}
        />
      </div>
      <div className="text-lg font-semibold lg:text-sm">{price} €</div>
    </div>
  );
};

export default ProductPreviewCardPurchasable;
