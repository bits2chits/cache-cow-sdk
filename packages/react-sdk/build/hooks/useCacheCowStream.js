"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ws_1 = __importDefault(require("ws"));
const useCacheCowDispatch_1 = __importDefault(require("./useCacheCowDispatch"));
const useCacheCowState_1 = __importDefault(require("./useCacheCowState"));
function useCacheCowStream() {
    const state = (0, useCacheCowState_1.default)();
    const { api, dispatch } = (0, useCacheCowDispatch_1.default)();
    const [streams, setStreams] = (0, react_1.useState)([]);
    // get streams
    (0, react_1.useEffect)(() => {
        if (!api) {
            return;
        }
        function getStreams() {
            return __awaiter(this, void 0, void 0, function* () {
                const streams = yield api.getStreams(Object.keys(state));
                setStreams(streams);
            });
        }
        getStreams();
    }, [api]);
    (0, react_1.useEffect)(() => {
        if (streams.length === 0 || !dispatch) {
            return;
        }
        const sockets = streams.map((s) => {
            const socket = new ws_1.default(s.socket);
            // socket.onopen = () => {
            //   setState('OPEN');
            // };
            // socket.onclose = () => {
            //   setState('CLOSED');
            // };
            socket.onmessage = (event) => {
                console.log('*** EVENT ***', event);
                dispatch(Object.assign(Object.assign({}, state), { [s.muName]: JSON.parse(event.data) }));
            };
            return socket;
        });
        return () => {
            sockets.forEach(socket => socket.close());
        };
    }, [dispatch, state]);
    return state;
}
exports.default = useCacheCowStream;
