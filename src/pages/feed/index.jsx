import React from 'react'
import Meta from './Meta'
import Subject from '../../components/Subject'
import PostList from './FeedPostList'

/**
 * * 메인 화면 컴포넌트
 *
 * @author frist
 */
const Index = () => (
    <>
        <Meta />
        <Subject>최근 게시물</Subject>
        <PostList />
    </>
)

export default Index
