/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactWordcloud from 'react-wordcloud';
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

function WordCloud({name}){  
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 1,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  
  const { words } = useSelector((state) => state.wordCloudSlice);
  return (
    <ReactWordcloud options={options} words={words[name]}/>
  )
}

export default WordCloud;