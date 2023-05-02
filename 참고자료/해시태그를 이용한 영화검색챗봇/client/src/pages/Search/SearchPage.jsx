/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../../components/SearchBar";
import DefaultMovieList from "./DefaultMovieList";
import SearchedMovieList from "./SearchedMovieList";
import { setTitle, getMovieListByTitle } from "../../modules/SearchPage/SearchedMovieSlice";

const searchBannerStyle = css`
    display: flex;
    height: 17.5rem;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    p {
        font-size: 2rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 18px;
    }
`;

const SearchResultWrapper = css`
    padding: 30px;
`;

function SearchPage({ location }) {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const searchParams = new URLSearchParams(location.search);
    const queryParams = searchParams.get("keyword") === null ? "" : searchParams.get("keyword");

    useEffect(() => {
        setQuery(queryParams);
        setKeyword(queryParams);
        dispatch(setTitle({ keyword: queryParams }));
        dispatch(getMovieListByTitle());
    }, [queryParams]);

    return (
        <div css={SearchResultWrapper}>
            <div css={searchBannerStyle}>
                <p>심심해시에서 다양한 영화를 검색해보세요!</p>
                <SearchBar value={queryParams} />
            </div>
            <div>
                {keyword.length === 0 ? (
                    <DefaultMovieList setKeyword={setKeyword} />
                ) : (
                    <SearchedMovieList
                        keyword={query}
                        setKeyword={setKeyword}
                        location={location}
                    />
                )}
            </div>
        </div>
    );
}

export default SearchPage;
