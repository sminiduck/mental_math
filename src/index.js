import createRouter from "./router.js";
import "./pages/home.js";
import "./pages/calc.js";

const pages = {
  home: () => document.getElementById("app").innerHTML = `<home-page></home-page>`,
  calc: (params) => document.getElementById("app").innerHTML = `<calculation-page name="${params.name}"></calculation-page>`
}

const router = createRouter();

router
  .addRoute("#/", pages.home)
  .addRoute("#/calc/:name", pages.calc)
  .start();

window.addEventListener("click", event => {
  if (event.target.matches("[data-navigate]")) {
    router.navigate(event.target.dataset.navigate);
  }
});