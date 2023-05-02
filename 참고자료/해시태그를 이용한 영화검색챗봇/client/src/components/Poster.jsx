/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { lazy, Suspense } from "react";

import { Link } from "react-router-dom";

import LoadingPoster from "./LoadingPoster";

const imgStyle = ({ page }) => css`
    text-align: center;
    width: ${page === "main" ? "11rem" : "15vw"};
    border-radius: 12px 12px 0 0;

    img {
        border-radius: 12px 12px 0 0;
    }
`;

const posterWrapperStyle = ({ page }) => css`
    width: ${page === "main" ? "11rem" : "15vw"};
    border-radius: 17px;
    background-color: #2c313f;
    transition: 0.3s ease-in-out;

    ${page === "search" &&
    `&:hover {
        transform: translateY(-24px);
        box-shadow: 0px 17px 12px 3px #00000030;

        p {
            color: rgba(246, 45, 168, 0.93);
        }
    }`}

    a {
        display: block;
    }
`;

const LazyPoster = lazy(() => import("./LazyPoster"));

function Poster({ item, setKeyword, page }) {
    return (
        <li css={posterWrapperStyle({ page: page })}>
            <div>
                {page === "search" && <form onChange={(e) => setKeyword(e.target.value)} />}
                <Link to={`/movie/${item.movie_id}`}>
                    <div css={imgStyle({ page: page })}>
                        <Suspense fallback={<LoadingPoster />}>
                            <LazyPoster page={page} item={item} />
                        </Suspense>
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default Poster;
