// app.js
import Router from "./router.js";
import "./pages/about.js";
import "./pages/home.js";

// 라우트 설정
// const PREFIX = "";
const PREFIX = "/mental_math";

const appRouter = new Router();
appRouter
    .addRoute(`${PREFIX}/`, 'home-page')
    .addRoute(`${PREFIX}/about`, 'about-page')
    .addRoute(`${PREFIX}/calc`, 'calc-page')
    .addRoute(`${PREFIX}/404`, 'not-found-page')
    .init();
appRouter.init();
