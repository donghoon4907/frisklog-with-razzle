import React from "react";
import styled from "styled-components";
import Subject from "../../components/Subject";
import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_POSTS } from "../../graphql/query/post";
import PostCardTypeItem from "../../components/PostCardTypeItem";

const PostWrapper = styled.div`
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -1rem;

    ${(props) => props.theme.media.phone} {
        margin: 0;
    }
`;

/**
 * * 메인 화면 컴포넌트
 *
 * @Page
 * @author frist
 */
const Feed = () => (
    <div>
        <Meta />
        <Subject>추천 게시물</Subject>
        <PostWrapper>
            <Query
                query={GET_POSTS}
                variables={{
                    first: 6,
                    orderBy: "viewCount_DESC",
                    notNullThumb: true
                }}
            >
                {({ data: { posts } }) =>
                    posts.data.map((post) => (
                        <PostCardTypeItem key={post.id} {...post} />
                    ))
                }
            </Query>
        </PostWrapper>
        <hr />
        <Subject>인기 게시물</Subject>
        <PostWrapper>
            <Query
                query={GET_POSTS}
                variables={{
                    first: 6,
                    orderBy: "likeCount_DESC",
                    notNullThumb: true
                }}
            >
                {({ data: { posts } }) =>
                    posts.data.map((post) => (
                        <PostCardTypeItem key={post.id} {...post} />
                    ))
                }
            </Query>
        </PostWrapper>
    </div>
);

export default Feed;
