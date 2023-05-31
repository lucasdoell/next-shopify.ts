import ProductCard from "@/components/shop/product-card";
import { getProductsInCollection } from "@/lib/shopify";

export default async function Page() {
  const products = await getProductsInCollection("all-products");

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => {
        return <ProductCard key={product.node.id} product={product} />;
      })}
    </div>
  );
}
