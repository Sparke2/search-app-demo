import React from 'react';
import Breadcrumb from '../components/core/Breadcrumb';
import SearchForm from '../components/SearchForm';
import ResultsAccordion from '../components/core/ResultsAccordion';

import CheckboxFilterShow from '../components/core/filter/CheckboxFilterShow';
import {AppLayout} from '../layout/AppLayout';
import {ResponsiveFilters} from "../components/filter/ui/ResponsiveFilters";
import {useSyncParam} from "../hooks/useSyncParam";

function Home() {
  useSyncParam()
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
            <div className="row mt-sm-1 g-4">
              <div className="col-lg-9 result-field order-lg-1 order-2 pe-sm-4">
                <SearchForm/>
                <CheckboxFilterShow/>
                <ResultsAccordion/>
              </div>
              <ResponsiveFilters/>
            </div>
          </div>
        </div>
      </div>
    </main>
    </AppLayout>
  );
}

export default Home;
