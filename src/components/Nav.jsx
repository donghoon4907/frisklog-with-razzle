import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "../context";
import { EXPAND_NAVIGATION, CONTRACT_NAVIGATION } from "../context/action";
import { COLLAPSE_KEY, getStorage, setStorage } from "../lib/state";
import { Collapse } from "../assets/icon";
import RecommandUserList from "./RecommandUserList";
import RecommandCategoryList from "./RecommandCategoryList";

const Container = styled.nav`
    background: #efeff1;
    width: ${(props) => (props.collapse === "expand" ? 230 : 60)}px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;
    z-index: 10;
    flex-shrink: 0;

    ${(props) => props.theme.media.desktop} {
        display: none;
    }

    & svg {
        transform: rotate(
            ${(props) => (props.collapse === "expand" ? 0 : 180)}deg
        );
    }

    & h6 {
        margin-top: 10px;
        display: ${(props) => (props.collapse === "expand" ? "block" : "none")};
    }

    & hr {
        display: ${(props) => (props.collapse === "expand" ? "none" : "block")};
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: ${(props) =>
        props.collapse === "expand" ? "space-between" : "center"};
    align-items: center;
`;

/**
 * 공통 네비게이션 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Nav = () => {
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
        if (isCollapse === "contract") {
            dispatch({
                type: CONTRACT_NAVIGATION
            });
        }
    }, []);

    return (
        <Container collapse={isCollapseNav} id="nav">
            <Top collapse={isCollapseNav}>
                <h6>추천 블로그</h6>
                <button
                    type="button"
                    aria-pressed={isCollapseNav === "expand"}
                    aria-expanded={isCollapseNav === "expand"}
                    aria-controls="nav"
                    onClick={handleClickCollapse}
                >
                    <Collapse />
                    <span className="a11y-hidden">
                        {isCollapseNav === "expand"
                            ? "네비게이션 축소"
                            : "네비게이션 확장"}
                    </span>
                </button>
            </Top>
            <RecommandUserList />
            <hr />
            <h6>추천 카테고리</h6>
            <RecommandCategoryList />
        </Container>
    );
};

export default Nav;
