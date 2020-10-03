import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { useLazyAxios } from "../hooks";

const Editor =
    typeof window !== "undefined" && require("@toast-ui/react-editor").Editor;

const Container = styled.div`
    & .te-tab-active {
        ${(props) => props.theme.media.phone} {
            width: 100% !important;
        }
    }

    & .te-md-splitter {
        ${(props) => props.theme.media.phone} {
            display: none !important;
        }
    }

    & .te-preview {
        ${(props) => props.theme.media.phone} {
            display: none !important;
        }
    }
`;

/**
 * * 게시물 에디터 컴포넌트
 *
 * @Component
 * @author frisk
 */
const PostEditor = (props) => {
    const {
        initialValue,
        previewStyle,
        height,
        initialEditType,
        useCommandShortcut
    } = props;
    /**
     * 업로드 요청을 위한 Axios 활성화
     */
    const { loading, call } = useLazyAxios();
    /**
     * editor element
     */
    const $editor = useRef();
    /**
     * 에디터 변경 이벤트
     */
    const handleChange = useCallback(() => {
        const instance = $editor.current.getInstance();
        /**
         * 에디터 output
         * 1. instance.getMarkdown(): markdown type
         * 2. instance.getHtml(): html type
         */
        props.onChange(instance.getMarkdown());
    }, [props]);

    return (
        <Container>
            {loading && <Loader />}
            {typeof window !== "undefined" && (
                <Editor
                    {...props}
                    initialValue={initialValue || ""}
                    previewStyle={previewStyle || "vertical"}
                    height={height || "35rem"}
                    initialEditType={initialEditType || "markdown"}
                    useCommandShortcut={useCommandShortcut || true}
                    ref={$editor}
                    onChange={handleChange}
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {
                            /**
                             * 업로드 요청 중인 경우
                             */
                            if (loading) {
                                alert("업로드 요청 중입니다.");
                                return;
                            }

                            const formData = new FormData();
                            formData.append("file", blob);

                            const { data, error } = await call({
                                method: "post",
                                url: `${process.env.RAZZLE_BACKEND_API_PATH}/api/upload`,
                                data: formData,
                                headers: {
                                    "content-type": "multipart/form-data"
                                }
                            });

                            if (data) {
                                callback(data, "");
                            }

                            if (error) {
                                alert("썸네일 업로드 중 오류가 발생했습니다.");
                            }

                            return false;
                        }
                    }}
                />
            )}
        </Container>
    );
};

export default PostEditor;
