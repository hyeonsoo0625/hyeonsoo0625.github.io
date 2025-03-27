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
const CV = lazy(() => import("@/pages/cv/CVPage"));
const NLP = lazy(() => import("@/pages/nlp/NLPPage"));
const MultiModal = lazy(() => import("@/pages/mm/MultiModalPage"));
const CS = lazy(() => import("@/pages/cs/CSPage"));
const Post = lazy(() => import("@/pages/templete/PostTemplete"));
const PRIVATE = lazy(() => import("@/pages/private/PrivatePage"));
const TRANSLATE = lazy(() => import("@/pages/nlp/translate/TranslatePage"));

const PageRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <RootRouter>
                <AppStyles />
                <Routes>
                    <Route path={PAGE_URL.HOME} element={<Home />} />
                    <Route path={PAGE_URL.CV} element={<CV />} />
                    <Route path={PAGE_URL.NLP} element={<NLP />} />
                    <Route path={PAGE_URL.MULTIMODAL} element={<MultiModal />} />
                    <Route path={PAGE_URL.CS} element={<CS />} />
                    <Route path={PAGE_URL.POST} element={<Post />} />
                    <Route path={PAGE_URL.PRIVATE} element={<PRIVATE />} />
                    <Route path={PAGE_URL.TRANSLATE} element={<TRANSLATE />} />
                </Routes>
            </RootRouter>
        </Suspense>
    )
}

export default PageRouter;