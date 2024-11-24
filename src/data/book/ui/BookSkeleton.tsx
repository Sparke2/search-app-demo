export const BookSkeleton = ({index = 0}: { index?: number }) => {
    return (
        <div className="skeleton-container" key={index}>
            <div className="skeleton-header"></div>
            <div className="skeleton-rows">
                <div className="skeleton-row short"></div>
                <div className="skeleton-row"></div>
                <div className="skeleton-row"></div>
                <div className="skeleton-row short"></div>
            </div>
            <div className="skeleton-footer">
                <div className="skeleton-button"></div>
                <div className="skeleton-button wide"></div>
            </div>
        </div>
    );
}
