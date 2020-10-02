import React from "react";
import styled from "styled-components";
import moment from "moment";
import Avatar from "./Avatar";
import Timestamp from "./Timestamp";
import StyledLink from "./StyledLink";
import { HeartFull, Comment, View } from "../assets/icon";
import BtnLink from "./BtnLink";
import { timeForToday } from "../lib/date";

const Container = styled.div`
    height: auto;
    display: flex;
    width: 100%;
    justify-content: flex-start;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

const TimelineWrapper = styled.div`
    width: 200px;
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;

    ${(props) => props.theme.media.phone} {
        display: none;
    }
`;

const Timeline = styled.div`
    position: relative;
    border: 1px solid lightgray;
`;

const TimestampWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 5px;
    text-align: right;
    left: -150px;
    width: 130px;
`;

const Stamp = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 8px;
    left: -8px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: inherit;
    z-index: 1;
`;

const ChildStamp = styled.div`
    background: ${(props) => props.theme.blueColor};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: relative;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Category = styled.div`
    width: auto;
    margin-right: 10px;
`;

const Title = styled.h4`
    ${(props) => props.theme.media.desktop} {
        font-size: 20px;
    }
`;
const Description = styled.p`
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    height: 3.9375rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(73, 80, 87);

    ${(props) => props.theme.media.desktop} {
        font-size: 14px;
    }
`;

const MetaWrapper = styled.div`
    flex: 1;
    padding: 5px;
`;

const MetaFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
 * * 게시물 리스트형 렌더링 컴포넌트
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
 * @param {string|undefined} props.renderType   렌더링 타입
 */
const PostListTypeItem = ({
    id,
    title,
    description,
    user,
    createdAt,
    likeCount,
    viewCount,
    category,
    commentCount,
    renderType
}) => (
    <Container>
        {renderType === "timeline" && (
            <TimelineWrapper>
                <Timeline>
                    <Stamp>
                        <ChildStamp />
                    </Stamp>
                    <TimestampWrapper>
                        <time>
                            {moment(createdAt).format("YYYY년 MM월 DD일")}
                        </time>
                        <Timestamp>
                            {moment(createdAt).format("HH시 mm분")}
                        </Timestamp>
                    </TimestampWrapper>
                </Timeline>
            </TimelineWrapper>
        )}
        <MetaWrapper>
            <TitleWrapper>
                <Category>
                    <BtnLink to={`/category/${category}`}>{category}</BtnLink>
                </Category>

                <Title>
                    <StyledLink to={`/post/${id}`}>{title}</StyledLink>
                </Title>
            </TitleWrapper>

            <Description>
                <StyledLink to={`/post/${id}`}>{description}</StyledLink>
            </Description>
            <MetaFooter>
                <MetaColumn>
                    <Avatar src={user.avatar.url} size="30" userId={user.id} />
                    <span>{user.nickname}</span>
                    {renderType !== "timeline" && (
                        <>
                            <span>·</span>
                            <span>{timeForToday(createdAt)}</span>
                        </>
                    )}
                </MetaColumn>
                <MetaColumn>
                    <div title="좋아요 수">
                        <HeartFull />
                        <span>{likeCount}</span>
                    </div>
                    <div title="댓글 수">
                        <Comment />
                        <span>{commentCount}</span>
                    </div>
                    <div title="조회 수">
                        <View />
                        <span>{viewCount}</span>
                    </div>
                </MetaColumn>
            </MetaFooter>
        </MetaWrapper>
    </Container>
);

export default PostListTypeItem;
