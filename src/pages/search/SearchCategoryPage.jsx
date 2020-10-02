import React, { useState, useCallback } from "react";
import Meta from "../../components/Meta";
import Subject from "../../components/Subject";
import { Select } from "../../components/Form";
import PostList from "../../components/PostList";
import searchOptions from "../../json/search_options.json";

/**
 * 카테고리 검색 화면 컴포넌트
 *
 * @Page
 * @author frist
 */
const SearchCategoryPage = ({
    match: {
        params: { content }
    }
}) => {
    /**
     * 로컬 상태 변경 모듈 활성화
     */
    const [orderBy, setOrderBy] = useState("createdAt_DESC");
    /**
     * 정렬 변경 핸들러
     */
    const handleChangeOrderBy = useCallback((e) => {
        setOrderBy(e.target.value);
    }, []);

    return (
        <div>
            <Meta title={`Frisklog - ${content}`} />
            <div>
                <Subject>
                    <span>"{content}" 검색결과</span>
                    <div>
                        <Select value={orderBy} onChange={handleChangeOrderBy}>
                            {searchOptions.sort.map(({ text, value, id }) => (
                                <option value={value} key={id}>
                                    {text}
                                </option>
                            ))}
                        </Select>
                    </div>
                </Subject>
            </div>
            <PostList orderBy={orderBy} category={content}>
                {({ posts }) => posts}
            </PostList>
        </div>
    );
};

export default SearchCategoryPage;
