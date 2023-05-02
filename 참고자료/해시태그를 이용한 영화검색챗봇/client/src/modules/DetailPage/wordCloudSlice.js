import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie_id: "",
    selectedPlatform: "",
    words: {
        "네이버": [],
        "왓챠": [],
        "다음": [],
        "씨네21": []
    },
    loading: "",
    error: ""
};

export const getPlatformWord = createAsyncThunk("GET_PLATFORM_WORDCLOUD", async (args, ThunkAPI) => {
    /* 백엔드 [GET] /platform_detail 요청 */
    console.log('get platform word');
    const words = [
        {
          text: '영화',
          value: 64,
        },
        {
          text: '우정',
          value: 11,
        },
        {
          text: '미친',
          value: 16,
        },
        {
          text: '대박',
          value: 17,
        },
    ]
    return words;
})


export const wordCloudSlice = createSlice({
    name: "wordCloudSlice",
    initialState,
    reducers: {
        clearPlatformData(state,action){
            state.movie_id = "";
            state.words = {
                naver: [],
                watcha: [],
                daum: [],
                cine: []
            };
            state.selectedPlatform = ""
        },
        setPlatformName(state, action) {
            //action.payload: 선택한 플랫폼 한글 이름
            state.selectedPlatform = action.payload.name;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPlatformWord.rejected, (state, action) => {
            state.loading = false;
            state.words[state.selectedPlatform] = [];
            state.error = action.payload;
        });

        builder.addCase(getPlatformWord.pending, (state) => {
            state.loading = true;
            state.words[state.selectedPlatform] = [];
            state.error = "";
        });

        builder.addCase(getPlatformWord.fulfilled, (state, action) => {
            console.log(state.selectedPlatform, action.payload);
            state.words[state.selectedPlatform] = action.payload;
            state.loading = false;
            state.error = ""
        });
    }
});

export const { clearPlatformData, setPlatformName } = wordCloudSlice.actions;
export default wordCloudSlice.reducer;