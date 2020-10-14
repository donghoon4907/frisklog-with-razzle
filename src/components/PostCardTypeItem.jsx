import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import { HeartFull, Comment } from "../assets/icon";
import BtnLink from "./BtnLink";

/**
 * * 게시물 카드형 렌더링 컴포넌트
 *
 * @Component
 * @author frisk
 * @param {string} props.id           게시물 ID
 * @param {string} props.title        게시물 제목
 * @param {string} props.description  게시물 설명
 * @param {object} props.user         게시물 작성자
 * @param {string} props.createdAt    게시물 작성일
 * @param {number} props.likeCount    게시물 좋아요 수
 * @param {number} props.viewCount    게시물 조회 수
 * @param {string} props.category     게시물 카테고리
 * @param {number} props.commentCount 게시물 댓글 수
 * @param {string} props.thumbnail    게시물 썸네일
 */
const PostCardTypeItem = ({
    id,
    title,
    description,
    user,
    createdAt,
    likeCount,
    viewCount,
    category,
    commentCount,
    thumbnail
}) => {
    const displayName = "fr-card";
    return (
        <div className={displayName}>
            <article className={`${displayName}-selector`}>
                <div className={`${displayName}__header`}>
                    <div className={`${displayName}__header__avatar`}>
                        <Avatar
                            src={user.avatar.url}
                            size="30"
                            userId={user.id}
                        />

                        <span>{user.nickname}</span>
                    </div>
                    <div>
                        <BtnLink to={`/category/${category}`}>
                            {category}
                        </BtnLink>
                    </div>
                </div>
                <Link
                    className={`${displayName}__body fr-link`}
                    to={`/post/${id}`}
                >
                    {thumbnail && (
                        <div className={`${displayName}__img-wrapper fr-link`}>
                            <div className={`${displayName}__img-bg`}>
                                <img
                                    className={`${displayName}__img`}
                                    src={thumbnail}
                                    alt="post thumbnail"
                                />
                            </div>
                        </div>
                    )}
                    <div className={`${displayName}__body__title-wrapper`}>
                        <h4 className="fr-card__body__title">{title}</h4>
                    </div>
                    <p
                        className={`${displayName}__body__description`}
                        style={{ WebkitBoxOrient: "vertical" }}
                    >
                        {description}
                    </p>
                    <div className={`${displayName}__body__meta`}>
                        <div>
                            <span>
                                <HeartFull />
                                <span>{likeCount}</span>
                            </span>
                            <span>
                                <Comment />
                                <span>{commentCount}</span>
                            </span>
                        </div>
                        <div>{timeForToday(createdAt)}</div>
                    </div>
                </Link>
            </article>
        </div>
    );
};

export default PostCardTypeItem;
