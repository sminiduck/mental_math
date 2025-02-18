// router.js
export default class Router {
  constructor() {
    this.routes = {};
  }

  init() {
    console.log("init");
    console.log("prefix: ", window.PREFIX);
    window.addEventListener("hashchange", () => this.handleRoute());
    document.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", (e) => {
        let target = e.target;

        // Shadow DOM 내의 요소를 탐색
        while (target && target !== document) {
          if (target.matches("[data-link]")) {
            console.log("data-link");
            e.preventDefault();
            const href = target.getAttribute("href");
            if (href) {
              this.navigate(href);
            } else {
              const queryParams = this.getQueryParams(target);
              this.navigate(`/calc?${queryParams}`);
            }
            return;
          }
          target = target.parentNode || target.host;
        }
      });
    });
    this.handleRoute();
    console.log("init_end");
  }

  addRoute(path, component) {
    this.routes[`#${path}`] = component;
    return this;
  }

  navigate(path) {
    if (window.location.hash !== `#${path}`) {
      window.location.hash = `#${path}`;
    }
  }

  handleRoute() {
    const hash = window.location.hash || '#/';
    const [path, search] = hash.split('?');
    console.log(`handleRoute_path: ${path}`);
    console.log(`handleRoute_search: ${search}`);
    const page = this.routes[path] || this.routes["#/404"];
    console.log("page: ", page);
    document.getElementById("app").innerHTML = `<${page} ${search ? '?' + search : ''}></${page}>`;
  }

  getQueryParams(target) {
    const params = new URLSearchParams();
    const attributes = target.attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      if (attr.name.startsWith('data-param-')) {
        const paramName = attr.name.replace('data-param-', '');
        params.append(paramName, attr.value);
      }
    }
    return params.toString();
  }
}
