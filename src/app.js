// app.js
import Router from "./router.js";
import "./pages/home.js";
import "./pages/about.js";

// 라우트 설정
const routes = {
    "/": "about-page",
    "/about": "about-page",
};

window.addEventListener('DOMContentLoaded', function() {
    const appRouter = new Router(routes);
    appRouter.init();
});


