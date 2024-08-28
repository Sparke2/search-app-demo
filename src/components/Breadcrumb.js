import React from 'react';

function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="https://www.iprbookshop.ru">Главная</a>
        </li>
        <li className="breadcrumb-item">Библиотека</li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
