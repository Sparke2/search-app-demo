import React, { useState } from 'react';
import logo from '../img/header/logo.svg';
import qrCodeAndroid from '../img/header/qr-code-android.gif';
import qrCodeIos from '../img/header/qr-code-ios.gif';
import menuIcon from '../img/header/Menu_Alt_04.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [state, setState] = useState({
    isCollapsed: false,
    isCollapsedMenu: false,
    activeTab: 'v-pills-home',
  });

    const [isMenuVisible, setMenuVisible] = useState(true); // Для отображения/скрытия левого меню
    const [activeTab, setActiveTab] = useState(null); // Для активного таба

    const handleTabClick = (tabId) => {
        setActiveTab(tabId); // Устанавливаем активный таб
        setMenuVisible(false); // Скрываем меню при выборе таба
    };

    const handleBackToMenu = () => {
        setMenuVisible(true); // Показываем меню
        setActiveTab(null); // Очищаем активный таб
    };


    const toggleCollapse = () => {
    setState((prevState) => ({
      ...prevState,
      isCollapsed: !prevState.isCollapsed,
    }));
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

  // const handleTabClick = (tabId) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     activeTab: tabId,
  //   }));
  // };

  const tabs = [
    { id: 'v-pills-home', label: 'Библиотека', links: [
        { href: "https://www.iprbookshop.ru/586.html", label: "Книги" },
        { href: "https://www.iprbookshop.ru/moduli_smart.html", label: "Образовательные модули" },
        { href: "https://www.iprbookshop.ru/6951.html", label: "Журналы" },
        { href: "https://www.iprbookshop.ru/586.html?ref_type=2", label: "Новинки" },
        { href: "https://www.iprbookshop.ru/136738.html", label: "Печатные книги" },
        { href: "https://www.iprbookshop.ru/25405.html", label: "Аудиоиздания" },
        { href: "https://www.iprbookshop.ru/95074.html", label: "Видеоресурсы" },
        { href: "https://www.iprbookshop.ru/137780.html", label: "НОПы" },
        { href: "https://www.iprbookshop.ru/35446.html", label: "Архивные фонды" },
        { href: "https://profspo.ru/catalog/books/fpu-books", label: "Федеральный перечень учебников", target: "_blank" },
      ],
    },
    { id: 'v-pills-disabled', label: 'Альтернативные виды обучения', links: [
        { href: "https://datalib.ru/catalog/courses", label: "SMART-курсы", target: "_blank" },
        { href: "https://datalib.ru/lectoriy", label: "Лекторий", target: "_blank" },
      ],
    },
    { id: 'v-pills-messages', label: 'Экосистема IPR SMART', links: [
        { href: "https://www.iprbookshop.ru/133548.html", label: "Модуль бесшовной интеграции" },
        { href: "https://api.iprbooks.ru", label: "IPR SMART API 2.0", target: "_blank" },
      ],
    },
    { id: 'v-pills-integration', label: 'Интеграция в ЭИОС', links: [
        { href: "https://www.iprbookshop.ru/137512.html", label: "ЭБС IPR SMART", target: "_blank" },
        { href: "https://www.iprbookshop.ru/137466.html", label: "Платформа онлайн-обучения DataLIB", target: "_blank" },
        { href: "https://www.iprbookshop.ru/137467.html", label: "ЭОР «Русский как иностранный»", target: "_blank" },
        { href: "https://www.iprbookshop.ru/137469.html", label: "ЭР «PROFобразование»", target: "_blank" },
        { href: "https://www.iprbookshop.ru/137470.html", label: "Платформа ВКР СМАРТ", target: "_blank" },
        { href: "https://www.iprbookshop.ru/137471.html", label: "Мобильное приложение IPR SMART Mobile Reader", target: "_blank" },
        { href: "https://www.iprbookshop.ru/137472.html", label: "Мобильное приложение для лиц с ОВЗ по зрению IPR BOOKS WV-Reader", target: "_blank" },
      ],
    },
    { id: 'educational-center', label: 'Учебный центр', isLink: true, href: 'https://www.iprbookshop.ru/educational-center.html', target: '_blank' },
    { id: 'v-pills-holders', label: 'Правообладателям', links: [
        { href: "https://www.iprbookshop.ru/1733.html", label: "Авторам", target: "_blank" },
        { href: "https://www.iprbookshop.ru/557.html", label: "Издательствам", target: "_blank" },
        { href: "https://www.iprbookshop.ru/6390.html", label: "Сотрудничество для кафедр", target: "_blank" },
        { href: "https://www.iprbookshop.ru/50860.html", label: "Конкурсы и продвижение изданий", target: "_blank" },
      ],
    },
    { id: 'v-pills-info', label: 'Информация', links: [
        { href: "https://www.iprbookshop.ru/4.html", label: "О компании", target: "_blank" },
        { href: "https://www.iprbookshop.ru/72362.html", label: "Новости", target: "_blank" },
        { href: "https://www.iprbookshop.ru/68943.html", label: "Адаптивные технологии", target: "_blank" },
        { href: "https://www.iprbookshop.ru/132587.html", label: "Шаблоны и документы", target: "_blank" },
        { href: "https://www.iprbookshop.ru/1184.html", label: "Контакты", target: "_blank" },
        { href: "https://www.iprbookshop.ru/92965.html", label: "Инструкции", target: "_blank" },
        { href: "https://www.iprbookshop.ru/132588.html", label: "Часто задаваемые вопросы", target: "_blank" },
      ],
    },
    { id: 'v-pills-mobile', label: 'Мобильное приложение IPR SMART Mobile Reader', links: [] },
  ];

  return (
    <header>
      <nav className="navbar navbar-expand-xl fixed-top header-nav p-0">
        <div className="container align-items-center d-block">
          <div className="d-flex justify-content-between">
              <button
                  className="btn d-block d-lg-none"
                  type="button"
                  onClick={toggleCollapseAndMenu}
                  aria-controls="bdNavbar"
                  aria-expanded={state.isCollapsed && state.isCollapsedMenu}  // Используем логическое И
                  aria-label="Toggle navigation"
              >
                  <FontAwesomeIcon icon={faBars}/>
              </button>
              <a className="navbar-brand brandName d-xl-none d-block" href="https://www.iprbookshop.ru">
                  <img src={logo} alt="Logo"/>
              </a>
          </div>
            <div className={`navbar-collapse collapse ${state.isCollapsed ? 'show' : ''}`} id="bdNavbar">
            <div className="w-100 d-flex justify-content-between align-items-center flex-wrap py-1">
              <button
                id="btn-menu"
                className="btn d-none d-lg-block"
                type="button"
                onClick={toggleCollapseMenu}
                aria-expanded={state.isCollapsedMenu}
                aria-controls="collapseMenu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <a href="https://www.iprbookshop.ru" className="navbar-brand brandName d-xl-block d-none">
                <img src={logo} className="img-fluid pr-5" alt="Logo" />
              </a>
              <form className="my-auto" action="366.html" id="search-intuitive" method="get">
                <input type="hidden" name="rsearch" defaultValue="1" />
                <div className="input-group search-header">
                  <input type="text" name="s" className="form-control" placeholder="Поиск..." />
                  <button className="btn" type="submit" id="search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </form>
              <a className="btn btn-link sv d-lg-block d-none" href="https://www.iprbookshop.ru/sveden/common/">
                Сведения об<br />образовательной организации
              </a>
              <a className="btn" href="/special">
                <FontAwesomeIcon icon={faEye} />
              </a>
              <a className="btn btn-link btn-test-access" href="https://www.iprbookshop.ru/134697.html">
                Тестовый доступ
              </a>
              <a href="https://www.iprbookshop.ru/auth" className="btn btn-link text-bold">Вход</a>
            </div>
          </div>
            <div className={`collapse ${state.isCollapsedMenu ? 'show' : ''}`} id="collapseMenu">
                <div className="row">
                    {/* Левое меню */}
                    <div className={`col-5 ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
                        <div className="nav flex-column nav-pills py-sm-4 py-2 pe-4">
                            {tabs.map(tab => (
                                tab.isLink ? (
                                    <a key={tab.id} className="nav-link" href={tab.href} target={tab.target}>
                                        <span>{tab.label}</span>
                                    </a>
                                ) : (
                                    <button
                                        key={tab.id}
                                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => handleTabClick(tab.id)}
                                    >
                                        <span>{tab.label}</span>
                                    </button>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Контент таба */}
                    <div className={`col-7 ${isMenuVisible ? 'content-hidden' : 'content-visible'}`}>
                        <div className="tab-content pt-sm-4 pt-2 pb-5">
                            {activeTab && (
                                <button onClick={handleBackToMenu} className="btn btn-secondary">
                                    {tabs.find(tab => tab.id === activeTab)?.label}
                                </button>
                            )}

                            {tabs.map(tab => (
                                activeTab === tab.id && (
                                    <div key={tab.id} className="tab-pane fade show active">
                                        <div className="row px-md-5">
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

                            {/* Дополнительный контент */}
                            {activeTab === 'v-pills-mobile' && (
                                <div className="tab-pane fade show active" id="v-pills-mobile" role="tabpanel"
                                     aria-labelledby="v-pills-mobile-tab" tabIndex="0">
                                    <div className="row px-md-5 qr-header">
                                        <div className="col-xl-6 text-center">
                                            <a href="https://play.google.com/store/apps/details?id=ru.iprbooks.iprbooksmobile&hl=ru&gl=US&pli=1"
                                               target="_blank">
                                                <img src={qrCodeAndroid} alt="Android QR"/>
                                                <span className="text-center"><br/>Android</span>
                                            </a>
                                        </div>
                                        <div className="col-xl-6 text-center">
                                            <a href="https://apps.apple.com/ru/app/ipr-smart-mobile-reader/id1322302612"
                                               target="_blank">
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
