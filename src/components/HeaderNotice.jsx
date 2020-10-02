import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "../context";
import { SHOW_NOTICE_MODAL } from "../context/action";
import { GET_NOTICES } from "../graphql/query/notice";
import { Notice } from "../assets/icon";
import Query from "./Query";

const Contianer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px !important;

    & u {
        margin-left: 5px;
        cursor: pointer;
    }

    ${(props) => props.theme.media.phone} {
        display: none;
    }
`;

/**
 * 공지사항 컴포넌트
 *
 * @Component
 * @author frisk
 */
const HeaderNotice = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 클릭 핸들러
     */
    const handleClick = useCallback(({ title, description, id }) => {
        dispatch({
            type: SHOW_NOTICE_MODAL,
            action: "readonly",
            id,
            actionText: "",
            title,
            description
        });
    }, []);

    return (
        <Contianer>
            <Query
                query={GET_NOTICES}
                variables={{
                    first: 1,
                    orderBy: "createdAt_DESC"
                }}
            >
                {({ data: { notices } }) =>
                    notices.map((notice) => (
                        <div key={notice.id}>
                            <Notice />
                            <u
                                onClick={() => handleClick(notice)}
                                aria-haspopup="true"
                                role="link"
                                tabIndex="0"
                            >
                                {notice.title}
                            </u>
                        </div>
                    ))
                }
            </Query>
        </Contianer>
    );
};

export default HeaderNotice;
