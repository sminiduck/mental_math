// router.js
export default class Router {
  constructor(routes) {
      this.routes = routes;
  }

  init() {
      window.addEventListener("popstate", () => this.handleRoute());
      document.addEventListener("DOMContentLoaded", () => {
          document.body.addEventListener("click", (e) => {
              if (e.target.matches("[data-link]")) {
                  e.preventDefault();
                  this.navigate(e.target.getAttribute("href"));
              }
          });
      });
      // 페이지 로드 시 한 번만 handleRoute 호출
      this.handleRoute();
  }

  navigate(path) {
      history.pushState(null, "", path);
      this.handleRoute();
  }

  handleRoute() {
      const path = window.location.pathname;
      const component = this.routes[path] || this.routes["/404"];
      document.getElementById("app").innerHTML = `<${component}></${component}>`;
      console.log("route: ", path);
  }
}
