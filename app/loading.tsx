import Skeleton from "@/components/Skeleton";

export default function loading(){
    return (
        <div className="flex flex-col gap-10 p-3 max-w-200 mx-auto overflow-x-hidden">
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    )
}