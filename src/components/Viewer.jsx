import React from "react";
import codeSyntaxHightlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import hljs from "highlight.js";

const Viewer =
    typeof window !== "undefined" && require("@toast-ui/react-editor").Viewer;

/**
 * * 게시물 에디터 컴포넌트
 *
 * @Component
 * @author frisk
 */
const PostViewer = (props) => {
    const { initialValue, initialEditType } = props;

    return (
        typeof window !== "undefined" && (
            <Viewer
                {...props}
                plugins={[[codeSyntaxHightlight, { hljs }]]}
                initialValue={initialValue || ""}
                initialEditType={initialEditType || "markdown"}
            />
        )
    );
};

export default PostViewer;
