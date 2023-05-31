import Link from "next/link";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import { ProductByCollectionType } from "@/types/shopify";

const ProductCard = ({ product }: { product: ProductByCollectionType }) => {
  const { handle, title } = product.node;
  const { altText, url } = product.node.images.edges[0].node;
  const price = product.node.priceRange.minVariantPrice.amount;

  return (
    <Link href={`/products/${handle}`} className="group">
      <>
        <div className="w-72 overflow-hidden rounded-3xl bg-gray-200 dark:bg-black">
          <div className="relative h-72 group-hover:opacity-75">
            <Image
              src={url}
              alt={altText!}
              width={1180}
              height={1180}
              className=""
            />
          </div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-100">
          {formatter.format(Number(price))}
        </p>
      </>
    </Link>
  );
};

export default ProductCard;
