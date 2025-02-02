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
                    console.log("data-link");
                    e.preventDefault();
                    this.navigate(e.target.getAttribute("href"));
                }
            });
        });
        this.handleRoute();
    }

    addRoute(path, component) {
        this.routes[`${window.PREFIX}${path}`] = component;
        console.log(`${window.PREFIX}${path}`);
        return this;
    }

    navigate(path) {
        history.pushState(null, "", path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        console.log(path);
        const component = this.routes[path] || this.routes["/404"];
        document.getElementById("app").innerHTML = `<${component}></${component}>`;
    }
}
