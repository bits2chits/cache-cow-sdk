"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CacheCow_1 = require("../context/CacheCow");
function useCacheCowDispatch() {
    const dispatch = (0, react_1.useContext)(CacheCow_1.CacheCowDispatchContext);
    return dispatch;
}
exports.default = useCacheCowDispatch;
