/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useDispatch, useSelector } from "react-redux";

import { Tag } from "antd";
import { removeTag } from "../../modules/MainPage/tagDataSlice";

const CustomSelectedTagStyle = css`
    color: #fff;
    background: linear-gradient(to bottom right, rgb(252, 4, 65), rgba(246, 45, 168, 0.93));
    font-size: 1rem;
    border-color: transparent;

    .ant-tag-close-icon {
        font-size: 1rem;
    }
`;

const SelectedTagListWrapper = css`
    width: 40rem;
    height: 2.5rem;
    margin: 20px auto;
    border: 0.1rem solid #f0f0f099;
    border-radius: 30px;
    padding: 7px 20px;
    box-shadow: 1px -1px 10px 3px #f0f0f01c;
`;

const SelectedTagListInner = css`
    display: flex;
    overflow-x: auto;

    &::-webkit-scrollbar {
        height: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
`;

function SelectedTagList() {
    const dispatch = useDispatch();
    const { selectedTagList } = useSelector((state) => state.mainTagDataSlice);

    const onRemoveSelectedTag = (selectedTag) => {
        //selectedTag: 제거할 태그 이름
        dispatch(removeTag({ selectedTag }));
    };

    return (
        <div css={SelectedTagListWrapper}>
            <div css={SelectedTagListInner}>
                {selectedTagList.map((selectedTag) => (
                    <Tag
                        key={selectedTag}
                        onClose={() => onRemoveSelectedTag(selectedTag)}
                        closable
                        css={CustomSelectedTagStyle}
                    >
                        #{selectedTag}
                    </Tag>
                ))}
            </div>
        </div>
    );
}

export default SelectedTagList;
