// app.js
window.PREFIX = window.location.pathname.startsWith("/mental_math") ? "/mental_math" : "";

import Router from "./router.js";
import "./pages/home.js";
import "./pages/calc.js";

const appRouter = new Router();
appRouter
    .addRoute('/', 'calculation-page')
    .addRoute('/calc', 'calculation-page')
    .addRoute('/404', 'not-found-page')
    .init();
