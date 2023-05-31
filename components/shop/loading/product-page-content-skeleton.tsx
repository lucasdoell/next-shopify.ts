import ProductFormSkeleton from "@/components/shop/loading/product-form-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageContentSkeleton() {
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center space-y-8 md:flex-row 
      md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 lg:max-w-6xl w-11/12 mx-auto"
      >
        <div className="w-full max-w-md border bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <Skeleton className="relative h-96 w-full" />
        </div>
        <ProductFormSkeleton />
      </div>
      <p className="mx-auto w-11/12 max-w-3xl space-y-8 pt-16 dark:text-white md:space-x-4 lg:space-x-8">
        <Skeleton className="w-24 h-4" />
      </p>
    </div>
  );
}
