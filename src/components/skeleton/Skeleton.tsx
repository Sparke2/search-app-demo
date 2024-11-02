import React, { ReactElement } from 'react';

interface SkeletonProps {
    baseColor?: string;
    highlightColor?: string;
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    circle?: boolean;
    enableAnimation?: boolean;
    className?: string;
}

export const Skeleton = ({
                             baseColor = "#e0e0e0",
                             highlightColor = "#f0f0f0",
                             width,
                             height,
                             borderRadius = "8px",
                             circle = false,
                             enableAnimation = true,
                             className = '',
                         }: SkeletonProps): ReactElement => {


            return <span
                className={`skeleton ${circle ? 'circle' : ''} ${!enableAnimation ? 'no-animation' : ''} ${className}`}
                style={{
                    '--base-color': baseColor,
                    '--highlight-color': highlightColor,
                    '--width': typeof width === 'number' ? `${width}px` : width,
                    '--height': typeof height === 'number' ? `${height}px` : height,
                    '--border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
                } as React.CSSProperties}
            />
};
