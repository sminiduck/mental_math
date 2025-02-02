// app.js
window.PREFIX = window.location.pathname.startsWith("/mental_math") ? "/mental_math" : "";

import Router from "./router.js";
import "./pages/home.js";
import "./pages/calc.js";

const appRouter = new Router();
appRouter
    .addRoute('/', 'calc-page')
    .addRoute('/calc', 'calc-page')
    .addRoute('/404', 'not-found-page')
    .init();
