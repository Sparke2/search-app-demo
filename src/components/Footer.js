import React from 'react';
import tg from "../img/footer/tg.svg";
import vk from "../img/footer/vk.svg";
import youtube from "../img/footer/youtube.svg";

function Footer() {
    return (
        <footer>
            <div className="py-5">
                <div className="container">
                    <div className="row py-4 g-4">
                        <div className="col-xl-4 col-md-6">
                            <p>База данных «Цифровая библиотека IPRsmart (IPRsmart ONE)» зарегистрирована в Федеральной службе по интеллектуальной собственности 10 февраля 2022 г.</p>
                            <p className="text-white fw-600">Свидетельство о государственной регистрации № 2022620333.</p>
                            <p>Программа для ЭВМ «Автоматизированная система управления Цифровой библиотекой IPRsmart» зарегистрирована в Федеральной службе по интеллектуальной собственности 27 августа 2021 г.</p>
                            <p className="text-white fw-600">Свидетельство о государственной регистрации № 2021664034.</p>
                            <p className="text-white fw-600">© Общество с ограниченной ответственностью<br/> Компания «Ай Пи Ар Медиа»</p>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <p>ООО Компания «Ай Пи Ар Медиа» включена в Реестр аккредитованных IT-компаний, на основании РЕШЕНИЯ о предоставлении государственной аккредитации организации, осуществляющей деятельность в области информационных технологий от 11.03.2022 г. № АО-20 220 310-3 775 333 561-3, выданного МИНИСТЕРСТВОМ ЦИФРОВОГО РАЗВИТИЯ, СВЯЗИ И МАССОВЫХ КОММУНИКАЦИЙ РОССИЙСКОЙ ФЕДЕРАЦИИ.</p>
                            <p>16+</p>
                            <p className="mb-0">Программа для ЭВМ зарегистрирована в Едином реестре российских программ для электронно-вычислительных машин и баз данных <span>https://reestr.digital.gov.ru</span>, запись в реестре <span>№ 13 509 от 11.05.2022 г.</span> произведена на основании поручения Министерства цифрового развития, связи и массовых коммуникаций Российской Федерации от 11.05.2022 г. по протоколу заседания экспертного совета от <span>29.04.2022 № 570пр.</span></p>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6">
                            <p className="mb-1 text-white">adm@iprmedia.ru</p>
                            <p className="text-white fs-20 mb-1">8 800 555-22-35</p>
                            <p className="text-white">Звонок бесплатный для всех регионов России</p>
                            <p className="m-0">143405, Московская область,</p>
                            <p className="m-0"> г.о. Красногорск, г. Красногорск,</p>
                            <p className="m-0"> ш. Ильинское, д. 1А,</p>
                            <p className="m-0"> помещ. 17,6/ком. 5</p>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6">
                            <div className="mb-4">
                                <a className="pe-1" href="https://www.iprbookshop.ru/getsharelink?link_id=1" target="_blank" title="Vkontakte">
                                    <img src={vk} alt=""/>
                                </a>
                                <a className="px-1" href="https://www.iprbookshop.ru/getsharelink?link_id=4" target="_blank" title="Youtube">
                                    <img src={youtube} alt=""/>
                                </a>
                                <a className="px-1" href="https://www.iprbookshop.ru/getsharelink?link_id=5" target="_blank" title="Telegram">
                                    <img src={tg} alt=""/>
                    
                                </a>
                                <a className="px-1" href="https://www.iprbookshop.ru/getsharelink?link_id=6" target="_blank" title="Telegram">
                                    <img src={tg} alt=""/>
                                </a>
                            </div>
                            <p className="mb-2"><a className="fw-600" href="/user_agreement.html">Пользовательское соглашение</a></p>
                            <p className="mb-2"><a className="fw-600" href="/101619.html">Политика конфиденциальности</a></p>
                            <p><a className="fw-600" href="/sveden/common">Сведения об организации</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;