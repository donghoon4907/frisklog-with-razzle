import React, { useCallback } from "react";
import { Profile, Logout } from "../assets/icon";
import { useDispatch, useSelector } from "../context";
import { SHOW_LOGIN_MODAL, SET_ME } from "../context/action";
import { TOKEN_KEY, getStorage, deleteStorage } from "../lib/state";
import Avatar from "./Avatar";

/**
 * 내 정보 아이콘 컴포넌트
 *
 * @Component
 * @author frisk
 */
const ProfileBtn = () => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const dispatch = useDispatch();
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { id, avatar } = useSelector();
    /**
     * 클릭 핸들러
     */
    const handleClick = useCallback(() => {
        /**
         * 토큰 가져오기
         */
        const token = getStorage(TOKEN_KEY);
        if (token) {
            const tf = window.confirm("로그아웃 하시겠어요?");
            if (tf) {
                /**
                 * 토큰 삭제
                 */
                deleteStorage(TOKEN_KEY);
                /**
                 * 로컬 상태 갱신
                 */
                dispatch({
                    type: SET_ME,
                    id: null,
                    nickname: null,
                    email: null,
                    avatar: null,
                    isMaster: false
                });
            }
        } else {
            /**
             * 로그인 모달 보이기
             */
            dispatch({
                type: SHOW_LOGIN_MODAL
            });
        }
    }, []);

    return (
        <>
            {id ? (
                <div className="d-flex justify-content-start">
                    <Avatar src={avatar.url} size="30" userId={id} />
                    <button
                        onClick={handleClick}
                        className="ml-2"
                        aria-label="Logout"
                    >
                        <Logout />
                        <span className="a11y-hidden">로그아웃 하기</span>
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleClick}
                    aria-haspopup="true"
                    aria-label="Login"
                >
                    <Profile />
                    <span className="a11y-hidden">로그인 하기</span>
                </button>
            )}
        </>
    );
};

export default ProfileBtn;
