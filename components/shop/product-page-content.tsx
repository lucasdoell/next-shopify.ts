import Image from "next/image";
import ProductForm from "./product-form";
import RecommendedList from "./recommended-list";
import { ProductType } from "@/types/shopify";

export default function ProductPageContent({
  product,
}: {
  product: ProductType;
}) {
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center space-y-8 md:flex-row 
      md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 lg:max-w-6xl w-11/12 mx-auto"
      >
        <div className="w-full max-w-md border bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-96 w-full">
            <Image
              src={product.images.edges[0].node.url}
              alt="Product image"
              width={1180}
              height={1180}
            />
          </div>
        </div>
        <ProductForm product={product} />
      </div>
      <p className="mx-auto w-11/12 max-w-3xl space-y-8 pt-16 dark:text-white md:space-x-4 lg:space-x-8">
        {product.description}
      </p>
      <RecommendedList
        current={product.id}
        products={product.collections.edges[0].node.products.edges}
      />
    </div>
  );
}
