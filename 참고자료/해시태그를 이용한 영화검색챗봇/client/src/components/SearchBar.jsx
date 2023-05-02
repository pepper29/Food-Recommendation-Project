/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setTitle, getMovieListByTitle } from "../modules/SearchPage/SearchedMovieSlice";

import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const divStyle = css`
    position: relative;
    display: inline-flex;
    width: 40%;
    align-items: center;
`;

const inputStyle = css`
    width: 100%;
    border: 1.5px solid;
    border-radius: 40px;
    border-color: #444444;
    background-color: transparent;
    color: #fff;
    &.ant-input:focus,
    &.ant-input-focused {
        border-color: rgb(246 45 168 / 60%);
        box-shadow: 0 0 0 2px rgb(246 45 168 / 24%);
    }
    &:hover {
        border-color: rgb(246 45 168 / 60%);
    }
`;

const buttonStyle = css`
    position: absolute;
    right: 1px;
    height: 39px;
    background-color: #444444;
    border: 1.5px solid;
    border-color: #444444;
    &:hover,
    &:focus {
        background-color: #222222;
        box-shadow: 0 1px 6px 0 #171717;
        border-color: rgba(223, 225, 229, 0);
    }
    [ant-click-animating-without-extra-node]&::after {
        animation: 0s;
    }
`;

function SearchBar() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { title } = useSelector((state) => state.SearchedMovieSlice);
    const [keyword, setKeyword] = useState(title);

    useEffect(() => {
        setKeyword(title);
    }, [title]);

    const onQueryString = (keyword) => {
        (keyword && keyword.charAt(0) !== " ") && history.push(`/search?keyword=${keyword}&page=1`);
        dispatch(setTitle({ keyword }));
        dispatch(getMovieListByTitle());
    };

    return (
        <div css={divStyle}>
            <Input
                size="large"
                placeholder="영화 제목을 검색해보세요"
                onChange={(e) => setKeyword(e.target.value)}
                onPressEnter={() => {
                    onQueryString(keyword);
                }}
                value={keyword}
                css={inputStyle}
            />
            <Button
                type="primary"
                shape="round"
                icon={<SearchOutlined />}
                onClick={() => {
                    onQueryString(keyword);
                }}
                css={buttonStyle}
            >
                검색
            </Button>
        </div>
    );
}

export default SearchBar;
