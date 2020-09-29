import { gql } from '@apollo/client'

/**
 * * 댓글 추가
 *
 * @mutation
 * @author frisk
 * @param $postId 게시물 ID
 * @param $content 내용
 */
export const CREATE_COMMENT = gql`
    mutation createComment($postId: String!, $content: String!) {
        createComment(postId: $postId, content: $content)
    }
`

/**
 * * 댓글 수정
 *
 * @mutation
 * @author frisk
 * @param $id ID
 * @param $content 내용
 */
export const UPDATE_COMMENT = gql`
    mutation updateComment($id: String!, $content: String!) {
        updateComment(id: $id, content: $content)
    }
`

/**
 * * 댓글 삭제
 *
 * @mutation
 * @author frisk
 * @param $id ID
 */
export const DELETE_COMMENT = gql`
    mutation deleteComment($id: String!) {
        deleteComment(id: $id)
    }
`
