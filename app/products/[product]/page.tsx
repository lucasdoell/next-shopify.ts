import ProductPageContent from "@/components/shop/product-page-content";
import { getAllProducts, getProduct } from "@/lib/shopify";

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((item) => ({
    product: item.node.handle,
  }));
}

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const product = await getProduct(params.product);

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductPageContent product={product} />
    </div>
  );
}
