import React from "react";
import styled from "styled-components";

const Container = styled.button`
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

    &:hover {
        opacity: 0.8;
    }
`;

/**
 * * 공통 버튼 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.onClick 클릭 핸들러
 * @param props.type    버튼 타입
 */
const Button = ({ onClick, type = "button", children }) => (
    <Container onClick={onClick} type={type} aria-label="Handler">
        {children}
    </Container>
);
export default Button;
