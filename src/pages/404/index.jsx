import React from "react";
import styled from "styled-components";
import Meta from "../../components/Meta";
import BtnLink from "../../components/BtnLink";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding: 20px;
`;

const Wrapper = styled.div`
    position: relative;
    border: none;
    margin: 0;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 540px;
    box-shadow: 0 13px 23px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border-top: 4px solid #358597;
    height: 300px;
    background: white;
    padding: 30px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const SubTitle = styled.h3`
    font-size: 20px;
    font-weight: 500;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 30px;
    width: 100px;
`;

/**
 * * 404 화면 컴포넌트
 *
 * @author frist
 */
const ErrorPage = () => (
    <Container>
        <Meta
            title="페이지를 찾을 수 없습니다."
            description="page is not found in frisklog"
        />
        <Wrapper>
            <Title>페이지를 찾을 수 없습니다.</Title>
            <SubTitle>404, Not Found</SubTitle>
            <ButtonWrapper>
                <BtnLink to="/">돌아가기</BtnLink>
            </ButtonWrapper>
        </Wrapper>
    </Container>
);

export default ErrorPage;
