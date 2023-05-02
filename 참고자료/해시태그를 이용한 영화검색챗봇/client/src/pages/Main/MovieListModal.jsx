/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import Poster from "../../components/Poster";

import { Button, Modal } from "antd";

const buttonDivStyle = css`
    width: 65rem;
    margin: 0 auto;
    text-align: right;
`;

const buttonStyle = css`
    color: rgba(246, 45, 168, 0.93);
`;

const modalStyle = css`
    .ant-modal-body {
        height: 75vh;
        overflow-y: scroll;
        background-color: #333333;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        row-gap: 30px;
    }
`;

function MovieListModal() {
    const { movieList } = useSelector((state) => state.mainTagDataSlice);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div css={buttonDivStyle}>
                <Button type="text" onClick={showModal} css={buttonStyle}>
                    더 보기
                </Button>
            </div>
            <Modal
                title="검색결과 더 보기"
                width="70vw"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                css={modalStyle}
                footer={null}
            >
                {movieList.map(([key, movie]) => {
                    return <Poster item={movie} page="main" />;
                })}
            </Modal>
        </div>
    );
}

export default MovieListModal;
