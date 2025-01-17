'use client';

import { useCallback, useEffect, useState } from 'react';

import { SlidersHorizontal, X } from 'lucide-react';

import { Dialog, Transition, TransitionChild } from '@headlessui/react';

import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import GenericAccordion from '@/components/ui/generic-accordion';
import Range from '@/components/ui/range';

import { Product, categories } from '@/lib/constants';
import { filterProductsByPriceRange, getPriceRangeFromProducts } from '@/lib/filters';

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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

    fetch('https://lottusse-1-latest.onrender.com/api/products')
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
    const otherGender = gender === 'male' ? 'female' : 'male';

    // Update the selected category for the given gender
    setSelectedCategories((prevState) => ({
      ...prevState,
      [gender]: category,
      [otherGender]: null, // Reset the other gender
    }));

    filterProducts(gender, category);

    // If mobile filter is open, close it
    if (filterOpen) {
      setTimeout(() => closeFilters(), 500);
    }
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
  const onPriceRangeChange = useCallback(
    (value: [number, number]) => {
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
      if (filterOpen) {
        setTimeout(() => closeFilters(), 500);
      }
    },
    [products, filteredProducts],
  );

  const closeFilters = () => {
    setFilterOpen(false);
  };

  return (
    <article className="mb-6 lg:mb-12 lg:px-10">
      <Button
        className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 lg:hidden"
        onClick={() => setFilterOpen(true)}
      >
        <span className="flex gap-2 text-md text-white normal-case">
          <SlidersHorizontal height={18} width={18} />
          Filter
        </span>
      </Button>

      <div className="mt-4 flex">
        {/* Filter bar */}
        {/* Mobile */}
        <Transition show={filterOpen}>
          <Dialog className="fixed z-modal lg:hidden" onClose={closeFilters}>
            <TransitionChild
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="fixed inset-0 -z-10 w-screen bg-[#0008] transition-opacity duration-400"
              as="button"
              onClick={closeFilters}
            />
            <TransitionChild
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="fixed right-0 top-0 flex h-screen w-screen max-w-[85%] flex-col bg-background-primary transition-transform duration-400">
                <div className="flex flex-1 flex-col overflow-auto px-6 pb-6">
                  <div className="flex items-center justify-between py-4 text-primary">
                    <div className="flex gap-4">
                      <span className="text-md font-semibold uppercase">Filters</span>
                    </div>
                    <button onClick={closeFilters}>
                      <X size={25} />
                    </button>
                  </div>
                  <GenericAccordion defaultOpen={selectedCategories.male != null} name={'Male'}>
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
                    <GenericAccordion
                      defaultOpen={selectedCategories.female != null}
                      name={'Female'}
                    >
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
                  <div className="flex h-fit w-full shrink-0 flex-col border-t border-dividers">
                    <GenericAccordion
                      defaultOpen={priceRangeValue != priceRangeLimits}
                      name={'Price'}
                    >
                      <div>
                        <div className="flex w-full justify-between text-primary">
                          <span>{Math.max(priceRangeValue?.[0] ?? 0, priceRangeLimits[0])}</span>
                          <span>
                            {Math.min(
                              priceRangeValue?.[1] ?? priceRangeLimits[1],
                              priceRangeLimits[1],
                            )}
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
                </div>
              </div>
            </TransitionChild>
          </Dialog>
        </Transition>

        {/* Desktop */}
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
          <div className={'w-full text-xs text-primary uppercase ml-5 lg:ml-0'}>
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
