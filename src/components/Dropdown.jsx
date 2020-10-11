import React from "react";
import { Dropdown } from "react-bootstrap";
import { More } from "../assets/icon";

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
    <div className="fr-dropdown">
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
    </div>
);
export default CommonDropdown;
