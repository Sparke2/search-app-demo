import React from 'react';
import logo from '../img/header/logo.svg';
import menuIcon from '../img/header/Menu_Alt_04.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-xl fixed-top header-nav p-0">
        <div className="container-fluid align-items-center d-block">
          <div className="d-flex justify-content-between">
            <button className="navbar-toggler collapsed box-shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
              <img src={menuIcon} alt="" />
            </button>
            <a className="navbar-brand brandName d-xl-none d-block" href="https://www.iprbookshop.ru">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="navbar-collapse collapse" id="bdNavbar">
            <div className="w-100 d-flex justify-content-between align-items-center align-content-between flex-wrap py-1">
              <button id="btn-menu" className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMenu" aria-expanded="false" aria-controls="collapseMenu">
                <FontAwesomeIcon icon={faBars} />
              </button>
              <a href="https://www.iprbookshop.ru" className="navbar-brand brandName d-xl-block d-none">
                <img src={logo} className="img-fluid pr-5" alt="" />
              </a>
              <form className="my-auto" action="366.html" id="search-intuitive" method="get">
                <input defaultValue="1" type="hidden" name="rsearch" />
                <div className="input-group search-header">
                  <input type="text" name="s" className="form-control" placeholder="Поиск..." defaultValue="" />
                  <button className="btn" type="submit" id="search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </form>
              <a className="btn btn-link text-left" href="/sveden/common/">Сведения об<br />образовательной организации</a>
              <a className="btn" href="/special">
                <FontAwesomeIcon icon={faEye} />
              </a>
              <a className="btn btn-link btn-test-access" href="/134697.html">
                <p className="m-0">Тестовый доступ</p>
              </a>
              <a href="/auth" className="btn btn-link text-bold">Вход</a>
            </div>
          </div>
          <div className="collapse" id="collapseMenu">
            <div className="row">
              <div className="col-5">
                <div className="nav flex-column nav-pills py-sm-5 py-2 pe-4" style={{ boxShadow: '41px 0 42px -36px rgba(0, 0, 0, 0.09)' }} id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true"><span>Библиотека</span></button>
                  <button className="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false"><span>Альтернативные виды обучения</span></button>
                  <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"><span>Экосистема IPR SMART</span></button>
                  <button className="nav-link" id="v-pills-integration-tab" data-bs-toggle="pill" data-bs-target="#v-pills-integration" type="button" role="tab" aria-controls="v-pills-integration" aria-selected="false"><span>Интеграция в ЭИОС</span></button>
                  <a className="nav-link" href="/educational-center.html" target="_blank"><span>Учебный центр</span></a>
                  <button className="nav-link" id="v-pills-info-tab" data-bs-toggle="pill" data-bs-target="#v-pills-holders" type="button" role="tab" aria-controls="v-pills-holders" aria-selected="false"><span>Правообладателям</span></button>
                  <button className="nav-link" id="v-pills-info-tab" data-bs-toggle="pill" data-bs-target="#v-pills-info" type="button" role="tab" aria-controls="v-pills-info" aria-selected="false"><span>Информация</span></button>
                  <button className="nav-link" id="v-pills-mobile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-mobile" type="button" role="tab" aria-controls="v-pills-mobile" aria-selected="false"><span>Мобильное приложение IPR SMART Mobile Reader</span></button>
                </div>
              </div>
              <div className="col-7">
                <div className="tab-content pt-sm-5 pt-2 pb-5" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                    <div className="row px-md-5">
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/586.html">Книги</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="moduli_smart.html">Образовательные модули</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/6951.html">Журналы</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/586.html?ref_type=2">Новинки</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/136738.html">Печатные книги</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/25405.html">Аудиоиздания</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/95074.html">Видеоресурсы</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137780.html">Научно-образовательные платформы (НОПы)</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/35446.html">Архивные фонды</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="https://profspo.ru/catalog/books/fpu-books" target="_blank">Федеральный перечень учебников</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">
                    <div className="row px-md-5">
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="https://datalib.ru/catalog/courses" target="_blank">SMART-курсы</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="https://datalib.ru/lectoriy" target="_blank">Лекторий</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-integration" role="tabpanel" aria-labelledby="v-pills-integration-tab" tabIndex="0">
                    <div className="row px-md-5">
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/133548.html"><span>Модуль бесшовной интеграции</span></a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="https://api.iprbooks.ru" target="_blank">IPR SMART API 2.0</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">
                    <div className="row px-md-5">
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137512.html">ЭБС IPR SMART</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137466.html">Платформа онлайн-обучения DataLIB</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137467.html">ЭОР «Русский как иностранный»</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137469.html">ЭР «PROFобразование»</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137470.html">Платформа ВКР СМАРТ</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137471.html">Мобильное приложение IPR SMART Mobile Reader</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/137472.html">Мобильное приложение для лиц с ОВЗ по зрению IPR BOOKS WV-Reader</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-info" role="tabpanel" aria-labelledby="v-pills-info-tab" tabIndex="0">
                    <div className="row px-md-5">
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/4.html">О компании</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/72362.html">Новости</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/68943.html">Адаптивные технологии</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/132587.html">Шаблоны и документы</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/1184.html">Контакты</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/92965.html">Инструкции</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/132588.html">Часто задаваемые вопросы</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-holders" role="tabpanel" aria-labelledby="v-pills-info-tab" tabIndex="0">
                    <div className="row px-md-5">
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/1733.html">Авторам</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/557.html">Издательствам</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/6390.html">Сотрудничество для кафедр</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="link-tab">
                          <a href="/50860.html">Конкурсы и продвижение изданий</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-mobile" role="tabpanel" aria-labelledby="v-pills-mobile-tab" tabIndex="0">
                    <div className="row px-md-5 qr-header">
                      <div className="col-xl-6 text-center">
                        <a href="https://play.google.com/store/apps/details?id=ru.iprbooks.iprbooksmobile&hl=ru&gl=US&pli=1" target="_blank">
                          <img src="/assets/templates/iprsmart2023/img/main/qr-code-android.gif" alt="" />
                          <span className="text-center"><br />Android</span>
                        </a>
                      </div>
                      <div className="col-xl-6 text-center">
                        <a href="https://apps.apple.com/ru/app/ipr-smart-mobile-reader/id1322302612" target="_blank">
                          <img src="/assets/templates/iprsmart2023/img/main/qr-code-ios.gif" alt="" />
                          <span className="text-center"><br />IOS</span>
                        </a>
                      </div>
                    </div>
                  </div>
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
