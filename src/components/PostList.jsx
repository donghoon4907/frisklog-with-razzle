import React from "react";
import { GET_POSTS } from "../graphql/query/post";
import Query from "./Query";
import Scroll from "./Scroll";
import PostListTypeItem from "./PostListTypeItem";
import PostCardTypeItem from "./PostCardTypeItem";
import NoData from "./NoData";
import { useSelector } from "../context";

/**
 * * 페이지 게시물 렌더링 컴포넌트
 *
 * @Component
 * @author frisk
 * @param {string}            renderType    렌더링 타입 설정
 * @param {number|undefined}  first         요청 목록 수
 * @param {string|undefined}  orderBy       정렬
 * @param {string|undefined}  query         검색어
 * @param {string|undefined}  category      카테고리
 * @param {string|undefined}  userId        사용자 ID
 */
const PostList = ({
    renderType,
    first = 30,
    orderBy = "createdAt_DESC",
    query,
    category,
    userId,
    children
}) => {
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isMobile } = useSelector();

    return (
        <Query
            query={GET_POSTS}
            variables={{
                first,
                orderBy,
                query,
                category,
                userId
            }}
            notifyOnNetworkStatusChange={true}
        >
            {({ data: { posts }, loading, fetchMore }) =>
                children({
                    total: posts.total,
                    posts: (
                        <div className="fr-grid-wrapper">
                            {posts.data.length > 0 ? (
                                <>
                                    {posts.data.map((post) => {
                                        if (isMobile) {
                                            return (
                                                <PostCardTypeItem
                                                    key={post.id}
                                                    {...post}
                                                />
                                            );
                                        } else {
                                            return (
                                                <PostListTypeItem
                                                    key={post.id}
                                                    renderType={renderType}
                                                    {...post}
                                                />
                                            );
                                        }
                                    })}
                                    <Scroll
                                        loading={loading}
                                        onBottom={() => {
                                            if (
                                                posts.data.length > 0 &&
                                                posts.data.length % first !== 0
                                            ) {
                                                return;
                                            }

                                            fetchMore({
                                                variables: {
                                                    first,
                                                    orderBy,
                                                    query,
                                                    category,
                                                    userId,
                                                    notNullThumb,
                                                    skip: posts.data.length
                                                },
                                                updateQuery: (
                                                    prev,
                                                    { fetchMoreResult }
                                                ) => {
                                                    if (!fetchMoreResult) {
                                                        return prev;
                                                    }

                                                    return {
                                                        posts: {
                                                            data: [
                                                                ...prev.posts
                                                                    .data,
                                                                ...fetchMoreResult
                                                                    .posts.data
                                                            ],
                                                            total: posts.total
                                                        }
                                                    };
                                                }
                                            });
                                        }}
                                    />
                                </>
                            ) : (
                                <NoData />
                            )}
                        </div>
                    )
                })
            }
        </Query>
    );
};

export default PostList;
