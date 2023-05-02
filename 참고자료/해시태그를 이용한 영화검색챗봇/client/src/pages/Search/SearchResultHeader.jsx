/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSort, getMovieListByTitle } from "../../modules/SearchPage/SearchedMovieSlice";

import { Radio } from "antd";

const SearchOptionWrapper = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 20px;
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.8);
`;

const RadioGroup = css`
    label {
        color: white;
        font-size: 1.2rem;
    }
`;

function SearchResultHeader({ keyword }) {
    const dispatch = useDispatch();
    const [option, setOption] = useState("");
    const history = useHistory();

    const onClickSortOption = (e) => {
        dispatch(setSort(e.target.value));
        history.push(`/search?keyword=${keyword}&page=1`);
        dispatch(getMovieListByTitle());;
    };

    const { matchedMovieList, length } = useSelector((state) => state.SearchedMovieSlice);

    return (
        <div css={SearchOptionWrapper}>
            <div>
                <p>
                    "{keyword}" 연관 검색 결과 <span>({length} 개)</span>
                </p>
            </div>
            <Radio.Group onChange={onClickSortOption} value={option} css={RadioGroup}>
                <Radio value={"abc"}>가나다순</Radio>
                <Radio value={"recent"}>최신순</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchResultHeader;
