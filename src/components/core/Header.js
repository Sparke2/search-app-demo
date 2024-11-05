import React, {useState} from 'react';
import logo from '../../img/header/logo.svg';
import qrCodeAndroid from '../../img/header/qr-code-android.gif';
import qrCodeIos from '../../img/header/qr-code-ios.gif';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBars,
    faChevronLeft,
    faChevronRight,
    faEye,
    faMagnifyingGlass,
    faXmark
} from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [state, setState] = useState({
        isCollapsed: false,
        isCollapsedMenu: false,
        activeTab: 'v-pills-home',
    });

    const [isMenuVisible, setMenuVisible] = useState(true);
    const [activeTab, setActiveTab] = useState(null);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setMenuVisible(false);
    };

    const handleBackToMenu = () => {
        setMenuVisible(true);
        setActiveTab(null);
    };

    const toggleCollapseMenu = () => {
        setState((prevState) => ({
            ...prevState,
            isCollapsedMenu: !prevState.isCollapsedMenu,
        }));
    };

    const toggleCollapseAndMenu = () => {
        setState((prevState) => ({
            ...prevState,
            isCollapsed: !prevState.isCollapsed,
            isCollapsedMenu: !prevState.isCollapsedMenu,
        }));
    };

    const tabs = [
        {
            id: 'v-pills-home', label: 'Библиотека', links: [
                {href: "https://www.iprbookshop.ru/586.html", label: "Книги"},
                {href: "https://www.iprbookshop.ru/moduli_smart.html", label: "Образовательные модули"},
                {href: "https://www.iprbookshop.ru/6951.html", label: "Журналы"},
                {href: "https://www.iprbookshop.ru/586.html?ref_type=2", label: "Новинки"},
                {href: "https://www.iprbookshop.ru/136738.html", label: "Печатные книги"},
                {href: "https://www.iprbookshop.ru/25405.html", label: "Аудиоиздания"},
                {href: "https://www.iprbookshop.ru/95074.html", label: "Видеоресурсы"},
                {href: "https://www.iprbookshop.ru/137780.html", label: "НОПы"},
                {href: "https://www.iprbookshop.ru/35446.html", label: "Архивные фонды"},
                {
                    href: "https://profspo.ru/catalog/books/fpu-books",
                    label: "Федеральный перечень учебников",
                    target: "_blank"
                },
            ],
        },
        {
            id: 'v-pills-disabled', label: 'Альтернативные виды обучения', links: [
                {href: "https://datalib.ru/catalog/courses", label: "SMART-курсы", target: "_blank"},
                {href: "https://datalib.ru/lectoriy", label: "Лекторий", target: "_blank"},
            ],
        },
        {
            id: 'v-pills-messages', label: 'Экосистема IPR SMART', links: [
                {href: "https://www.iprbookshop.ru/133548.html", label: "Модуль бесшовной интеграции"},
                {href: "https://api.iprbooks.ru", label: "IPR SMART API 2.0", target: "_blank"},
            ],
        },
        {
            id: 'v-pills-integration', label: 'Интеграция в ЭИОС', links: [
                {href: "https://www.iprbookshop.ru/137512.html", label: "ЭБС IPR SMART", target: "_blank"},
                {
                    href: "https://www.iprbookshop.ru/137466.html",
                    label: "Платформа онлайн-обучения DataLIB",
                    target: "_blank"
                },
                {
                    href: "https://www.iprbookshop.ru/137467.html",
                    label: "ЭОР «Русский как иностранный»",
                    target: "_blank"
                },
                {href: "https://www.iprbookshop.ru/137469.html", label: "ЭР «PROFобразование»", target: "_blank"},
                {href: "https://www.iprbookshop.ru/137470.html", label: "Платформа ВКР СМАРТ", target: "_blank"},
                {
                    href: "https://www.iprbookshop.ru/137471.html",
                    label: "Мобильное приложение IPR SMART Mobile Reader",
                    target: "_blank"
                },
                {
                    href: "https://www.iprbookshop.ru/137472.html",
                    label: "Мобильное приложение для лиц с ОВЗ по зрению IPR BOOKS WV-Reader",
                    target: "_blank"
                },
            ],
        },
        {
            id: 'educational-center',
            label: 'Учебный центр',
            isLink: true,
            href: 'https://www.iprbookshop.ru/educational-center.html',
            target: '_blank'
        },
        {
            id: 'v-pills-holders', label: 'Правообладателям', links: [
                {href: "https://www.iprbookshop.ru/1733.html", label: "Авторам", target: "_blank"},
                {href: "https://www.iprbookshop.ru/557.html", label: "Издательствам", target: "_blank"},
                {href: "https://www.iprbookshop.ru/6390.html", label: "Сотрудничество для кафедр", target: "_blank"},
                {
                    href: "https://www.iprbookshop.ru/50860.html",
                    label: "Конкурсы и продвижение изданий",
                    target: "_blank"
                },
            ],
        },
        {
            id: 'v-pills-info', label: 'Информация', links: [
                {href: "https://www.iprbookshop.ru/4.html", label: "О компании", target: "_blank"},
                {href: "https://www.iprbookshop.ru/72362.html", label: "Новости", target: "_blank"},
                {href: "https://www.iprbookshop.ru/68943.html", label: "Адаптивные технологии", target: "_blank"},
                {href: "https://www.iprbookshop.ru/132587.html", label: "Шаблоны и документы", target: "_blank"},
                {href: "https://www.iprbookshop.ru/1184.html", label: "Контакты", target: "_blank"},
                {href: "https://www.iprbookshop.ru/92965.html", label: "Инструкции", target: "_blank"},
                {href: "https://www.iprbookshop.ru/132588.html", label: "Часто задаваемые вопросы", target: "_blank"},
            ],
        },
        {id: 'v-pills-mobile', label: 'Мобильное приложение IPR SMART Mobile Reader', links: []},
    ];

    return (
        <header>
            <nav className="navbar navbar-expand-xl fixed-top header-nav p-0">
                <div className="container align-items-center d-block">
                    <div className="d-flex justify-content-between align-items-center">
                        <button
                            className="btn d-block d-lg-none ps-0 btn-menu"
                            type="button"
                            onClick={toggleCollapseAndMenu}
                            aria-controls="bdNavbar"
                            aria-expanded={state.isCollapsed && state.isCollapsedMenu}
                            aria-label="Toggle navigation"
                        >
                            {state.isCollapsedMenu ?  <FontAwesomeIcon icon={faXmark}/>  : <FontAwesomeIcon icon={faBars}/>}
                        </button>
                        <a className="navbar-brand brandName d-xl-none d-block" href="https://www.iprbookshop.ru">
                            <img src={logo} alt="Logo"/>
                        </a>
                        <a className="btn d-lg-none d-block" href="/special">
                            <FontAwesomeIcon icon={faEye}/>
                        </a>
                        <a className="btn btn-link btn-test-access d-lg-none d-block"
                           href="https://www.iprbookshop.ru/134697.html">
                            Тестовый доступ
                        </a>
                        <a href="https://www.iprbookshop.ru/auth"
                           className="btn btn-link text-bold d-lg-none d-block">Вход</a>
                    </div>
                    <div className={`navbar-collapse collapse ${state.isCollapsed ? 'show' : ''}`} id="bdNavbar">
                        <div className="w-100 d-flex justify-content-between align-items-center flex-wrap py-1">
                            <button
                                className="btn d-none d-lg-block btn-menu"
                                type="button"
                                onClick={toggleCollapseMenu}
                                aria-expanded={state.isCollapsedMenu}
                                aria-controls="collapseMenu"
                            >
                                {state.isCollapsedMenu ?  <FontAwesomeIcon icon={faXmark}/>  : <FontAwesomeIcon icon={faBars}/>}
                            </button>
                            <a href="https://www.iprbookshop.ru" className="navbar-brand brandName d-xl-block d-none">
                                <img src={logo} className="img-fluid" alt="Logo"/>
                            </a>
                            <form className="my-auto" action="https://www.iprbookshop.ru/366.html" id="search-intuitive"
                                  method="get">
                                <input type="hidden" name="rsearch" defaultValue="1"/>
                                <div className="input-group search-header">
                                    <input type="text" name="s" className="form-control" placeholder="Поиск..."/>
                                    <button className="btn" type="submit" id="search">
                                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                    </button>
                                </div>
                            </form>
                            <a className="btn btn-link sv d-lg-block d-none"
                               href="https://www.iprbookshop.ru/sveden/common/">
                                Сведения об<br/>образовательной организации
                            </a>
                            <a className="btn d-lg-block d-none" href="/special">
                                <FontAwesomeIcon icon={faEye}/>
                            </a>
                            <a className="btn btn-link btn-test-access d-lg-block d-none"
                               href="https://www.iprbookshop.ru/134697.html">
                                Тестовый доступ
                            </a>
                            <a href="https://www.iprbookshop.ru/auth"
                               className="btn btn-link text-bold d-lg-block d-none">Вход</a>
                        </div>
                    </div>
                    <div className={`collapse ${state.isCollapsedMenu ? 'show' : ''}`} id="collapseMenu">
                        <div className="row">
                        <div className={`col-5 ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
                                <div className="nav flex-column nav-pills py-sm-4 py-2 pe-4">
                                    {tabs.map(tab => (
                                        tab.isLink ? (
                                            <a key={tab.id} className="nav-link" href={tab.href} target={tab.target}>
                                                <span>{tab.label} <FontAwesomeIcon icon={faChevronRight}/></span>
                                            </a>
                                        ) : (
                                            <button
                                                key={tab.id}
                                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => handleTabClick(tab.id)}
                                            >
                                                <span>{tab.label} <FontAwesomeIcon icon={faChevronRight}/></span>
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>
                            <div className={`col-7 ${isMenuVisible ? 'content-hidden' : 'content-visible'}`}>
                                <div className="tab-content pt-sm-4 pt-2 pb-sm-5 pb-3">
                                    {activeTab && (
                                        <button onClick={handleBackToMenu} className="btn menu-back">
                                            <FontAwesomeIcon icon={faChevronLeft}/> {tabs.find(tab => tab.id === activeTab)?.label}
                                        </button>
                                    )}

                                    {tabs.map(tab => (
                                        activeTab === tab.id && (
                                            <div key={tab.id} className="tab-pane fade show active">
                                                <div className="row">
                                                    {tab.links.map((link, idx) => (
                                                        <div key={idx} className="col-12">
                                                            <div className="link-tab">
                                                                <a href={link.href}
                                                                   target={link.target || '_self'}>{link.label}</a>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                    {activeTab === 'v-pills-mobile' && (
                                        <div className="tab-pane fade show active" id="v-pills-mobile" role="tabpanel"
                                             aria-labelledby="v-pills-mobile-tab" tabIndex="0">
                                            <div className="row px-md-5 qr-header">
                                                <div className="col-xl-6 text-center">
                                                    <a href="https://play.google.com/store/apps/details?id=ru.iprbooks.iprbooksmobile&hl=ru&gl=US&pli=1"
                                                       target="_blank" rel="noreferrer">
                                                        <img src={qrCodeAndroid} alt="Android QR"/>
                                                        <span className="text-center"><br/>Android</span>
                                                    </a>
                                                </div>
                                                <div className="col-xl-6 text-center">
                                                    <a href="https://apps.apple.com/ru/app/ipr-smart-mobile-reader/id1322302612"
                                                       target="_blank" rel="noreferrer">
                                                        <img src={qrCodeIos} alt="IOS QR"/>
                                                        <span className="text-center"><br/>IOS</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
