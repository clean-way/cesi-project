import { Skeleton } from "../ui/skeleton";

interface SkeletonsProps{
    height?: number | string,
    width?: number | string,
    isFullHeight?: boolean,
    isFullWidth?: boolean,
}

export function SkeletonRound(props : SkeletonsProps){
    const {height = 50, width = 50} = {...props};
    return (
        <div className='rounded-full' style={{
            height: height,
            width: height,
        }}>
            <Skeleton className='rounded-full size-full' />
        </div>
    );
}

export function SkeletonLine(props : SkeletonsProps){
    const {height = 20, width = 250, isFullHeight = false, isFullWidth = false} = {...props};
    return (
        <div style={{
            height: isFullHeight ? '100%' : height,
            width: isFullWidth ? '100%' : width,
        }}>
            <Skeleton className='size-full' />
        </div>
    );
}