import React, { forwardRef } from "react";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.bgColor};
  width: 100%;
  height: 35px;
  padding: 0px 15px;
  font-size: 12px;

  &:focus {
    outline: none;
  }
`;

/**
 * * 공통 input 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Input = forwardRef((props, ref) => <Container ref={ref} {...props} />);

export default Input;
