"use client";

import { useState, useContext } from "react";
import { formatter } from "@/lib/utils";
import ProductOptions from "./product-options";
import { CartContext } from "@/context/shopContext";
import { ProductType } from "@/types/shopify";

export default function ProductForm({ product }: { product: ProductType }) {
  const { addToCart } = useContext(CartContext);

  const allVariantOptions = product.variants.edges.map((variant) => {
    const allOptions: Record<string, string> = {};

    variant.node.selectedOptions.forEach((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues: Record<string, string> = {};
  product.options.forEach((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name: string, value: string) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  return (
    <div className="flex w-full flex-col rounded-2xl p-4 shadow-lg md:w-1/3">
      <h2 className="text-2xl font-bold dark:text-white">{product.title}</h2>
      <span className="pb-3 dark:text-white">
        {formatter.format(Number(selectedVariant.variantPrice))}
      </span>
      {product.options.map(({ name, values }) => (
        <ProductOptions
          key={`key-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      <button
        onClick={() => {
          addToCart(selectedVariant);
        }}
        className="mt-3 rounded-lg bg-black px-2 py-3 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
      >
        Add to Cart
      </button>
    </div>
  );
}
