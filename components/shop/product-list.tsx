import { GetProductsInCollectionResultType } from "@/types/shopify";
import ProductCard from "./product-card";

const ProductList = ({
  products,
}: {
  products: GetProductsInCollectionResultType;
}) => {
  return (
    <div className="bg-white px-10 dark:bg-slate-900">
      <div className="mx-auto px-4 pt-16 pb-0 sm:py-24 sm:px-6 lg:px-8 lg:pt-48 lg:pb-4 xl:pt-64">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Products
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
