/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useState } from "react";
import { useSelector } from "react-redux";

const movieInfoWrapper = css`
    height: fit-content;
    position: relative;
    margin-bottom: 32px;
    button {
        position: absolute;
        bottom: 0;
        right: 0;
        border: none;
        clear: both;
        background-color: transparent;
        -webkit-text-decoration: underline;
        text-decoration: underline;
        cursor: pointer;
        color: rgba(246, 45, 168, 0.93);
    }
`;

const movieInfoContents = ({ open }) => css`
    display: grid;
    grid-gap: 30px;
    ${open && `justify-items: center;`}

    h2 {
        display: inline-block;
        color: white;
        font-size: 2.5rem;
        font-weight: bold;

        ${open
            ? `grid-column-start: 1;
        grid-row-start: 1;
        grid-column-end: 5;`
            : `grid-column-start: 2;
`}
    }
`;

const moviePoster = ({ open }) => css`
    ${open
        ? `grid-column-start: 2;
    grid-column-end: 4;`
        : `grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 4;`}

    img {
        ${open ? `width: 300px` : `width:200px`}
    }
`;

const movieInfoSpec = ({ open }) => css`
    ${open &&
    `grid-column-start: 1;
    grid-column-end: 5;
        `}

    dl {
        line-height: 2.2rem;
        dt {
            font-weight: bold;
            float: left;
            margin-right: 20px;
        }
        dd {
            color: rgba(255, 255, 255, 0.8);
            font-weight: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        dd:last-of-type {
            ${open && `-webkit-box-orient: horizontal;`}
        }
    }
`;

function MovieInfo() {
    const [movieInfoOpen, setMovieInfoOpen] = useState(false);
    const { movieInfo, loading } = useSelector((state) => state.movieInfoSlice);

    const {
        title,
        release_date,
        actor,
        director,
        summary,
        running_time,
        poster,
        genre
    } = movieInfo.movie;

    return (
        <div css={movieInfoWrapper}>
            <div css={movieInfoContents({ open: movieInfoOpen })}>
                <h2>{title}</h2>
                <div css={moviePoster({ open: movieInfoOpen })}>
                    <img src={poster} alt={title} />
                </div>
                <div css={movieInfoSpec({ open: movieInfoOpen })}>
                    <dl>
                        <dt>개요</dt>
                        <dd>
                            <p>
                                <span>{genre}</span>
                                <span>{release_date} 개봉</span>
                            </p>
                        </dd>
                        <dt>감독</dt>
                        <dd>{director}</dd>
                        <dt>출연</dt>
                        <dd>{actor}</dd>
                        <dt>러닝 타임</dt>
                        <dd>{running_time}</dd>
                        <dt>줄거리</dt>
                        <dd>{summary}</dd>
                    </dl>
                </div>
            </div>
            <button onClick={() => setMovieInfoOpen(!movieInfoOpen)}>
                {movieInfoOpen ? "접기" : "펼쳐보기"}
            </button>
        </div>
    );
}

export default MovieInfo;
