import { React } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import SearchPage from "./pages/Search/SearchPage";
import DetailPage from "./pages/Detail/DetailPage";
import AboutPage from "./pages/About/AboutPage";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

function Routers() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route exact path="/search" render={(props) => <SearchPage {...props} />} />
                <Route exact path="/movie/:id" render={(props) => <DetailPage {...props} />} />
                <Route exact path="/aboutus">
                    <AboutPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routers;
