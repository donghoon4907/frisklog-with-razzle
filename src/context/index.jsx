import React, { useReducer, useContext, createContext } from "react";
import reducer from "./reducer";

const Context = createContext(null);

const DispatchContext = createContext(null);

/**
 * * 로컬 상태
 *
 * @author frisk
 * @property id                 - 사용자 ID
 * @property nickname           - 사용자 별칭
 * @property email              - 사용자 이메일
 * @property avatar             - 사용자 프로필 사진
 * @property isMaster           - 운영자 여부
 * @property isShowNoticeModal  - 공지사항 팝업 보이기 여부
 * @property isShowAddPostModal - 게시물 추가 팝업 보이기 여부
 * @property isShowSearchBar    - 검색바 보이기 여부
 * @property isShowFilterBar    - 검색 필터 보이기 여부
 * @property isShowLoginModal   - 로그인 팝업 보이기 여부
 * @property activePost         - 선택한 게시물 정보
 * @property activeNotice       - 선택한 공지사항 정보
 * @property searchPostOption   - 검색 옵션
 * @property isCollapseNav      - 네비게이션 확장상태 (expand, contract)
 * @property isMobile          - 모바일 환경 여부
 */
const initialState = {
    id: null,
    nickname: null,
    email: null,
    avatar: null,
    isMaster: false,
    isShowNoticeModal: false,
    isShowAddPostModal: false,
    isShowSearchBar: false,
    isShowFilterBar: false,
    isShowLoginModal: false,
    isCollapseNav: "expand",
    isMobile: false,
    activePost: {
        id: "",
        title: "",
        description: ""
    },
    activeNotice: {
        id: "",
        action: "wait",
        actionText: "비활성화",
        title: "",
        description: ""
    },
    feedPostOption: {},
    searchPostOption: {
        first: 30,
        orderBy: "createdAt_DESC",
        query: undefined,
        category: undefined,
        userId: undefined
    }
};

/**
 * * 로컬 상태 제공 컴포넌트
 */
export function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </Context.Provider>
    );
}

/**
 * * Hooks - 로컬 상태 감시 모듈
 */
export function useSelector() {
    const state = useContext(Context);

    if (!state) {
        throw new Error("Provider is not defined");
    }

    return state;
}

/**
 * * Hooks - 로컬 상태 변경 모듈
 */
export function useDispatch() {
    const dispatch = useContext(DispatchContext);

    if (!dispatch) {
        throw new Error("Provider is not defined");
    }

    return dispatch;
}
