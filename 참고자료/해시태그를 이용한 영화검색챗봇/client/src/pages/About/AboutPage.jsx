/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Tag } from "antd";
import { Divider } from "antd";

import logo from "../../assets/logo.png";

const BannerStyle = css`
    text-align: center;
    height: 35vh;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 35%;
        object-fit: cover;
    }
`;

function Banner() {
    return (
        <div css={BannerStyle}>
            <img src={logo} alt="심심해시 메인 배너 이미지" />
        </div>
    );
}

const AboutServiceWrapper = css`
    line-height: 2.2rem;

    ol {
        margin-top: 20px;
    }

    h2 {
        display: inline-block;
        color: white;
        font-weight: bold;
        margin-bottom: 30px;
    }
`;

const AboutSimSimHashStyle = css`
    h2 {
        width: 540px;
    }

    ol {
        margin-top: 50px;
        li {
            display: flex;
            align-items: center;
            gap: 30px;
        }
    }
`;

const AboutGoal = css`
    margin-top: 85px;
    h2 {
        width: 300px;
    }
    ol {
        li {
            margin-bottom: 35px;
            span {
                color: white;
                font-size: 1.8rem;
                font-weight: bold;
            }
        }
    }
`;

const highligher = css`
    background: linear-gradient(to top, rgb(246, 45, 168) 50%, transparent 50%);
`;

const CustomSelectedTagStyle = css`
    color: #fff;
    background: linear-gradient(to bottom right, rgb(252, 4, 65), rgba(246, 45, 168, 0.93));
    font-size: 1rem;
    border-color: transparent;
    margin-right: 0;

    .ant-tag-close-icon {
        font-size: 1rem;
    }
`;

const tagList = css`
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

function AboutSimSimHash() {
    const data = {
        labels: ["네이버", "다음", "왓챠", "씨네21"],
        datasets: [
            {
                label: "# 명 참여",
                data: [100, 50, 100, 30],
                backgroundColor: [
                    "rgb(23 175 61 / 34%)",
                    "rgb(65 45 246 / 34%)",
                    "rgb(246 45 168 / 34%)",
                    "rgb(173 35 35 / 34%)"
                ],
                borderColor: [
                    " rgba(23, 175, 61, 0.93)",
                    "rgba(65, 45, 246, 0.93)",
                    "rgba(246, 45, 168, 0.93)",
                    "rgba(173, 35, 35, 0.93)"
                ],
                borderWidth: 1
            }
        ]
    };

    const wordCloud = css`
        width: 250px;
        height: 250px;
    `;

    const visualBox = css`
        /* border: 1px solid #f62da8;
        background-color: rgba(240, 240, 240, 0.122);
        border-radius: 10px; */
        height: 250px;
        width: 250px;
    `;

    return (
        <section css={AboutServiceWrapper}>
            <div css={AboutSimSimHashStyle}>
                <h2 css={highligher}>#심심해시는 어떤 서비스인가요?</h2>
                <p>
                    #심심해시는 다양한 영화 리뷰 사이트에서 평점과 리뷰 데이터를 통합, 분석을
                    진행하고 시각화하여 이용자에게 한눈에 비교 분석할 방법을 제공합니다.
                </p>
                <ol>
                    <li>
                        <div css={visualBox}>
                            <Pie data={data} />
                        </div>
                        <p>
                            여러 영화 웹사이트에서 모은 데이터를 통합하여 분석하기 때문에 편향성을
                            줄일 수 있습니다.
                        </p>
                    </li>
                    <li>
                        <div css={visualBox}>
                            <div css={wordCloud}></div>
                        </div>
                        <p>
                            하나의 영화에 대한 데이터를 분석한 결과를 한 페이지에서 핵심 키워드,
                            워드 클라우드, 도표 등으로 시각화하여 제공하기 때문에 이용자가 한눈에
                            비교할 수 있고 시간을 절약할 수 있습니다.
                        </p>
                    </li>

                    <li>
                        <div css={visualBox}>
                            <div css={tagList}>
                                <Tag css={CustomSelectedTagStyle}>#신기한</Tag>
                                <Tag css={CustomSelectedTagStyle}>#막장인</Tag>
                                <Tag css={CustomSelectedTagStyle}>#기적</Tag>
                            </div>
                        </div>
                        <p>
                            이미 어떤 영화에 대해 찾아볼지를 알고 있는 이용자가 아니더라도 핵심
                            키워드를 활용한 필터링 기능을 통해 이용자의 취향에 맞는 작품을 찾을 수
                            있습니다.
                        </p>
                    </li>
                </ol>
            </div>
            <div css={AboutGoal}>
                <h2 css={highligher}>#심심해시의 목표</h2>
                <ol>
                    <li>
                        <span>첫째로,</span> OTT 서비스에서 제공하는 콘텐츠 분류 방법이나 검색 기능,
                        추천 알고리즘의 불편함을 해결합니다.
                    </li>
                    <li>
                        <span>둘째로,</span> OTT 서비스와 관련된 데이터를 바탕으로 이용자에게 특정
                        콘텐츠 관련 해시태그로 표현된 핵심 키워드 및 웹 사이트별 통합된 리뷰 정보를
                        제공한다면, 더욱 더 간편하고 개인화된 취향의 작품을 발견할 수 있고, 기존
                        문제점에 대한 해결책이 될 수 있습니다.
                    </li>
                    <li>
                        <span>마지막으로,</span> 코로나 전후 상황을 비교했을 때 특정 콘텐츠에 대한
                        선호도나 이용자들의 평가와 반응에서 뚜렷한 차이를 발견한다면, 코로나 시대
                        유의미한 인사이트를 제공할 수 있을 것입니다.
                    </li>
                </ol>
            </div>
        </section>
    );
}

function OTTwithCovid() {
    return <section></section>;
}

const profileStyle = css`
    width: 300px;
    padding: 20px;
    background-color: #e8e8e8;
    border-radius: 10px;
    color: #0d0d0d;

    div {
        text-align: center;
        div:first-of-type {
            height: 136px;
            background-color: #fafafa73;
            border-radius: 12px;
        }
    }
