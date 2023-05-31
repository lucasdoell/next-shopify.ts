import { Skeleton } from "@/components/ui/skeleton";

export default function ProductFormSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-2xl p-4 shadow-lg md:w-1/3">
      <h2 className="text-2xl font-bold dark:text-white">
        <Skeleton className="w-24 h-4" />
      </h2>
      <span className="pb-3 dark:text-white">
        <Skeleton className="w-24 h-4" />
      </span>
    </div>
  );
}
