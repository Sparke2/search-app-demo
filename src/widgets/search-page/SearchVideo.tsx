import React, {useEffect, useState} from "react";
import {useAllVideo} from "../../data/video/model/queries";
import VideoItem from "../../components/core/card/VideoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileExcel} from "@fortawesome/free-regular-svg-icons";
import {useQueryParam} from "../../hooks/useQueryParam";
import {useArrayQueryParam} from "../../hooks/useArrayQueryParam";
import {useSearchAreaQueryParam} from "../../hooks/useSearchAreaQueryParam";
import ItemsPerPageSelect from "./ui/ItemsPerPageSelect";
import {SearchPage} from "./ui/SortSelect";
import Pagination from "./ui/Pagination";
import {BookSkeleton} from "../../data/book/ui/BookSkeleton";
import {toast, ToastContainer} from "react-toastify";
import {VideoRepository} from "../../data/video/model/repository";
import SearchResultTextVideo from "../../hooks/SearchResultTextVideo";
import getExelVideo = VideoRepository.getExelVideo;

export function SearchVideo() {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);
    const handleCountChange = (value) => setCount(value);
    const value = useQueryParam('query');
    const by = useSearchAreaQueryParam();
    const channels = useArrayQueryParam('channel');
    const field = useQueryParam('sort')?.trim() || "score";
    const modifier = useQueryParam('sort')?.trim() === "_title_" ? "asc" : "desc";

    const {
        data: {pagination: {rows = 0, start = 0, total: fetchedTotal = 0} = {}, data: videos = []} = {},
        isPending,
        isFetching,
        isPlaceholderData,
    } = useAllVideo({query: {value, by}, filter: {channels}, sorts: [{field, modifier}]}, {
        start: page * count,
        rows: count
    });

    const downloadExcel = async (body: VideoRepository.videoBody) => {
        await toast.promise(
            getExelVideo(body).then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'videos.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }),
            {
                pending: 'Файл формируется...',
                success: 'Файл успешно загружен',
                error: 'Ошибка при генерации файла',
            }
        );
    };

    const handleDownloadExcel = () => {
        downloadExcel({query: {value, by}, filter: {channels}, sorts: [{field, modifier}]});
    };

    useEffect(() => {
        if (!isPending && fetchedTotal !== total) {
            setTotal(fetchedTotal);
            setPage(0);
        }
    }, [fetchedTotal, total, isPending]);

    useEffect(() => {
        setHasMore((page + 1) * count < total);
    }, [page, total, count]);


    return (
        <div>
            <div className="d-flex flex-sm-row gap-2 flex-column justify-content-between align-items-sm-center mb-4 search-header">
                <SearchResultTextVideo resultCount={total || 0}/>
                <ToastContainer position="top-right"
                                autoClose={5000}
                                closeOnClick
                                draggable/>
                <button className="btn btn-outline-primary px-4" onClick={handleDownloadExcel}>
                    <FontAwesomeIcon icon={faFileExcel} className="pe-2"/> Экспорт в Excel
                </button>
            </div>
            <div className="d-flex flex-md-row gap-3 flex-column justify-content-between mb-5">
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
                <SearchPage name="video"/>
            </div>
            {isPending ? (
                <div className="row g-4">
                    {new Array(count).fill(null).map((_, i) => (
                        <BookSkeleton index={i} key={i}/>
                    ))}
                </div>
            ) : videos.length === 0 && total === 0 ? (
                <div className="search-header">
                    <h5><span>По вашему запросу</span> {value} <span>ничего не найдено</span></h5>
                </div>
            ) : (
                <div className="row g-4">
                    {videos.map((video, index) => (
                        <div className="col-12" key={video.id}>
                            <VideoItem index={(page * count) + index + 1} video={video}/>
                        </div>
                    ))}
                </div>
            )}
            <div className="d-flex flex-md-row flex-column gap-3 justify-content-between align-items-sm-center pt-4">
                <Pagination
                    page={page}
                    setPage={setPage}
                    hasMore={hasMore}
                    isPlaceholderData={isPlaceholderData}
                    total={total || 0}
                    count={count}
                />
                <ItemsPerPageSelect count={count} handleCountChange={handleCountChange}/>
            </div>
        </div>
    );
}
