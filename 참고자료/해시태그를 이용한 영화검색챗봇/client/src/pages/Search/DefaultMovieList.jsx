/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Poster from "../../components/Poster";
import { getMovieList, addMovie, clearState } from "../../modules/SearchPage/DefaultMovieSlice";

const movieListWrapper = css`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4vw;
    width: calc(100vw - 20vw);
    margin: 0 auto;
`;

function DefaultMovieList({ setKeyword }) {
    const dispatch = useDispatch();
    const { currentMovieList } = useSelector((state) => state.DefaultMovieSlice);

    useEffect(() => {
        //기존에 불러온 영화 리스트가 있다면 api를 호출하지 않는다.
        if (currentMovieList.length === 0) {
            dispatch(clearState());
            dispatch(getMovieList());
        }
        window.addEventListener("scroll", infiniteScroll, true);
        return () => {
            window.removeEventListener("scroll", infiniteScroll);
        };
    }, []);

    //작품 검색 첫 화면 무한 스크롤 적용
    const infiniteScroll = () => {
        let scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientTop = document.documentElement.clientHeight;

        if (scrollTop + clientTop >= scrollHeight) {
            dispatch(addMovie());
        }
    };

    return (
        <>
            <ul css={movieListWrapper}>
                {currentMovieList.map((movie) => {
                    return <Poster item={movie} setKeyword={setKeyword} page="search" />;
                })}
            </ul>
        </>
    );
}

export default DefaultMovieList;
