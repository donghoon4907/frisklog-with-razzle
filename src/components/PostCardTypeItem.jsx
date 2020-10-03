import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Avatar from "./Avatar";
import { timeForToday } from "../lib/date";
import BtnLink from "./BtnLink";

const Container = styled.div`
    padding: 0 1rem;
    flex-basis: 33.3%;
    max-width: 33.3%;
    flex: 0 0 auto;
    margin-bottom: 1rem;

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
    order: 1;
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

const MetaWrapper = styled.div`
    margin-top: 0.5rem;
    order: 2;
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

    & > h3 {
        display: table-cell;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const Description = styled.p`
    font-size: 0.875rem;
    line-height: 1.5;
    height: 3.9375rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const CardFooter = styled.div`
    order: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`;

const UserWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;

const MetaColumn = styled.div`
    display: flex;
    justfiy-content: flex-start;
    align-items: center;

    & span {
        margin-right: 10px;
        margin-left: 5px;
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
                    {thumbnail && (
                        <CardThumbnailWrapper>
                            <CardThumbnail
                                onClick={() => history.push(`/post/${id}`)}
                            >
                                <img src={thumbnail} alt="post thumbnail" />
                            </CardThumbnail>
                        </CardThumbnailWrapper>
                    )}

                    <MetaWrapper>
                        <div onClick={() => history.push(`/post/${id}`)}>
                            <TitleWrapper>
                                <h3>{title}</h3>
                            </TitleWrapper>
                            <Description>{description}</Description>
                        </div>
                    </MetaWrapper>
                    <CardFooter>
                        <UserWrapper>
                            <Avatar
                                src={user.avatar.url}
                                size="30"
                                userId={user.id}
                            />

                            <span>{user.nickname}</span>
                        </UserWrapper>

                        <MetaColumn>
                            <BtnLink to={`/category/${category}`}>
                                {category}
                            </BtnLink>
                        </MetaColumn>
                    </CardFooter>
                </CardSelector>
            </CardImpressWrapper>
        </Container>
    );
};

export default PostCardTypeItem;
