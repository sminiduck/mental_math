// app.js
import Router from "./router.js";
import "./pages/about.js";
import "./pages/home.js";

// 라우트 설정
const routes = {
    "/": "about-page",
    "/about": "home-page",
};


const appRouter = new Router(routes);
appRouter.init();
