import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useApolloClient } from "@apollo/client";
import RecommandUserItem from "./RecommandUserItem";
import { GET_USERS } from "../graphql/query/user";

const Container = styled.div`
    height: 500px;
`;

/**
 * 추천 사용자 목록 컴포넌트
 *
 * @Component
 * @author frisk
 */
const RecommandUserList = () => {
    /**
     * 아폴로 클라이언트 활성화
     */
    const client = useApolloClient();
    /**
     * 추천 사용자 목록
     */
    const [recommandUsers, setRecommandUsers] = useState([]);
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        /**
         * 페이지 캐시 로드
         */
        const data = client.readQuery({
            query: GET_USERS,
            variables: {
                first: 10,
                orderBy: "postCount_DESC"
            }
        });
        /**
         * 추천 사용자 로드
         */
        setRecommandUsers(data.users);
    }, []);
    return (
        <Container>
            {recommandUsers.map((user) => (
                <RecommandUserItem key={user.id} {...user} />
            ))}
        </Container>
    );
};

export default memo(RecommandUserList);
