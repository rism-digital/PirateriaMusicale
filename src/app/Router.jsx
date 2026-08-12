import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import JsonSearch from './pages/JsonSearch.jsx';
import JsonBrowse from './pages/JsonBrowse.jsx';
import StaticHtml from './pages/StaticHtml.jsx';
import Index from './pages/Index.jsx';

import AnalysisState from './context/AnalysisState.jsx';
import CustomState from './context/CustomState.jsx';

const Book = lazy(() => import('./pages/Book.jsx'));

const Router = () => (
    <BrowserRouter>
        <AnalysisState>
            <CustomState>
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/page/:filename" element={<StaticHtml />} />
                        <Route path="/" element={<Index />} />
                        <Route path="/search" element={<JsonSearch />} />
                        <Route path="/browse" element={<JsonBrowse />} />
                        <Route path="/book" element={<Book />} />
                    </Routes>
                </Suspense>
            </CustomState>
        </AnalysisState>
    </BrowserRouter>
);

export default Router;
