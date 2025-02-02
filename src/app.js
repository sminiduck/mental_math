// app.js
window.PREFIX = window.location.pathname.startsWith("/mental_math") ? "/mental_math" : "";

import Router from "./router.js";
import "./pages/about.js";
import "./pages/home.js";

const appRouter = new Router();
appRouter
    .addRoute('/', 'home-page')
    .addRoute('/about', 'about-page')
    .addRoute('/calc', 'calc-page')
    .addRoute('/404', 'not-found-page')
    .init();
