import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled(Link)`
    display: block;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border: ${(props) => props.theme.boxBorder};
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    & img {
        position: absolute;
        width: 100%;
        height: 100%;
    }
`;

/**
 * * 공통 프로필 사진 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.userId  사용자 ID
 * @param props.size    프로필 사진 크기
 * @param props.src     이미지 자원
 */
const Avatar = ({ userId, size, src }) => (
    <Container size={size} role="button" to={`/user/${userId}`}>
        <img src={src} alt="avatar" />
    </Container>
);

export default Avatar;
