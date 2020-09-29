import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => props.activeBorder && `2px solid gray`};
  padding: 8px 5px;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;

  & svg {
    width: 20px;
    height: 20px;
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
