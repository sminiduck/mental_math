// app.js
window.PREFIX = window.location.pathname.startsWith("/mental_math") ? "/mental_math" : "";

import Router from "./router.js";
import "../src/pages/home.js";
import "../src/pages/calc.js";

const appRouter = new Router();
appRouter
  .addRoute('/', 'home-page')
  .addRoute('/calc', 'calculation-page')
  .addRoute('/404', 'not-found-page')
  .init();
