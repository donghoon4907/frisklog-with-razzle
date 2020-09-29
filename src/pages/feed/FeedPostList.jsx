import React, { useEffect, memo } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../../graphql/query/post'
import TimelinePostItem from './TimelinePostItem'
import Loader from '../../components/Loader'

/**
 * * 피드 페이지 게시물 렌더링 컴포넌트
 *
 * @Component
 * @author frisk
 */
const FeedPostList = () => {
    /**
     * 최근 게시물 로드
     */
    const { data, loading, fetchMore } = useQuery(GET_POSTS, {
        variables: {
            first: 30,
            orderBy: 'createdAt_DESC',
        },
        notifyOnNetworkStatusChange: true,
    })
    /**
     * 스크롤 이벤트 핸들러
     */
    const handleScrollFetchMore = () => {
        /**
         * 요청 중인 경우
         */
        if (loading) {
            return
        }

        const {
            scrollHeight,
            clientHeight,
            scrollTop,
        } = document.documentElement

        if (data && data.posts) {
            if (scrollTop + clientHeight === scrollHeight) {
                if (
                    data.posts.data.length > 0 &&
                    data.posts.data.length % 30 === 0
                ) {
                    /**
                     * 추가 게시물 요청
                     */
                    fetchMore({
                        variables: {
                            skip: data.posts.data.length,
                            first: 30,
                            orderBy: 'createdAt_DESC',
                        },
                        updateQuery: (prev, next) => {
                            const { fetchMoreResult } = next

                            if (fetchMoreResult) {
                                if (fetchMoreResult.posts.data.length === 0) {
                                    window.removeEventListener(
                                        'scroll',
                                        handleScrollFetchMore
                                    )
                                }

                                return {
                                    posts: {
                                        data: [
                                            ...prev.posts.data,
                                            ...fetchMoreResult.posts.data,
                                        ],
                                        total: data.posts.total,
                                    },
                                }
                            } else {
                                return prev
                            }
                        },
                    })
                }
            }
        }
    }
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        /**
         * 스크롤 이벤트 바인딩
         */
        window.addEventListener('scroll', handleScrollFetchMore)
        /**
         * 스크롤 이벤트 언바인딩
         */
        return () => window.removeEventListener('scroll', handleScrollFetchMore)
    }, [data && data.posts, loading])

    if (!data || loading) {
        return <Loader />
    }

    return data.posts.data.map((post) => (
        <TimelinePostItem key={post.id} {...post} />
    ))
}

export default memo(FeedPostList)
