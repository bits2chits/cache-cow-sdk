"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const CacheCow_1 = require("../context/CacheCow");
function useCacheCowState() {
    const state = (0, react_1.useContext)(CacheCow_1.CacheCowStateContext);
    return state;
}
exports.default = useCacheCowState;
