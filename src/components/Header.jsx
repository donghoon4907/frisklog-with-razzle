import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "../context";
import ProfileBtn from "./ProfileBtn";
import SearchBtn from "./SearchBtn";
import HeaderSearchBar from "./HeaderSearchBar";
import CreatePostBtn from "./CreatePostBtn";
import HeaderNotice from "./HeaderNotice";

/**
 * * 공통 헤더 컴포넌트
 *
 * @Component
 * @author frisk
 */
const Header = () => {
    const displayName = "fr-header";
    /**
     * 로컬 상태 감시 모듈 활성화
     */
    const { isShowSearchBar } = useSelector();

    return (
        <div className={`${displayName}-wrapper`}>
            <header className={`${displayName}`}>
                <div className={`${displayName}-column`}>
                    <Link to="/">
                        <img
                            className={`${displayName}__logo`}
                            src="https://frisk.s3.ap-northeast-2.amazonaws.com/upload/4424b841-b125-4b9a-bcdf-a507ef751bed"
                            alt="logo"
                        />
                    </Link>
                    <HeaderNotice />
                </div>
                <div className={`${displayName}-column`}>
                    <SearchBtn />
                    <CreatePostBtn />
                    <ProfileBtn />
                </div>
            </header>
            {isShowSearchBar && (
                <div className={`${displayName}__search-wrapper`}>
                    <HeaderSearchBar />
                </div>
            )}
        </div>
    );
};

export default Header;
