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

    ${(props) => props.theme.media.custom(1500)} {
        & > div:nth-child(5) {
            display: none;
        }
    }

    ${(props) => props.theme.media.custom(1200)} {
        & > div:nth-child(4) {
            display: none;
        }
    }

    ${(props) => props.theme.media.desktop} {
        & > div:nth-child(3) {
            display: none;
        }
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
                    first: 5,
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
                    first: 5,
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
