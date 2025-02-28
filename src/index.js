//index.js
import createRouter from "./router.js";
import "./pages/home.js";
import "./pages/calc.js";

const pages = {
  home: () => document.getElementById("app").innerHTML = `<home-page></home-page>`,
  calc: (params) => { 
    document.getElementById("app").innerHTML = `<calculation-page oper="${params.oper}"></calculation-page>`;
    document.querySelector("calculation-page").data = {'test': 'test'};
  }
}

const router = createRouter();

router
  .addRoute("#/", pages.home)
  .addRoute("#/calc/:oper", pages.calc)
  .start();

window.addEventListener("click", event => {
  if (event.target.matches("[data-navigate]")) {
    router.navigate(event.target.dataset.navigate);
  }
});