"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheCowProvider = exports.CacheCowDispatchContext = exports.CacheCowStateContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useCacheCowApi_1 = __importDefault(require("../hooks/useCacheCowApi"));
exports.CacheCowStateContext = (0, react_1.createContext)({});
exports.CacheCowDispatchContext = (0, react_1.createContext)({ dispatch: undefined, api: undefined });
const CacheCowProvider = ({ apiKey, mus, children }) => {
    const [state, setState] = (0, react_1.useState)(mus.reduce((data, m) => (Object.assign(Object.assign({}, data), { [m]: {} })), {}));
    const api = (0, useCacheCowApi_1.default)(apiKey);
    return ((0, jsx_runtime_1.jsx)(exports.CacheCowStateContext.Provider, Object.assign({ value: state }, { children: (0, jsx_runtime_1.jsx)(exports.CacheCowDispatchContext.Provider, Object.assign({ value: { dispatch: setState, api } }, { children: children })) })));
};
exports.CacheCowProvider = CacheCowProvider;
