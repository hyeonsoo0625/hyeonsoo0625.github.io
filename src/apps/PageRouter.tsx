import { lazy, Suspense } from 'react';
import {
    BrowserRouter as RootRouter,
    Route,
    Routes,
} from 'react-router-dom';
import { Loading } from "@/entities";
import AppStyles from "./AppStyles";

import { PAGE_URL } from "@/shared";

const Home = lazy(() => import("@/pages/home/HomePage"));
const Model = lazy(() => import("@/pages/model/ModelPage"));
const CV = lazy(() => import("@/pages/cv/CVPage"));
const NLP = lazy(() => import("@/pages/nlp/NLPPage"));
const MultiModal = lazy(() => import("@/pages/mm/MultiModalPage"));

const PageRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RootRouter>
                <AppStyles />
                <Routes>
                    <Route path={PAGE_URL.HOME} element={<Home />} />
                    <Route path={PAGE_URL.MODEL} element={<Model />} />
                    <Route path={PAGE_URL.CV} element={<CV />} />
                    <Route path={PAGE_URL.NLP} element={<NLP />} />
                    <Route path={PAGE_URL.MULTIMODAL} element={<MultiModal />} />
                </Routes>
            </RootRouter>
        </Suspense>
    )
}

export default PageRouter;