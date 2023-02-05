"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const api_1 = __importDefault(require("../libs/api"));
function useCacheCowApi(apiKey) {
    const [api, setApi] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        const api = new api_1.default(apiKey);
        api.auth();
        setApi(api);
    }, []);
    return api;
}
exports.default = useCacheCowApi;
