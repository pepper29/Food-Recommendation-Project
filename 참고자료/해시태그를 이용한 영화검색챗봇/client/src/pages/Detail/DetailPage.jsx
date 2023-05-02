/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MovieInfo from "./MovieInfo";
import IntegratedAnalysis from "./IntegratedAnalysis";
import PlatformAnalysis from "./PlatformAnalysis";
import { clearPlatformData } from "../../modules/DetailPage/wordCloudSlice";
import { clearMovieInfo, getMovieInfo } from "../../modules/DetailPage/movieInfoSlice";
import { Button, BackTop } from "antd";
import { sample } from "../../assets/Sample";

const detailPageWrapper = css`
    font-size: 1.15rem;
    color: #ffffff;
    width: 65%;
    margin: 0 auto;
    padding: 50px 0;
`;

const tabStyle = css`
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 40px;
    border-bottom: 1px solid gray;
    padding-bottom: 10px;

    li {
        height: 40px;
        width: 120px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;

        a {
            display: block;
            color: #fff;
        }
    }
`;

const goBackBtnArea = css`
    text-align: center;
    button {
        width: 300px;
        height: 50px;
        background-color: #44444499;
        color: white;
        border: none;

        &:hover {
            background-color: #444444;
            color: white;
        }
    }
`;

const style = {
    height: 40,
    width: 70,
    lineHeight: "40px",
    borderRadius: 8,
    backgroundColor: "#444444",
    color: "#fff",
    textAlign: "center",
    fontSize: 14
};

const DetailPage = ({ history, match }) => {
    const dispatch = useDispatch();
    const { id } = match.params;

    let integratedAnalysisRef = useRef(null);
    let PlatformAnalysisRef = useRef(null);

    //통합 분석, 플랫폼 별 분석으로 바로 이동하기 위한 함수
    function scrollTo(ref) {
        if (!ref.current) return;
        ref.current.scrollIntoView();
    }

    useEffect(async () => {
        dispatch(getMovieInfo({ id }));
        return () => {
            dispatch(clearPlatformData);
            dispatch(clearMovieInfo);
        };
    }, []);

    return (
        <div css={detailPageWrapper}>
            <MovieInfo />
            <ul css={tabStyle}>
                <li onClick={() => scrollTo(integratedAnalysisRef)}>통합 분석</li>
                <li onClick={() => scrollTo(PlatformAnalysisRef)}>플랫폼 분석</li>
            </ul>
            <IntegratedAnalysis ref={integratedAnalysisRef} />
            <PlatformAnalysis ref={PlatformAnalysisRef} />
            <div css={goBackBtnArea}>
                <Button onClick={() => history.goBack()}>목록으로 돌아가기</Button>
            </div>
            <BackTop>
                <div style={style}>맨 위로</div>
            </BackTop>
        </div>
    );
};

export default DetailPage;
