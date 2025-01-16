'use client';

import { useCallback, useEffect, useState } from 'react';

import ProductCard from '@/components/product/ProductCard';
import GenericAccordion from '@/components/ui/generic-accordion';
import Range from '@/components/ui/range';

import { Product, categories } from '@/lib/constants';
import { filterProductsByPriceRange, getPriceRangeFromProducts } from '@/lib/filters';

const ProductPage = () => {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [orgProducts, setOrgProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();

  const [priceRangeValue, setPriceRangeValue] = useState<[number, number] | undefined>();
  const [priceRangeLimits, setPriceRangeLimits] = useState<[number, number]>([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<{
    male: string | null;
    female: string | null;
  }>({
    male: null,
    female: null,
  });

  // Fetch products
  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:9696/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setOrgProducts(data);
        setPriceRangeLimits(getPriceRangeFromProducts(data));
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleCategoryClick = (gender: string, category: string) => {
    // Update the selected category for the given gender
    setSelectedCategories((prevState) => ({
      ...prevState,
      [gender]: category,
    }));

    filterProducts(gender, category);
  };

  const filterProducts = (gender: string, category: string) => {
    setLoading(true);

    const filtered = orgProducts.filter(
      (product) =>
        product.tags.includes(gender.toLowerCase()) &&
        product.tags.some((tag) => category.toLowerCase().includes(tag.toLowerCase())),
    );

    // Update the price range limits
    const range = getPriceRangeFromProducts(filtered);
    setPriceRangeLimits(range);
    setPriceRangeValue(range);

    // Update the products list
    setProducts(filtered);
    setFilteredProducts(filtered);
    setTimeout(() => setLoading(false), 500);
  };

  // Filter products by price range
  const onPriceRangeChange = useCallback((value: [number, number]) => {
    setLoading(true);

    setPriceRangeValue(value);
    setProducts(
      filterProductsByPriceRange(
        !filteredProducts ? products : filteredProducts,
        value[0],
        value[1],
      ),
    );
    setTimeout(() => setLoading(false), 500);
  }, [products, filteredProducts]);

  return (
    <article className="mb-6 lg:mb-12 lg:px-10">
      <div className="mt-4 flex">
        {/* Filter bar */}
        <aside className="hidden lg:block">
          {/* Categories */}
          <div className="flex w-60 shrink-0 flex-col gap-4 text-primary text-[17px] font-semibold mb-4">
            All Products
          </div>
          {/* Male */}
          <GenericAccordion defaultOpen={false} name={'Male'}>
            <div>
              <ul className="flex w-60 shrink-0 flex-col gap-4 mb-4">
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`text-primary ml-5 cursor-pointer ${
                      selectedCategories.male === category ? 'font-bold' : ''
                    }`}
                    onClick={() => handleCategoryClick('male', category)}
                  >
                    {category}
                  </div>
                ))}
              </ul>
            </div>
          </GenericAccordion>
          {/* Female */}
          <div className="flex flex-col border-t border-dividers">
            <GenericAccordion defaultOpen={false} name={'Female'}>
              <div>
                <ul className="flex w-60 shrink-0 flex-col gap-4 mb-4">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`text-primary ml-5 cursor-pointer ${
                        selectedCategories.female === category ? 'font-bold' : ''
                      }`}
                      onClick={() => handleCategoryClick('female', category)}
                    >
                      {category}
                    </div>
                  ))}
                </ul>
              </div>
            </GenericAccordion>
          </div>
          {/* Price */}
          <div className="flex h-fit w-60 shrink-0 flex-col border-t border-dividers">
            <GenericAccordion defaultOpen={false} name={'Price'}>
              <div>
                <div className="flex w-full justify-between text-primary">
                  <span>{Math.max(priceRangeValue?.[0] ?? 0, priceRangeLimits[0])}</span>
                  <span>
                    {Math.min(priceRangeValue?.[1] ?? priceRangeLimits[1], priceRangeLimits[1])}
                  </span>
                </div>
                <Range
                  min={priceRangeLimits[0]}
                  max={priceRangeLimits[1]}
                  onChange={onPriceRangeChange}
                  value={priceRangeValue ?? priceRangeLimits}
                  label="Price range"
                />
              </div>
            </GenericAccordion>
          </div>
        </aside>
        {/* Products list */}
        <section className="w-full lg:ml-14">
          <div className={'w-full text-xs text-primary uppercase'}>
            All Products ({products.length})
          </div>
          <ul className="mt-4 grid w-full grid-cols-2 gap-x-4 gap-y-8 px-6 lg:mt-6 lg:gap-x-8 lg:gap-y-10 lg:px-0 lg:grid-cols-3">
            {loading
              ? Array(16)
                  .fill(0)
                  .map((_, i) => (
                    <li key={i}>
                      <ProductCard loading />
                    </li>
                  ))
              : products.map((product) => (
                  <li key={product.id}>
                    <ProductCard
                      className="animate-fade-in duration-75"
                      product={{
                        ...product,
                      }}
                    />
                  </li>
                ))}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default ProductPage;
