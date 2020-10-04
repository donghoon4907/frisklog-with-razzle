import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import { HeartFull, Comment, View } from "../assets/icon";
import BtnLink from "./BtnLink";
import Dropdown from "./Dropdown";

const Container = styled.div`
    padding: 0 1rem;
    flex-basis: 20%;
    max-width: 20%;
    flex: 0 0 auto;
    margin-bottom: 1rem;

    ${(props) => props.theme.media.custom(1500)} {
        flex-basis: 25%;
        max-width: 25%;
    }

    ${(props) => props.theme.media.custom(1200)} {
        flex-basis: 33.3%;
        max-width: 33.3%;
    }

    ${(props) => props.theme.media.desktop} {
        flex-basis: 50%;
        max-width: 50%;
    }

    ${(props) => props.theme.media.tablet} {
        flex-basis: 100%;
        max-width: 100%;
        padding: 0;
    }
`;

const CardImpressWrapper = styled.div`
    ${(props) => props.theme.whiteBox};
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 16px 0px;
`;

const CardSelector = styled.article`
    display: flex;
    flex-direction: column;
`;

const CardThumbnailWrapper = styled.div`
    position: relative;
    width: 100%;
    order: 2;
    cursor: pointer;
`;

const CardThumbnail = styled.div`
    padding-bottom: 56.25%;

    & > img {
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
        top: 0px;
    }
`;

const CardBody = styled.div`
    order: 3;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px;
    cursor: pointer;
`;

const TitleWrapper = styled.div`
    display: table;
    table-layout: fixed;
    width: 100%;
    white-space: nowrap;
    margin-bottom: 5px;

    & > div {
        display: table-cell;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
        font-weight: 500;
    }
`;

const Description = styled.p`
    font-size: 0.875rem;
    line-height: 1.5;
    height: 2.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const CardHeader = styled.div`
    order: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`;

const UserWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;

const MetaColumn = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & span {
        margin-right: 5px;
    }
`;

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
    /**
     * history 객체 활성화
     */
    const history = useHistory();

    return (
        <Container>
            <CardImpressWrapper>
                <CardSelector>
                    <CardHeader>
                        <UserWrapper>
                            <Avatar
                                src={user.avatar.url}
                                size="30"
                                userId={user.id}
                            />

                            <span>{user.nickname}</span>
                        </UserWrapper>
                        <div>
                            <BtnLink to={`/category/${category}`}>
                                {category}
                            </BtnLink>
                        </div>
                    </CardHeader>
                    {thumbnail && (
                        <CardThumbnailWrapper
                            onClick={() => history.push(`/post/${id}`)}
                        >
                            <CardThumbnail>
                                <img src={thumbnail} alt="post thumbnail" />
                            </CardThumbnail>
                        </CardThumbnailWrapper>
                    )}

                    <CardBody onClick={() => history.push(`/post/${id}`)}>
                        <TitleWrapper>
                            <div>{title}</div>
                        </TitleWrapper>
                        <Description>{description}</Description>
                        <MetaColumn>
                            <div>
                                <span title="좋아요 수">
                                    <HeartFull />
                                    <span>{likeCount}</span>
                                </span>
                                <span title="댓글 수">
                                    <Comment />
                                    <span>{commentCount}</span>
                                </span>
                            </div>
                            <div>{timeForToday(createdAt)}</div>
                        </MetaColumn>
                    </CardBody>
                </CardSelector>
            </CardImpressWrapper>
        </Container>
    );
};

export default PostCardTypeItem;
