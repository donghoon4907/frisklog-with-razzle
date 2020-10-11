import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "../context";
import { EXPAND_NAVIGATION, CONTRACT_NAVIGATION } from "../context/action";
import { COLLAPSE_KEY, getStorage, setStorage } from "../lib/state";
import { Collapse } from "../assets/icon";
import RecommandUserList from "./RecommandUserList";
import RecommandCategoryList from "./RecommandCategoryList";

/**
 * 공통 네비게이션 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Nav = () => {
    const displayName = "fr-nav";
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isCollapseNav } = useSelector();
    /**
     * 확장 아이콘 클릭 이벤트
     */
    const handleClickCollapse = useCallback(() => {
        if (isCollapseNav === "expand") {
            setStorage(COLLAPSE_KEY, "contract");
            dispatch({
                type: CONTRACT_NAVIGATION
            });
        } else {
            setStorage(COLLAPSE_KEY, "expand");
            dispatch({
                type: EXPAND_NAVIGATION
            });
        }
    }, [isCollapseNav]);
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        const isCollapse = getStorage(COLLAPSE_KEY);
        /**
         * 로컬 상태 업데이트
         */
        if (isCollapse === "expand") {
            dispatch({
                type: EXPAND_NAVIGATION
            });
        }
    }, []);

    return (
        <nav
            id="nav"
            className={`${displayName} ${displayName}--state-${isCollapseNav}`}
        >
            <div
                className={`${displayName}__header justify-content-${
                    isCollapseNav === "expand" ? "between" : "center"
                }`}
            >
                {isCollapseNav === "expand" && <h5>추천 블로그</h5>}
                <button
                    aria-pressed={isCollapseNav === "expand"}
                    aria-expanded={isCollapseNav === "expand"}
                    aria-controls="nav"
                    aria-label="Collapse"
                    onClick={handleClickCollapse}
                >
                    <Collapse />
                    <span className="a11y-hidden">
                        {isCollapseNav === "expand"
                            ? "네비게이션 축소"
                            : "네비게이션 확장"}
                    </span>
                </button>
            </div>
            <div className={`${displayName}__body`}>
                <RecommandUserList />
                <hr />
                {isCollapseNav === "expand" && (
                    <h5 className="mt-3 mb-1">추천 카테고리</h5>
                )}
                <RecommandCategoryList />
            </div>
        </nav>
    );
};

export default Nav;
