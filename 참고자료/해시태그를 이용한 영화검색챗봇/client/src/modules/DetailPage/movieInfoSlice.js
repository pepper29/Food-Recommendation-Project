import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieInfo: {
        movie: {
            title: "",
            release_date: "",
            actor: "",
            director: "",
            summary: "",
            running_time: 0,
            poster: "",
            genre: "",
            rating: ""
        },
        total: {
            score: 0,
            tags: {}
        },
        platform_summary: {
            naver: 0.0,
            daum: 0.0,
            watcha: 0.0,
            cine: 0.0,
            naver_count: 0,
            daum_count: 0,
            watcha_count: 0,
            cine21_count: 0,
            naver_tag: ["", "", "", "", ""],
            daum_tag: ["", "", "", "", ""],
            watcha_tag: ["", "", "", "", ""],
            cine21_tag: ["", "", "", "", ""]
        }
    },
    loading: false,
    error: ""
};

export const getMovieInfo = createAsyncThunk("GET_MOVIE_INFO", async (args, ThunkAPI) => {
    console.log(args);
    /* 백엔드 [GET] /detail/<movie_id> 요청 */
    const response = {
        movie: {
            title: "007 노 타임 투 다이",
            release_date: "Thu, 21 MAY 2020 00:00:00 GMT",
            actor: "다니엘 크레이그(제임스 본드), 라미 말렉(샤핀), 라샤나 린치(노미)",
            director: "캐리 후쿠나가",
            summary: "가장 강력한 운명의 적과 마주하게된 제임스 본드의 마지막 미션이 시작된다",
            running_time: 126,
            poster:
                "https://movie-phinf.pstatic.net/20211001_121/16330536363187liBB_JPEG/movie_image.jpg?type=m203_290_2",
            rating: "청소년 관람불가",
            genre: "코미디, 드라마"
        },
        total: {
            score: 3.0,
            tags: ["대박", "미친", "코미디", "재미있는", "잔인한"]
        },
        platform_summary: {
            naver: 4.0 /*평점*/,
            daum: 3.0,
            watcha: 4.0,
            cine: 3.0,
            naver_count: 100 /*총 리뷰 갯수*/,
            daum_count: 200,
            watcha_count: 300,
            cine21_count: 400,
            naver_tag: ["대박1", "미친1", "코미디1", "재미있는1", "스릴1"],
            daum_tag: ["대박2", "미친2", "코미디2", "재미있는2", "스릴2"],
            watcha_tag: ["대박3", "미친3", "코미디3", "재미있는3", "스릴3"],
            cine21_tag: ["대박4", "미친4", "코미디4", "재미있는4", "스릴4"]
        }
    };

    return response;
});

export const movieInfoSlice = createSlice({
    name: "movieInfoSlice",
    initialState,
    reducers: {
        clearMovieInfo(state, action) {
            state.movieInfo = "";
            state.loading = false;
            state.error = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getMovieInfo.pending, (state) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(getMovieInfo.fulfilled, (state, action) => {
            state.movieInfo = action.payload;
            console.log(state.movieInfo);
            state.loading = false;
            state.error = "";
        });
    }
});

export const { clearMovieInfo } = movieInfoSlice.actions;
export default movieInfoSlice.reducer;
