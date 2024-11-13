import React from "react";
import {Archive} from "../../../data/archive/model/types";

const ArchiveItem = ({ index, archive }: { index: number, archive: Archive }) => {
    const collections = archive.collections || [];
    return (
        <div className="card-item position-relative">
            <div className="row">
                <div className="col-10">
                    <p className="text"
                       dangerouslySetInnerHTML={{__html: `<span class="pe-2">${index}.</span> ${archive.title}`}}/>
                    <p className="text-grey">
                        {collections.map((collection, index) => (
                            <span key={index}>
                                {collection}{index < archive.collections.length - 1 && ', '}
                            </span>
                        ))}
                    </p>
                    <p className="text-grey">{archive.description}</p>
                </div>
                <div className="col-1">
                    <p className="text-grey">Год</p>
                    <p className="text-small">{archive.year}</p>
                </div>
                <div className="col-1">
                    <p className="text-grey">Стр.</p>
                    <p className="text-small">{archive.pageCount}</p>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-3 mt-3">
                <button className="btn btn-primary btn-small">Перейти к просмотру</button>
            </div>
        </div>
    )
}
export default ArchiveItem;