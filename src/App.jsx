import React, { useCallback, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import loadable from "@loadable/component";
import Header from "./components/Header";
import Nav from "./components/Nav";
import AuthModal from "./components/modal/Auth";
import SetNoticeModal from "./components/modal/SetNoticeContainer";
import { useDispatch, useSelector } from "./context";
import { CONTRACT_NAVIGATION, SET_ME, SET_IS_MOBILE } from "./context/action";
import { ME } from "./graphql/query/user";
import { COLLAPSE_KEY, setStorage } from "./lib/state";

import "github-markdown-css/github-markdown.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "./sass/main.scss";

const Feed = loadable(() => import("./pages/feed"));
const SearchPostPage = loadable(() => import("./pages/search/SearchPostPage"));
const SearchCategoryPage = loadable(() =>
    import("./pages/search/SearchCategoryPage")
);
const Post = loadable(() => import("./pages/post"));
const CreatePostPage = loadable(() => import("./pages/post/CreatePostPage"));
const UpdatePostPage = loadable(() => import("./pages/post/UpdatePostPage"));
const User = loadable(() => import("./pages/user"));
const NoMatch = loadable(() => import("./pages/404"));

const App = () => {
    const displayName = "fr-app";
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const {
        isShowLoginModal,
        isShowNoticeModal,
        isCollapseNav
    } = useSelector();
    /**
     * 사용자 정보 로드
     */
    useQuery(ME, {
        ssr: false,
        onCompleted: ({ me }) => {
            if (me) {
                const { id, nickname, email, avatar, isMaster } = me;
                dispatch({
                    type: SET_ME,
                    id,
                    nickname,
                    email,
                    avatar,
                    isMaster
                });
            }
        }
    });
    /**
     * 리사이징 핸들러
     */
    const handleResize = useCallback(
        (e) => {
            const { innerWidth } = e.target;
            /**
             * 네비게이션이 축소된 경우
             */
            if (isCollapseNav === "contract") {
                return;
            }

            if (innerWidth <= 922) {
                /**
                 * 네비게이션 축소
                 */
                dispatch({
                    type: CONTRACT_NAVIGATION
                });
                setStorage(COLLAPSE_KEY, "contract");
            }
            /**
             * 모바일 여부 설정
             */
            if (innerWidth <= 576) {
                dispatch({
                    type: SET_IS_MOBILE,
                    payload: true
                });
            } else {
                dispatch({
                    type: SET_IS_MOBILE,
                    payload: false
                });
            }
        },
        [isCollapseNav]
    );
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        /**
         * 리사이징 이벤트 바인딩
         */
        window.addEventListener("resize", handleResize);

        const { innerWidth } = window;
        /**
         * 모바일 여부 설정
         */
        if (innerWidth <= 576) {
            dispatch({
                type: SET_IS_MOBILE,
                payload: true
            });
        }
        /**
         * 리사이징 이벤트 언바인딩
         */
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`${displayName}__container`}>
            <Header />
            <section className={`${displayName}__section`}>
                <Nav />
                <main className={`${displayName}`} id="main">
                    <Switch>
                        <Route exact path="/" component={Feed} />
                        <Route
                            exact
                            path="/create_post"
                            component={CreatePostPage}
                        />
                        <Route
                            exact
                            path="/update_post/:id"
                            component={UpdatePostPage}
                        />
                        <Route exact path="/post/:id" component={Post} />
                        <Route exact path="/user/:id" component={User} />
                        <Route
                            exact
                            path="/search/:query"
                            component={SearchPostPage}
                        />
                        <Route
                            exact
                            path="/category/:content"
                            component={SearchCategoryPage}
                        />
                        <Route component={NoMatch} />
                    </Switch>
                </main>
                {isShowLoginModal && <AuthModal />}
                {isShowNoticeModal && <SetNoticeModal />}
            </section>
        </div>
    );
};

export default App;