`;

const profileImgStyle = css`
    height: 200px;
    background-color: #bfbfbf73;
    border-radius: 10px;
`;

const profileRoleStyle = css`
    margin-top: 13px;
    line-height: 1.4rem;

    p:first-of-type {
        font-weight: bold;
        margin-bottom: 15px;
    }
`;

function Profile({ name, role }) {
    return (
        <li css={profileStyle}>
            <div>
                <div css={profileImgStyle}>
                    <img alt={name} />
                </div>
                <div css={profileRoleStyle}>
                    <p>{name}</p>
                    {role.map((r) => (
                        <p>{r}</p>
                    ))}
                </div>
            </div>
        </li>
    );
}

const TeamListStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 1000px;
    justify-content: space-between;
    flex-direction: row;
    margin: 0 auto;
    gap: 30px;
`;

function TeamList() {
    return (
        <section>
            <ul css={TeamListStyle}>
                <Profile name="박정윤" role={["#팀장", "#데이터분석"]} />
                <Profile name="김가원" role={["#백엔드 개발", "#데이터 분석"]} />
                <Profile name="김수연" role={["#데이터분석"]} />
                <Profile name="박지호" role={["#프론트엔드 개발", "#데이터 분석"]} />
                <Profile name="사은수" role={["#프론트엔드 개발"]} />
                <Profile name="송성곤" role={["#백엔드 개발", "#데이터 분석"]} />
            </ul>
        </section>
    );
}

const ArticleStyle = css`
    width: 80%;
    margin: 0 auto;
    color: #d9d9d9;
    font-size: 1.35rem;

    section {
        padding: 50px 40px;
    }

    h2 {
        color: white;
        font-size: 2rem;
        font-weight: bold;
    }
`;

const DividerStyle = css`
    &.ant-divider-horizontal.ant-divider-with-text {
        border-top-color: white;
        margin-top: 30px;
    }
`;

const footerStyle = css`
    height: 400px;
    background-color: #2d2f32;
    margin-top: 50px;
    color: white;
    text-align: center;
    line-height: 400px;
`;

function AboutPage() {
    return (
        <div>
            <Banner />
            <article css={ArticleStyle}>
                <AboutSimSimHash />
                <Divider css={DividerStyle}>
                    <h2>OTT 서비스와 코로나</h2>
                </Divider>
                <OTTwithCovid />
                <Divider css={DividerStyle}>
                    <h2>팀 Lucky Seven의 팀원을 소개합니다!</h2>
                </Divider>
                <TeamList />
            </article>
            <footer css={footerStyle}>github</footer>
        </div>
    );
}

export default AboutPage;
