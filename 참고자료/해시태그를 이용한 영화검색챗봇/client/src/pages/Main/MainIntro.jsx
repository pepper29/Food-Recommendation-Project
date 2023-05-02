/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React from "react";

import logo from "../../assets/logo.png";

const MainIntroWrapStyle = css`
    width: 100%;
    height: 190px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;

    p {
        font-size: 1.25rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.8);
        margin: 15px 0;
    }
`;

const LogoAreaStyle = css`
    width: 600px;
    object-fit: cover;
`;

function MainIntro() {
    return (
        <div css={MainIntroWrapStyle}>
            <div>
                <img src={logo} alt="심심해시 로고" css={LogoAreaStyle} />
            </div>
            <p>키워드로 취향에 맞는 영화를 찾아보세요!</p>
        </div>
    );
}

export default MainIntro;
