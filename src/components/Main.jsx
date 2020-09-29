import React from "react";
import styled from "styled-components";
import { useSelector } from "../context";

const Container = styled.main`
  flex: 1;
  padding: 2rem;
  padding-top: 3rem;
  margin-left: ${props => (props.collapse === "expand" ? 230 : 60)}px;
  float: right;

  ${props => props.theme.media.tablet} {
    margin-left: 0;
  }
`;

/**
 * 공통 main 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Main = ({ children }) => {
  /**
   * 로컬 상태 감시 모듈 활성화
   */
  const { isCollapseNav } = useSelector();

  return <Container collapse={isCollapseNav}>{children}</Container>;
};

export default Main;
