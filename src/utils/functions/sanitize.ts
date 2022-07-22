import * as xss from "xss";
import ErrorHandler from "../Classes/ErrorHandler";

function isValidType(type: string): boolean {
  return ["function", "symbol", "boolean", "undefined"].indexOf(type) !== -1;
}

export const Sanitize = (object: any): any => {
  try {
    if (isValidType(typeof object)) return;

    Object.keys(object).forEach(function (key) {
      if (object[key] && typeof object[key] === "object") {
        return Sanitize(object[key]);
      }

      if (typeof object[key] === "string") {
        object[key] = xss.filterXSS(object[key], {});
      }
    });

    return object;
  } catch (error) {
    return ErrorHandler.Unauthorized(error, "Campos inválidos");
  }
};
