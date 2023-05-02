/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTag, getRandomTagList } from "../../modules/MainPage/tagDataSlice";

import { Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const ReloadBtnStyle = css`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.4rem;
`;

const TagListWrapper = css`
    width: 51rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 9px;
`;

const customTagStyle = ({ checked }) => css`
    color: #fff;
    background: ${checked
        ? "linear-gradient(to bottom right, rgb(252, 4, 65), rgba(246, 45, 168, 0.93))"
        : "#45464B"};
    padding: 7px 9px;
    font-size: 1rem;

    &:not(.ant-tag-checkable-checked):hover {
        color: #fff;
        transform: scale(1.1);
    }
`;

function TagList() {
    const dispatch = useDispatch();
    const { tagList, selectedTagList } = useSelector((state) => state.mainTagDataSlice);
    const { CheckableTag } = Tag;

    const getlTagList = async () => {
        dispatch(getRandomTagList());
    };

    useEffect(() => {
        getlTagList();
    }, []);

    //선택한 태그 리스트에 해당 태그가 포함되어 있는지 확인하는 함수
    const isInSelectedTagList = (tag) => {
        return selectedTagList.includes(tag);
    };

    const onSelectTag = (tag) => {
        //tag: 선택한 태그 이름
        if (!isInSelectedTagList(tag)) {
            dispatch(addTag({ tag }));
        }
    };

    return (
        <div css={TagListWrapper}>
            {tagList.map((tag, index) => (
                <CheckableTag
                    key={`tag${index}`}
                    onClick={() => onSelectTag(tag)}
                    checked={isInSelectedTagList(tag)}
                    css={customTagStyle({ checked: isInSelectedTagList(tag) })}
                >
                    #{tag}
                </CheckableTag>
            ))}
            <ReloadOutlined onClick={() => getlTagList()} css={ReloadBtnStyle} />
        </div>
    );
}

export default TagList;
