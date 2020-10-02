import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "../context";
import ProfileBtn from "./ProfileBtn";
import SearchBtn from "./SearchBtn";
import HeaderSearchBar from "./HeaderSearchBar";
import CreatePostBtn from "./CreatePostBtn";
import HeaderNotice from "./HeaderNotice";

const Container = styled.header`
    height: 3rem;
    background: white;
    border-bottom: ${(props) => props.theme.boxBorder};
    box-shadow: ${(props) => props.theme.headerShadow};
    flex-shrink: 0;
    z-index: 1000;

    svg {
        fill: ${(props) => props.theme.blueColor};
    }
`;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 10px;
    position: relative;
`;

const Column = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    & > button {
        margin-left: 10px;
        cursor: pointer;
    }
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
`;

const SearchWrapper = styled.div`
    border: none;
    background: white;
    position: absolute;
    top: calc(3rem - 3px);
    left: 0;
    width: 100%;
    height: auto;
    padding: 10px;
    box-shadow: ${(props) => props.theme.headerShadow};
`;

/**
 * * 공통 헤더 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Header = () => {
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isShowSearchBar } = useSelector();

    return (
        <Container>
            <Wrapper>
                <Column>
                    <Link to="/" role="button">
                        <Logo
                            src="https://frisk.s3.ap-northeast-2.amazonaws.com/upload/4424b841-b125-4b9a-bcdf-a507ef751bed"
                            alt="logo"
                        />
                    </Link>
                    <HeaderNotice />
                </Column>
                <Column>
                    <SearchBtn />
                    <CreatePostBtn />
                    <ProfileBtn />
                </Column>
            </Wrapper>
            {isShowSearchBar && (
                <SearchWrapper>
                    <HeaderSearchBar />
                </SearchWrapper>
            )}
        </Container>
    );
};

export default Header;
