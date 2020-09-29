import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import Header from './Header'
import Nav from './Nav'
import Main from './Main'
// import AuthModal from "../modal/Auth";
// import SetNoticeModal from "../modal/SetNoticeContainer";
import { useDispatch, useSelector } from '../context'
import { CONTRACT_NAVIGATION, SET_ME } from '../context/action'
import { ME } from '../graphql/query/user'
import { COLLAPSE_KEY, setStorage } from '../lib/state'

const Section = styled.section`
    display: flex;
    justify-content: flex-start;
`

/**
 * 공통 레이아웃 컴포넌트
 *
 * @Component
 * @author frisk
 * @param props.title Head title
 */
const Layout = ({ children, title = 'Frisklog' }) => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch()
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isShowLoginModal, isShowNoticeModal, isCollapseNav } = useSelector()
    /**
     * 사용자 정보 로드
     */
    useQuery(ME, {
        ssr: false,
        onCompleted: ({ me }) => {
            const { id, nickname, email, avatar, isMaster } = me
            dispatch({
                type: SET_ME,
                id,
                nickname,
                email,
                avatar,
                isMaster,
            })
        },
    })
    /**
     * 리사이징 핸들러
     */
    const handleResize = useCallback(
        (e) => {
            const { innerWidth } = e.target
            /**
             * 네비게이션이 축소된 경우
             */
            if (isCollapseNav === 'contract') {
                return
            }

            if (innerWidth <= 922) {
                /**
                 * 네비게이션 축소
                 */
                dispatch({
                    type: CONTRACT_NAVIGATION,
                })
                setStorage(COLLAPSE_KEY, 'contract')
            }
        },
        [isCollapseNav]
    )
    /**
     * 라이프 사이클 모듈 활성화
     */
    useEffect(() => {
        /**
         * 브라우저 크기 변경 이벤트 바인딩
         */
        window.addEventListener('resize', handleResize)
        /**
         * 브라우저 크기 변경 이벤트 언바인딩
         */
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div>
            <div>
                {title === '페이지를 찾을 수 없습니다' ? (
                    children
                ) : (
                    <>
                        <Header />
                        <Section>
                            <Nav />
                            <Main>{children}</Main>
                        </Section>
                    </>
                )}
            </div>
        </div>
    )
}

export default Layout
