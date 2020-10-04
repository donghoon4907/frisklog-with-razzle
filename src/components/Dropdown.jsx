import React from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { More } from "../assets/icon";

const Container = styled.div`
    position: relative;

    & #${(props) => props.id} {
        position: absolute;
        top: -10px;
        right: 0;
        opacity: 0;
        z-index: 1;
        padding: 0;
        width: ${(props) => props.size}px;
        height: ${(props) => props.size}px;
    }

    .dropdown-menu {
        padding: 0;
    }

    .dropdown-divider {
        margin: 0;
    }

    & svg {
        fill: gray;
        cursor: pointer;
        position: absolute;
        top: -10px;
        right: -5px;
    }
`;

/**
 * * 공통 드롭다운 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.id        드롭다운 ID
 * @param props.disabled  드롭다운 사용 여부
 * @param props.list      드롭다운 요소
 * @param props.size      드롭다운 아이콘 크기
 */
const CommonDropdown = ({ id, disabled, list, size = 24 }) => (
    <Container id={id} size={size}>
        <Dropdown alignRight={true}>
            <Dropdown.Toggle id={id} />
            {!disabled && <More style={{ width: size, height: size }} />}
            <Dropdown.Menu>
                {list.map(({ type, handler, text }, idx) => {
                    if (type === "item") {
                        return (
                            <Dropdown.Item
                                onClick={handler}
                                key={`dropdown_${id}_${idx}`}
                            >
                                {text}
                            </Dropdown.Item>
                        );
                    } else if (type === "divider") {
                        return (
                            <Dropdown.Divider key={`dropdown_${id}_${idx}`} />
                        );
                    } else {
                        throw new Error("Unused type in Dropdown");
                    }
                })}
            </Dropdown.Menu>
        </Dropdown>
    </Container>
);
export default CommonDropdown;
