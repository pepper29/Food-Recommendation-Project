/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React from "react";

const movieInfoStyle = css`
    padding: 7px 20px;

    p {
        margin: 14px 0;
        color: #ffffff;
    }

    p:first-of-type {
        font-size: 1.4rem;
        font-weight: bold;
    }

    p:last-of-type {
        font-size: 1rem;
    }
`;

const laztTextStyle = css`
    width: 135px;
    height: 25px;
    background-color: #3f4555d6;
    animation: pulseanim 1.2s ease-in-out infinite;

    @keyframes pulseanim {
        0% {
            transform: scale(0);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;

const lazyImageStyle = ({ page }) => css`
    width: 15vw;
    min-height: ${page === "main" ? "257px" : "200px"};
    height: auto;
    content: "";
    background-color: #3f4555d6;
    border-radius: 17px 17px 0 0;
`;

function LoadingPoster({ page }) {
    return (
        <>
            <div css={lazyImageStyle({ page })}></div>
            <div css={movieInfoStyle}>
                <p css={laztTextStyle}></p>
                <p css={laztTextStyle}></p>
                <p css={laztTextStyle}></p>
            </div>
        </>
    );
}

export default LoadingPoster;
