import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    text-align: center;
    padding: 3rem;
`;

/**
 * Common no result component
 *
 * @Component
 * @author frisk
 */
const NoData = () => (
    <Container>
        <h4>검색 결과가 없습니다.</h4>
    </Container>
);

export default NoData;
