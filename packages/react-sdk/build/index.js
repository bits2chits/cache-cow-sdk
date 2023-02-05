"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheCowProvider = exports.useCacheCowStream = exports.useCacheCowDispatch = exports.useCacheCowApi = void 0;
const useCacheCowApi_1 = __importDefault(require("./hooks/useCacheCowApi"));
exports.useCacheCowApi = useCacheCowApi_1.default;
const useCacheCowDispatch_1 = __importDefault(require("./hooks/useCacheCowDispatch"));
exports.useCacheCowDispatch = useCacheCowDispatch_1.default;
const useCacheCowStream_1 = __importDefault(require("./hooks/useCacheCowStream"));
exports.useCacheCowStream = useCacheCowStream_1.default;
const CacheCow_1 = require("./context/CacheCow");
Object.defineProperty(exports, "CacheCowProvider", { enumerable: true, get: function () { return CacheCow_1.CacheCowProvider; } });
