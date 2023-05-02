/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

const divStyle = css`
    width: 400px;
`;

const graphStyle = css`
    margin-bottom: 40px;

    @media screen and (max-width: 600px) {
        width: 90%;
        text-align: center;
        margin: 0 auto 20px auto;
    }
`;

export const ShowGraph = ({ labels, noreviewarr }) => {
    const graph = noreviewarr;
    const data = {
        type: "bar",
        labels: labels,
        datasets: [
            {
                label: "",
                data: graph,
                backgroundColor: ["rgba(255, 86, 213, 0.2)"],
                borderColor: ["rgba(246, 45, 168, 0.93)"],
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    return (
        <div css={divStyle}>
            <Bar data={data} options={options} css={graphStyle} />
        </div>
    );
};
