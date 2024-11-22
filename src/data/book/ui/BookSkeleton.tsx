import Skeleton from "@mui/material/Skeleton"

export const BookSkeleton = ({index = 0}: { index?: number }) => {
    return <Skeleton width={'100%'} height={(index % 3) % 2 === 0 ? 200 : 330}
                     style={{marginBottom: '1.5rem', aspectRatio: '3/3', borderRadius: '1rem'}}/>
}
