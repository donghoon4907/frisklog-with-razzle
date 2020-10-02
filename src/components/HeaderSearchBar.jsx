import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "../context";
import { HIDE_SEARCH_BAR } from "../context/action";
import Input from "./Input";
import { Label } from "./Form";

const SearchForm = styled.form`
    position: relative;
    margin: 0 auto;
    width: 500px;

    ${(props) => props.theme.media.tablet} {
        width: calc(100% - 2rem);
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;

const SearchInput = styled(Input)`
    background: ${(props) => props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    text-align: center;
    position: relative;

    &::placeholder {
        opacity: 0.8;
        font-weight: 200;
    }
`;

/**
 * * 검색 바 컴포넌트
 *
 * @Component
 * @author frisk
 */
const HeaderSearchBar = () => {
    /**
     * history 객체 활성화
     */
    const history = useHistory();
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 검색어 상태 관리 모듈 활성화
     */
    const [searchKeyword, setSearchKeyword] = useState("");
    /**
     * search input element
     */
    const $search = useRef(null);
    /**
     * 검색어 변경 핸들러
     */
    const handleChangeSearchKeyword = useCallback((e) => {
        setSearchKeyword(e.target.value);
    }, []);
    /**
     * 검색 요청 핸들러
     */
    const handleSearchSubmit = useCallback(
        (e) => {
            e.preventDefault();
            /**
             * 검색어 입력을 안한 경우
             */
            if (!searchKeyword) {
                return alert("검색어를 입력하세요");
            }
            /**
             * 페이지 이동
             */
            history.push(`/search/${searchKeyword}`);
            /**
             * 검색바 숨기기
             */
            dispatch({
                type: HIDE_SEARCH_BAR
            });
        },
        [searchKeyword]
    );
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        /**
         * 검색창 포커싱
         */
        $search.current.focus();
    }, []);

    return (
        <SearchForm onSubmit={handleSearchSubmit}>
            <Label htmlFor="search" val={searchKeyword}>
                검색어를 입력하세요.
            </Label>
            <Wrapper>
                <SearchInput
                    placeholder="검색어를 입력하세요."
                    name="search"
                    value={searchKeyword}
                    onChange={handleChangeSearchKeyword}
                    autoComplete="off"
                    ref={$search}
                />
            </Wrapper>
        </SearchForm>
    );
};

export default HeaderSearchBar;
