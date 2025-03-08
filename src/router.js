export default function createRouter() {
  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
  const URL_REGEXP = '([^\\/]+)'

  const routes = [];

  const router = {
    addRoute(fragment, component) {
      const params = [];
      
      const parsedFragment = fragment.replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName);
        return URL_REGEXP;
      }).replace(/\//g, "\\/");
      
      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });
      
      return this;
    },
    start() {
      console.log(window.location.href, window.location.hash);
      window.location.hash = window.location.hash || '#/';
      console.log(window.location.href);
      
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);

        matches.shift(); // 배열의 첫번째 값에는 url 전체가 담겨있으므로 제거해준다.
        matches.forEach((paramValue, index) => {
          const paramName = route.params[index];
          params[paramName] = paramValue;
        });
        // params = {name: 'IU', song: 'raindrop'}
        return params;
      };

      const checkRoutes = () => {
        const currentRoute = routes.find(route =>
          route.fragmentRegExp.test(window.location.hash));

        if (!currentRoute) {
          console.log(window.location.hash);
          console.error('No route found for the current hash.');
          return;
        }

        if (currentRoute.params.length) {
          // path parameters가 있는 url인 경우
          const urlParams = getUrlParams(currentRoute, window.location.hash)
          currentRoute.component(urlParams);
        } else {
          currentRoute.component();
        }

      };

      window.addEventListener('hashchange', checkRoutes);
      checkRoutes();
    },
    navigate(fragment, replace = false) {
      if (replace) {
        const href = window.location.href.replace(window.location.hash, "#" + fragment);
        window.location.replace(href);
      } else {
        window.location.hash = fragment;
      }
    }
  };

  return router;
}