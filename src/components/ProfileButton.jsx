import React, { useCallback } from 'react'
import { Profile } from '../icons'
import { useDispatch } from '../context'
import { SHOW_LOGIN_MODAL, SET_ME } from '../context/action'
import { TOKEN_KEY, getStorage, deleteStorage } from '../lib/state'

/**
 * 내 정보 아이콘 컴포넌트
 *
 * @Component
 * @author frisk
 */
const ProfileButton = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch()
    /**
     * 클릭 핸들러
     */
    const handleClick = useCallback(() => {
        /**
         * 토큰 가져오기
         */
        const token = getStorage(TOKEN_KEY)
        if (token) {
            const tf = window.confirm('로그아웃 하시겠어요?')
            if (tf) {
                /**
                 * 토큰 삭제
                 */
                deleteStorage(TOKEN_KEY)
                /**
                 * 로컬 상태 갱신
                 */
                dispatch({
                    type: SET_ME,
                    id: null,
                    nickname: null,
                    email: null,
                    avatar: null,
                    isMaster: false,
                })
            }
        } else {
            /**
             * 로그인 모달 보이기
             */
            dispatch({
                type: SHOW_LOGIN_MODAL,
            })
        }
    }, [])

    return (
        <div onClick={handleClick}>
            <Profile />
        </div>
    )
}

export default ProfileButton
