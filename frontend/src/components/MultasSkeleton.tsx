import { Skeleton } from "./ui/skeleton";

interface Props {
    count: number;
}

const MultasSkeleton = ({ count }: Props) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="h-50 w-full shadow-md border border-solid border-gray-200 rounded-md animate-pulse "
                />
            ))}
        </>
    );
};

export default MultasSkeleton;
