import METHOD from "../enums/methods.enum";
interface RouteConfigProps {
    method: METHOD;
    path: string;
}
declare const route: import("express-serve-static-core").Router;
declare function routeConfig({ method, path }: RouteConfigProps): MethodDecorator;
export { route, routeConfig };
