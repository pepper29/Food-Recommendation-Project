import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    matchedMovieList: [],
    title: "",
    page: 0,
    sort: "recent",
    N: 12,
    length: 0,
    loading: false,
    error: ""
};

/* [검색 페이지] 제목으로 검색된 영화 리스트를 불러옴 */
export const getMovieListByTitle = createAsyncThunk("GET_MOVIE_DATA_TITLE", async (args, ThunkAPI) => {
    const { SearchedMovieSlice } = ThunkAPI.getState();
    try {
        const filteredMovies = await axios.post("/api/search", {
            title: SearchedMovieSlice.title,
            page: SearchedMovieSlice.page,
            sort: SearchedMovieSlice.sort,
            N: SearchedMovieSlice.N
        });
        console.log(filteredMovies.data)
        return filteredMovies.data;
    } catch (err) {
        console.log("제목과 관련된 영화 정보를 얻는데 실패했습니다", err);
        return [];
    }
});

export const SearchedMovieSlice = createSlice({
    name: "SearchedMovieSlice",
    initialState,
    reducers: {
        clearState(state, action) {
            state.matchedMovieList = [];
            state.page = 1;
            state.sort = "";
            state.error = "";
        },
        setTitle(state, action) {
            state.title = action.payload.keyword;
            console.log(state.title);
        },
        setPage(state, action) {
            state.page = action.payload.page - 1;
            console.log(state.page);
        }, 
        setSort(state, action){
            state.sort = action.payload;
            console.log(state.sort);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovieListByTitle.rejected, (state, action) => {
            state.loading = false;
            state.matchedMovieList = [];
            state.error = action.payload;
        });
        builder.addCase(getMovieListByTitle.pending, (state) => {
            state.loading = true;
            state.matchedMovieList = [];
            state.error = "";
        });
        builder.addCase(getMovieListByTitle.fulfilled, (state, action) => {
            state.matchedMovieList = action.payload.content;
            state.length = action.payload.length;
            state.loading = false;
            state.error = "";
        });
    }
});

export const { clearState, setTitle, setPage, setSort } = SearchedMovieSlice.actions;
export default SearchedMovieSlice.reducer;
