/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlatformWord, setPlatformName } from "../../modules/DetailPage/wordCloudSlice";

import WordCloud from "./WordCloud";

const platformAreaWrapper = css`
    h3 {
        color: #fff;
        font-weight: bold;
        font-size: 2.3rem;
    }
`;

const platformBox = css`
    position: relative;
    background-color: #222222;
    color: #fff;
    width: 90%;
    margin: 20px auto;
    line-height: 3rem;
    border-radius: 20px;

    h4 {
        color: #fff;
        font-size: 1.5rem;
        font-weight: bold;
    }

    button {
        position: absolute;
        bottom: 0;
        right: 30px;
        margin-bottom: 20px;
        border: none;
        clear: both;
        background-color: transparent;
        cursor: pointer;
        color: rgba(246, 45, 168, 0.93);
    }
`;

const platformHeaderWrapper = css`
    padding: 30px;
`;

const platformBoxHeader = css`
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 20px;
`;

const tagStyle = ({ name }) => css`
    color: #fff;
    padding: 3px 13px 5px 13px;
    border-radius: 20px;
    text-align: center;
    margin-right: 10px;

    ${name === "네이버" &&
    ` border: 1px solid rgba(23, 175, 61, 0.93);
    background-color: rgb(23 175 61 / 34%);`}

    ${name === "왓챠" &&
    ` border: 1px solid rgba(246, 45, 168, 0.93);
    background-color: rgb(246 45 168 / 34%);`}

    ${name === "다음" &&
    ` border: 1px solid rgba(65, 45, 246, 0.93);
    background-color: rgb(65 45 246 / 34%);`}

    ${name === "씨네21" &&
    ` border: 1px solid rgba(173, 35, 35, 0.93);
    background-color: rgb(173 35 35 / 34%);`}
`;

const hiddenPlatformInfo = ({ expanded, name }) => css`
    transition: all 0.3s;
    background-color: #2a2a2a;
    color: white;
    ${expanded
        ? `height: 688px;border-top: 2px solid height: 600px;padding:30px 50px;`
        : `height:0vh; overflow: hidden;`};

    ${expanded && name === "네이버" && ` border-top: 1px solid rgba(23, 175, 61, 0.93);`}

    ${expanded && name === "왓챠" && ` border-top: 1px solid rgba(246, 45, 168, 0.93);`}

    ${expanded && name === "다음" && ` border-top: 1px solid rgba(65, 45, 246, 0.93);`}

    ${expanded && name === "씨네21" && ` border-top: 1px solid rgba(173, 35, 35, 0.93);`}

    div {
        margin-bottom: 30px;
    }
    p {
        font-weight: bold;
        font-size: 1.5rem;
    }
`;

function PlatformBox({ name, enName, score, wholeScore, noreview, tags, title }) {
    const dispatch = useDispatch();
    const { words } = useSelector((state) => state.wordCloudSlice);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (expanded) {
            /* 백엔드에 플랫폼 분석 정보 요청 */
            dispatch(setPlatformName({ name }));
            if (words[name].length === 0) {
                dispatch(getPlatformWord());
            }
        }
    }, [expanded]);

    return (
        <li css={platformBox}>
            {/* 플랫폼 간단 정보 : 영화 플랫폼 별점 정보 / 대표 키워드 */}
            <div css={platformHeaderWrapper}>
                <div css={platformBoxHeader}>
                    <h4>{name}</h4>
                    <p>
                        {score}점 / {wholeScore}점 <span>({noreview}명 참여)</span>
                    </p>
                </div>
                <div>
                    {tags.map((tag) => (
                        <span css={tagStyle({ name: name })}>{tag}</span>
                    ))}
                </div>
            </div>
            {/* 숨겨진 플랫폼 분석 정보 : 아코디언 박스 접근성 규칙 준수 http://web-accessibility.carnegiemuseums.org/code/accordions/*/}
            <div
                css={hiddenPlatformInfo({ expanded: expanded, name: name })}
                aria-hidden={!expanded}
                id={`content-${enName}`}
            >
                {/* 워드 클라우드 정보 */}
                <div>
                    <p>
                        {name} 유저들은 <br /> "{title}"을 이렇게 평가했어요!
                    </p>
                    <div style={{ height: "200px", width: "100%", border: "1px solid white" }}>
                        <WordCloud name={name} />
                    </div>
                </div>
                {/* 더 많은 태그 목록 */}
                <div>
                    <p>{name} 유저들은 아래의 키워드로 표현했어요!</p>
                    <div
                        style={{ height: "200px", width: "100%", border: "1px solid white" }}
                    ></div>
                </div>
            </div>
            <button
                aria-controls={`content-${enName}`}
                aria-expanded={expanded}
                id={`accordion-control-${enName}`}
                onClick={() => {
                    setExpanded(!expanded);
                }}
            >
                {expanded ? "접기" : "더보기"}
            </button>
        </li>
    );
}
const PlatformAnalysis = React.forwardRef(({ props }, ref) => {
    const { movieInfo, loading } = useSelector((state) => state.movieInfoSlice);
    console.log(movieInfo);
    const platforms = [
        {
            name: "네이버",
            enName: "naver",
            score: movieInfo.platform_summary.naver,
            wholeScore: 10,
            noreview: movieInfo.platform_summary.naver_count,
            tags: movieInfo.platform_summary.naver_tag
        },
        {
            name: "다음",
            enName: "daum",
            score: movieInfo.platform_summary.daum,
            wholeScore: 10,
            noreview: movieInfo.platform_summary.naver.daum_count,
            tags: movieInfo.platform_summary.daum_tag
        },
        {
            name: "왓챠",
            enName: "watcha",
            score: movieInfo.platform_summary.watcha,
            wholeScore: 10,
            noreview: movieInfo.platform_summary.naver.watcha_count,
            tags: movieInfo.platform_summary.watcha_tag
        },
        {
            name: "씨네21",
            enName: "cine21",
            score: movieInfo.platform_summary.cine21,
            wholeScore: 10,
            noreview: movieInfo.platform_summary.naver.cine21_count,
            tags: movieInfo.platform_summary.cine21_tag
        }
    ];

    return (
        <div ref={ref} css={platformAreaWrapper}>
            <h3>플랫폼 별 분석</h3>
            <ul aria-label="아코디언 컨트롤 버튼">
                {platforms.map((platform) => (
                    <PlatformBox
                        name={platform.name}
                        enName={platform.enName}
                        score={platform.score}
                        wholeScore={platform.wholeScore}
                        noreview={platform.noreview}
                        tags={platform.tags}
                        title={movieInfo.movie.title}
                    />
                ))}
            </ul>
        </div>
    );
});

export default PlatformAnalysis;
