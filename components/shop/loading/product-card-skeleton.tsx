import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <>
      <div className="w-72 overflow-hidden rounded-3xl bg-gray-200 dark:bg-slate-900">
        <Skeleton className="relative h-72 group-hover:opacity-75" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        <Skeleton className="w-24 h-4" />
      </h3>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-100">
        <Skeleton className="w-20 h-4" />
      </p>
    </>
  );
}
