// router.js
export default class Router {
    constructor() {
        this.routes = {};
    }

    init() {
        console.log("init");
        console.log("prefix: ", window.PREFIX);
        window.addEventListener("popstate", () => this.handleRoute());
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
                            const operation = target.closest('.modal').getAttribute('data-operation');
                            this.navigate(`/calc?operation=${operation}`);
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
        this.routes[`${window.PREFIX}${path}`] = component;
        return this;
    }

    navigate(path) {
        history.pushState(null, "", `${window.PREFIX}${path}`);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const search = window.location.search;
        console.log(`handleRoute_path: ${path}`);
        const component = this.routes[path] || this.routes["/404"];
        console.log("component: ", component);
        document.getElementById("app").innerHTML = `<${component} ${search}></${component}>`;
    }
}
