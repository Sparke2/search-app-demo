import React from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from '../../../../img/shared/copy.svg';
import vk from '../../../../img/shared/vk.svg';
import tg from '../../../../img/shared/tg.svg';
import ok from '../../../../img/shared/ok.svg';

const ShareButtons = ({ url, title }) => {
    const vkShareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    const okShareUrl = `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    const tgShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

    const handleCopy = () => {
        const textToCopy = `${title} - ${url}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success('Ссылка успешно скопирована!');
            })
    };

    return (
        <div className="d-flex flex-wrap gap-2 align-items-center">
            <a href={vkShareUrl} target="_blank" rel="noopener noreferrer">
                <img src={vk} alt="VK" />
            </a>
            <a href={okShareUrl} target="_blank" rel="noopener noreferrer">
                <img src={ok} alt="OK" />
            </a>
            <a href={tgShareUrl} target="_blank" rel="noopener noreferrer">
                <img src={tg} alt="Telegram" />
            </a>
            <button onClick={handleCopy} className="btn p-0">
                <img src={copy} alt="Copy" />
            </button>
            <ToastContainer />
        </div>
    );
};

export default ShareButtons;
