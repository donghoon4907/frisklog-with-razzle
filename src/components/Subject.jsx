import React from "react";
import styled from "styled-components";

const Container = styled.h1`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${(props) => props.activeBorder && `2px solid gray`};
    font-weight: bold;
    padding: 5px;

    & svg {
        width: 20px;
        height: 20px;
    }

    ${(props) => props.theme.media.phone} {
        font-size: 24px;
    }
`;

/**
 * 공통 subject 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.activeBorder 테두리 유무
 */
const Subject = ({ children, activeBorder }) => (
    <Container activeBorder={activeBorder}>{children}</Container>
);

export default Subject;
