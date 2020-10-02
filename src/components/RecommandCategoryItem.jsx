import React, { useState, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { Overlay } from "react-bootstrap";
import { useSelector } from "../context";
import BtnLink from "./BtnLink";

const Title = styled.h6`
    width: 150px;
    font-weight: 500;
    height: 40px;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
    display: flex;
    align-items: center;
`;

const BtnWrapper = styled.div`
    width: 100%;
    height: 40px;
    position: relative;
    margin-top: 10px;
    overflow: hidden;
`;
/**
 * * 추천 카테고리 랜더링 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.content 카테고리명
 *
 */
const RecommandCategoryItem = ({ content }) => {
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isCollapseNav } = useSelector();
    /**
     * 튤팁 보이기 상태 모듈 활성화
     */
    const [show, setShow] = useState(false);
    /**
     * btn element
     */
    const $btn = useRef(null);
    /**
     * btn mouse enter 핸들러
     */
    const handleEnterBtn = useCallback(() => {
        if (isCollapseNav === "contract") {
            setShow(true);
        }
    }, [isCollapseNav]);
    /**
     * btn mouse leave 핸들러
     */
    const handleLeaveBtn = useCallback(() => {
        if (isCollapseNav === "contract") {
            setShow(false);
        }
    }, [isCollapseNav]);

    return (
        <BtnWrapper
            ref={$btn}
            onMouseEnter={handleEnterBtn}
            onMouseLeave={handleLeaveBtn}
        >
            <BtnLink to={`/category/${content}`}>
                {isCollapseNav === "contract"
                    ? content.substring(0, 1)
                    : content}
            </BtnLink>
            <Overlay target={$btn.current} show={show} placement="right">
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: "white",
                            padding: "2px 10px",
                            borderRadius: 3,
                            zIndex: 3,
                            left: 12,
                            boxShadow:
                                "0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1)"
                        }}
                    >
                        <div>
                            <Title>{content}</Title>
                        </div>
                    </div>
                )}
            </Overlay>
        </BtnWrapper>
    );
};

export default memo(RecommandCategoryItem);
