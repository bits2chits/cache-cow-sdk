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
Object.defineProperty(exports, "__esModule", { value: true });
class CacheCowApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CacheCowApiError';
    }
}
const API_URL = process.env.CACHECOW_API_URL || 'https://cachecow.io/api';
class CacheCowApi {
    constructor(apiKey) {
        this.token = '';
        this.apiKey = apiKey;
    }
    getHeaders(headers = {}) {
        return {
            headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Cow-Api-Key': this.apiKey }, headers)
        };
    }
    responseHasErrors(response) {
        var _a;
        return (((_a = response.errors) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0;
    }
    maybeReAuth(verified) {
        var _a, _b;
        if (this.responseHasErrors(verified)) {
            throw new CacheCowApiError(`There was an error authenticating with the cache cow api: ${(_a = verified.errors) === null || _a === void 0 ? void 0 : _a.map((e) => `${e.message}. `)}`);
        }
        if (!((_b = verified.data) === null || _b === void 0 ? void 0 : _b.valid)) {
            this.auth();
        }
    }
    auth() {
        return __awaiter(this, void 0, void 0, function* () {
            // const resp = await fetch(`${API_URL}/auth`, {
            //   ...this.getHeaders()
            // })
            // const authed: AuthResponse = await resp.json()
            // if (this.responseHasErrors(authed)) {
            //   throw new CacheCowApiError(`There was an error authenticating with the cache cow api: ${authed.errors?.map((e: ResponseError) => `${e.message}. `)}`)
            // }
            // if (authed.data?.token) {
            //   this.token = authed.data.token
            // } else {
            //   throw new CacheCowApiError(`There was an error authenticating with the cache cow api: Unable to get token from api.`)
            // }
        });
    }
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(`${API_URL}/verify?token=${this.token}`, Object.assign({}, this.getHeaders()));
            const verified = yield resp.json();
            this.maybeReAuth(verified);
        });
    }
    getStreams(muNames) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //   this.verify()
            //   const resp = await fetch(`${API_URL}/streams?${qs.stringify({ names: muNames })}`, {
            //     ...this.getHeaders({
            //       'Cache-Cow-Api-Token': this.token
            //     })
            //   })
            //   const streams: StreamsResponse = await resp.json()
            //   if (this.responseHasErrors(streams)) {
            //     throw new CacheCowApiError(`There was an error getting streams from the cache cow api: ${streams.errors?.map((e: ResponseError) => `${e.message}. `)}`)
            //   }
            //   return streams.data?.streams || []
            // } catch (e) {
            //   if (e instanceof CacheCowApiError) {
            //     throw e
            //   }
            //   throw new CacheCowApiError(`Error fetching streams: ${(e as Error).message}`)
            // }
            return muNames.map((n) => ({ muName: n, socket: 'localhost:8080' }));
        });
    }
}
exports.default = CacheCowApi;
