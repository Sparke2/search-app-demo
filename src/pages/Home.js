import React from 'react';
import Breadcrumb from '../components/core/Breadcrumb';
import SearchForm from '../components/SearchForm';
import ResultsAccordion from '../components/core/ResultsAccordion';
import Filters from '../components/filter/Filters';

import CheckboxFilterShow from '../components/core/filter/CheckboxFilterShow';
import {AppLayout} from '../layout/AppLayout';
import {useSyncSortParam} from "../hooks/useSyncSortParam";

function Home() {
  useSyncSortParam()
  return (
    <AppLayout>
    <main>
      <div id="search-page" className="bg-page">
        <div className="container py-5">
          <Breadcrumb />
          <div className="bg-main-screen mt-4 mb-5">
            <div className='row g-4'>
              <div className='col-lg-9 d-flex'>
                <h1 className='my-auto'>Поиск по цифровой библиотеке</h1>
              </div>
              {/*<div className='col-lg-3'>*/}
              {/*  <p className='mb-2 ps-3'>*/}
              {/*    <a href='#'>Искать по коллекциям  <FontAwesomeIcon icon={faArrowRightLong} /></a>*/}
              {/*  </p>*/}
              {/*  <p className='m-0 ps-3'>*/}
              {/*    <a href='#'/>Искать по каталогам <FontAwesomeIcon icon={faArrowRightLong} /></a>*/}
              {/*  </p>*/}
              {/*</div>*/}
            </div>
            <div className="row mt-1 g-4">
              <div className="col-lg-9 result-field">
                <SearchForm />
                <CheckboxFilterShow />
                <ResultsAccordion />
              </div>
              <div className="col-lg-3 filter-field">
                  <Filters />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </AppLayout>
  );
}

export default Home;
