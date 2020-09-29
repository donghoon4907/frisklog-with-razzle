import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "../context";
import { EXPAND_NAVIGATION, CONTRACT_NAVIGATION } from "../context/action";
import { COLLAPSE_KEY, getStorage, setStorage } from "../lib/state";
import { Collapse } from "../icons";
import RecommandUserList from "./RecommandUserList";

const Container = styled.div`
    background: #efeff1;
    width: ${(props) => (props.collapse === "expand" ? 230 : 60)}px;
    height: calc(100vh - 3rem);
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 8px;
    position: fixed;
    top: 3rem;

    & svg {
        transform: rotate(
            ${(props) => (props.collapse === "expand" ? 0 : 180)}deg
        );
    }

    ${(props) => props.theme.media.desktop} {
        display: none;
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: ${(props) =>
        props.collapse === "expand" ? "space-between" : "center"};
    align-items: center;
    padding-top: 10px;
    padding-bottom: 1rem;

    & > h6 {
        margin-bottom: 0px;
        display: ${(props) => (props.collapse === "expand" ? "block" : "none")};
    }
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
        <Container collapse={isCollapseNav}>
            <Top collapse={isCollapseNav}>
                <h6>추천 블로그</h6>
                <div onClick={handleClickCollapse}>
                    <Collapse />
                </div>
            </Top>
            <RecommandUserList />
        </Container>
    );
};

export default Nav;
