// app.js
import Router from "./router.js";
import "./pages/home.js";
import "./pages/about.js";

// 라우트 설정
const routes = {
    "/": "about-page",
    "/about": "about-page",
};

// 라우터 생성
const appRouter = new Router(routes);
appRouter.init();
