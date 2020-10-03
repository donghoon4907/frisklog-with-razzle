import { gql } from '@apollo/client'

/**
 * * 게시물 추가
 *
 * @mutation
 * @author frisk
 * @param $title 제목
 * @param $description 소개
 * @param $content 내용
 * @param $category 카테고리
 * @param $thumbnail 썸네일
 */
export const CREATE_POST = gql`
    mutation createPost(
        $title: String!
        $description: String!
        $content: String!
        $category: String!
        $thumbnail: String
    ) {
        createPost(
            title: $title
            description: $description
            content: $content
            category: $category
            thumbnail: $thumbnail
        )
    }
`

/**
 * * 게시물 수정
 *
 * @mutation
 * @author frisk
 * @param $id 공지사항 ID
 * @param $title 제목
 * @param $description 소개
 * @param $content 내용
 * @param $category 카테고리
 * @param $thumbnail 썸네일
 */
export const UPDATE_POST = gql`
    mutation updatePost(
        $id: String!
        $title: String!
        $description: String!
        $content: String!
        $category: String!
        $thumbnail: String
    ) {
        updatePost(
            id: $id
            title: $title
            description: $description
            content: $content
            category: $category
            thumbnail: $thumbnail
        )
    }
`

/**
 * * 게시물 삭제
 *
 * @mutation
 * @author frisk
 * @param $id 게시물 ID
 */
export const DELETE_POST = gql`
    mutation deletePost($id: String!) {
        deletePost(id: $id)
    }
`

/**
 * * 게시물 좋아요 / 좋아요 취소
 *
 * @mutation
 * @author frisk
 * @param $id 게시물 ID
 */
export const LIKE_POST = gql`
    mutation likePost($id: String!) {
        likePost(id: $id)
    }
`
