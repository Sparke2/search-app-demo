import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from "./shared/lib/react-query";
function App() {
  return (
      <QueryClientProvider client={queryClient}>
  <Router>
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  </Router>
        <ReactQueryDevtools/>
      </QueryClientProvider>
  );
}

export default App;
