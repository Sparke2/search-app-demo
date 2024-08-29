import React from 'react';
import Breadcrumb from '../components/Breadcrumb';
import SearchForm from '../components/SearchForm';
import ResultsAccordion from '../components/ResultsAccordion';
import Filters from '../components/Filters';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CheckboxFilterShow from '../components/CheckboxFilterShow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <>
    <Header/>
    <main>
      <div id="search-page" className="bg-page">
        <div className="container py-4">
          <Breadcrumb />
          <div className="bg-main-screen">
            <div className='row g-4'>
              <div className='col-lg-9 d-flex'>
                <h1 className='my-auto'>Поиск по цифровой библиотеке</h1>
              </div>
              <div className='col-lg-3'>
                <p className='mb-2 ps-3'>
                  <a href='#'>Искать по коллекциям  <FontAwesomeIcon icon={faArrowRightLong} /></a>
                </p>
                <p className='m-0 ps-3'>
                  <a href='#'>Искать по каталогам <FontAwesomeIcon icon={faArrowRightLong} /></a>
                </p>
              </div>
            </div>
            <div className="row mt-1 g-4">
              <div className="col-lg-9">
                <SearchForm />
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
    <Footer/>
    </>
  );
}

export default Home;
