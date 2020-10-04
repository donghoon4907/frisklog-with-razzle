import React from "react";
import styled from "styled-components";
import { FormInput } from "../Form";
import Button from "../Button";
import Loader from "../Loader";
import { Thumbnail } from "../../assets/icon";

const UploadWrapper = styled.div`
    ${(props) => props.theme.whiteBox}
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;
    }
`;

/**
 * * 회원가입 프레젠터 컴포넌트
 *
 * @Presenter
 * @author frisk
 * @param props.uploadLoading 업로드 요청 진행 여부
 * @param props.signUpLoading 회원가입 요청 진행 여부
 * @param props.nickname 별칭 입력을 위한 Hooks
 * @param props.email 이메일 입력을 위한 Hooks
 * @param props.preview 이미지 미리보기
 * @param props.$file file element
 * @param props.onChangeFile 파일 변경 핸들러
 * @param props.onClickFile 파일 클릭 핸들러
 * @param props.onSubmit 회원가입 요청 핸들러
 */
const SignUpPresenter = ({
    uploadLoading,
    signUpLoading,
    nickname,
    email,
    preview,
    $file,
    onChangeFile,
    onClickFile,
    onSubmit
}) => {
    return (
        <>
            {(uploadLoading || signUpLoading) && <Loader />}
            <form onSubmit={onSubmit}>
                <UploadWrapper onClick={onClickFile} role="button" tabIndex="0">
                    {preview ? (
                        <img
                            src={preview}
                            alt="avatar"
                            title="변경하려면 클릭하세요."
                        />
                    ) : (
                        <Thumbnail style={{ width: 100, height: 50 }} />
                    )}

                    <input
                        type="file"
                        onChange={onChangeFile}
                        ref={$file}
                        hidden
                        accept="image/jpg, image/jpeg, image/png, .gif"
                    />
                </UploadWrapper>
                <FormInput
                    type="email"
                    placeholder="이메일을 입력하세요."
                    id="email"
                    autoComplete="off"
                    required
                    {...email}
                    label="이메일"
                />
                <FormInput
                    placeholder="닉네임을 입력하세요"
                    required
                    id="nickname"
                    {...nickname}
                    autoComplete="off"
                    label="닉네임"
                />
                <Button type="submit">회원가입</Button>
            </form>
        </>
    );
};

export default SignUpPresenter;
