// router.js
export default class Router {
    constructor() {
        this.routes = {};
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
        //window.location.pathname가 "/mental_math/"일때 PREFIX = "/mental_math"
        //window.location.pathname가 "/"일때 PREFIX = ""



        this.handleRoute();
    }

    addRoute(path, component) {
        this.routes[`${PREFIX}${path}`] = component;
        return this;
    }

    navigate(path) {
        history.pushState(null, "", path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const component = this.routes[path] || this.routes["/404"];
        document.getElementById("app").innerHTML = `<${component}></${component}>`;
    }
}
