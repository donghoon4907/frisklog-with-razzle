import React, { useEffect } from "react";
import styled from "styled-components";
import Subject from "../../components/Subject";
import Meta from "../../components/Meta";
import Query from "../../components/Query";
import { GET_POSTS } from "../../graphql/query/post";
import PostCardTypeItem from "../../components/PostCardTypeItem";
import { useSelector, useDispatch } from "../../context";
import { SET_COUNT_CARD } from "../../context/action";

const PostWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    overflow: hidden;
`;
/**
 * 카드형 수 설정
 */
const getRenderCount = (clientWidth) => {
    console.log(clientWidth);
    if (clientWidth > 1790) {
        return 5;
    } else if (clientWidth > 1440) {
        return 4;
    } else if (clientWidth > 1120) {
        return 3;
    } else if (clientWidth > 720) {
        return 2;
    } else {
        return 1;
    }
};
/**
 * * 메인 화면 컴포넌트
 *
 * @Page
 * @author frist
 */
const Feed = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { cardCountInRow } = useSelector();
    /**
     * 리사이징 핸들러
     */
    const handleResize = () => {
        const $main = document.querySelector("#main");

        const { clientWidth } = $main;
        /**
         * 카드형 수 설정
         */
        dispatch({
            type: SET_COUNT_CARD,
            payload: getRenderCount(clientWidth)
        });
    };
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        const $main = document.querySelector("#main");
        /**
         * 리사이징 이벤트 바인딩
         */
        window.addEventListener("resize", handleResize);

        const { clientWidth } = $main;
        /**
         * 카드형 수 설정
         */
        dispatch({
            type: SET_COUNT_CARD,
            payload: getRenderCount(clientWidth)
        });
        /**
         * 리사이징 이벤트 언바인딩
         */
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
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
                        posts.data.map((post, idx) => {
                            if (idx > cardCountInRow - 1) {
                                return;
                            }
                            return <PostCardTypeItem key={post.id} {...post} />;
                        })
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
                        posts.data.map((post, idx) => {
                            if (idx > cardCountInRow - 1) {
                                return;
                            }
                            return <PostCardTypeItem key={post.id} {...post} />;
                        })
                    }
                </Query>
            </PostWrapper>
            <hr />
        </div>
    );
};

export default Feed;
