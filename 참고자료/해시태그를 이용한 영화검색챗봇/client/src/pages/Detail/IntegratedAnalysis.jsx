/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ShowGraph } from "./ShowGraph";

const integrateAreaWrapper = css`
    h3 {
        color: #fff;
        font-size: 2.3rem;
        font-weight: bold;
    }
`;

const IntegratedAnalysis = React.forwardRef(({ movie }, ref) => {
    const { movieInfo, loading } = useSelector((state) => state.movieInfoSlice);
    return (
        <div css={integrateAreaWrapper} ref={ref}>
            <h3>통합 분석</h3>
            <ShowGraph
                labels={["네이버", "다음", "왓챠", "씨네21"]}
                noreviewarr={[
                    movieInfo.platform_summary.naver_count,
                    movieInfo.platform_summary.daum_count,
                    movieInfo.platform_summary.watcha_count,
                    movieInfo.platform_summary.cine21_count
                ]}
            />
        </div>
    );
});

export default IntegratedAnalysis;
