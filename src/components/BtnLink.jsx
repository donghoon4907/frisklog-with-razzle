import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled(Link)`
    display: block;
    height: 100%;
    width: 100%;
    border: 0;
    border-radius: ${(props) => props.theme.borderRadius};
    color: white;
    font-weight: 600;
    background: ${(props) => props.theme.blueColor};
    text-align: center;
    padding: 7px;
    font-size: 14px;
    border: 1px solid ${(props) => props.theme.blueColor};
    text-decoration: none !important;

    &:hover {
        opacity: 0.8;
        color: white;
    }
`;

/**
 * * 공통 버튼 링크 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.to 이동할 url
 */
const BtnLink = ({ to, children }) => (
    <Container to={to} role="button">
        {children}
    </Container>
);
export default BtnLink;
