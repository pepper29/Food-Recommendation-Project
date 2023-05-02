/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Pagination } from "antd";

import Poster from "../../components/Poster";
import SearchResultHeader from "./SearchResultHeader";
import { setPage, getMovieListByTitle } from "../../modules/SearchPage/SearchedMovieSlice";
import { setPagination } from "../../modules/SearchPage/PaginationSlice";
import { sample } from "../../assets/Sample";

const paginationStyle = css`
    margin-top: 30px;
    text-align: center;
    .ant-pagination-item:focus-visible,
    .ant-pagination-item:hover a {
        color: rgba(246, 45, 168, 0.93);
    }
    .ant-pagination-item-active {
        background-color: transparent;
        border-color: rgba(246, 45, 168, 0.93);
        a {
            color: rgba(246, 45, 168, 0.93);
        }
    }
    .ant-pagination-item-link {
        &:hover {
            color: rgba(246, 45, 168, 0.93);
        }
    }
    .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
    .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
        color: rgba(246, 45, 168, 0.93);
    }
`;

const noresult = css`
    color: white;
    text-align: center;
    margin-top: 150px;
`;

const movieListWrapper = css`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4vw;
    width: calc(100vw - 28vw);
    margin: 0 auto;
`;

const RadioGroup = css`
    margin-bottom: 30px;
    text-align: right;

    label {
        color: white;
        font-size: 1rem;
    }
`;

const NoResult = ({ keyword }) => {
    return <p css={noresult}>'{keyword}'에 대한 검색 결과가 없습니다.</p>;
};

function SearchedMovieList({ keyword, setKeyword, location }) {
    const pageSize = 12;
    const dispatch = useDispatch();
    const { matchedMovieList, length } = useSelector((state) => state.SearchedMovieSlice);
    const history = useHistory();

    const searchParams = new URLSearchParams(location.search);
    const queryPage = searchParams.get("page");

    useEffect(() => {
        dispatch(setPagination({
            totalPage: length / pageSize,
            current: queryPage,
        }));
        dispatch(setPage({ page: queryPage }));
        dispatch(getMovieListByTitle());
    }, [queryPage]);

    const handlePageChange = (page) => {
        dispatch(setPagination({
            current: page
        }));
        history.push(`/search?keyword=${keyword}&page=${page}`);
    };

    return (
        <>
            <SearchResultHeader keyword={keyword} />
            {length > 0 ? (
                <>
                    <ul css={movieListWrapper}>
                        {matchedMovieList
                            .map((movie) => {
                                return <Poster item={movie} setKeyword={setKeyword} page="search" />;
                            })}
                    </ul>
                    <Pagination
                        size="small"
                        pageSize={pageSize}
                        defaultCurrent={queryPage}
                        total={length}
                        onChange={handlePageChange}
                        css={paginationStyle}
                    />
                </>
            ) : (
                <NoResult keyword={keyword} />
            )}
        </>
    );
}

export default SearchedMovieList;
