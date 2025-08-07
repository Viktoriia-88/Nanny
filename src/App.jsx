import { Route, Routes } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader.jsx';
import PrivateRoute from './PrivateRoute.jsx';

// const Layout = lazy(() => import("./components/Layout/Layout.jsx"))
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const NanniesPage = lazy(() => import("./pages/NanniesPage/NanniesPage.jsx"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage.jsx"));

const App = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* <Route path='/' element={<Layout />} > */}
                        <Route index element={<HomePage />} />
                        <Route path='/nannies' element={<NanniesPage />} />
                        <Route path='/favorites'
                            element={
                                <PrivateRoute>
                                    <FavoritesPage />
                                </PrivateRoute>
                            }
                        />
                    {/* </Route> */}
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
