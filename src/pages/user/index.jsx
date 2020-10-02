import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { GET_USER } from "../../graphql/query/user";
import Meta from "../../components/Meta";
import Avatar from "../../components/Avatar";
import Subject from "../../components/Subject";
import { Select } from "../../components/Form";
import PostList from "../../components/PostList";
import Query from "../../components/Query";
import searchOptions from "../../json/search_options.json";

const Container = styled.div`
    padding: 3rem;
`;

const InfoWrapper = styled.div`
    margin-bottom: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > * {
        margin-right: 10px;
    }
`;

const UserMetaWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

/**
 * 사용자 상세 화면 컴포넌트
 * @Page
 * @author frist
 */
const User = ({
    match: {
        params: { id }
    }
}) => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const [orderBy, setOrderBy] = useState("createdAt_DESC");
    /**
     * 정렬 변경 핸들러
     */
    const handleChangeOrderBy = useCallback((e) => {
        setOrderBy(e.target.value);
    }, []);

    return (
        <div>
            <Query
                query={GET_USER}
                variables={{
                    id
                }}
            >
                {({ data: { user } }) => {
                    const { avatar, nickname, postCount } = user;
                    return (
                        <Container>
                            <Meta title={`Frisklog - ${nickname}`} />
                            <InfoWrapper>
                                <Avatar
                                    src={avatar.url}
                                    size="200"
                                    userId={user.id}
                                />
                                <UserMetaWrapper>
                                    <h1>{nickname}</h1>
                                    <h3>
                                        <em>{postCount} posts</em>
                                    </h3>
                                </UserMetaWrapper>
                            </InfoWrapper>
                            <hr />
                            <Subject>
                                <span>게시물 목록</span>
                                <div>
                                    <Select
                                        value={orderBy}
                                        onChange={handleChangeOrderBy}
                                    >
                                        {searchOptions.sort.map((sort) => (
                                            <option
                                                value={sort.value}
                                                key={sort.id}
                                            >
                                                {sort.text}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                            </Subject>
                            <PostList
                                orderBy={orderBy}
                                userId={id}
                                renderType="timeline"
                            >
                                {({ posts }) => posts}
                            </PostList>
                        </Container>
                    );
                }}
            </Query>
        </div>
    );
};

export default User;
