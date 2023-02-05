/**
 * This assumes that react is being used and that fetch is a thing.
 * Fetch is a thing now. Good job Gretchen
 */
import qs from 'qs'
import { AuthResponse, GenericResponse, ResponseError, VerifiedResponse, StreamsResponse, CacheCowStream } from '../types/api';

class CacheCowApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CacheCowApiError'
  }
}

const API_URL: string = process.env.CACHECOW_API_URL || 'https://cachecow.io/api'

export default class CacheCowApi {
  apiKey: string
  private token: string = ''
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  getHeaders(headers: HeadersInit = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Cow-Api-Key': this.apiKey,
        ...headers
      }
    }
  }

  responseHasErrors(response: GenericResponse) {
    return (response.errors?.length || 0) > 0
  }

  maybeReAuth(verified: VerifiedResponse): void {
    if (this.responseHasErrors(verified)) {
      throw new CacheCowApiError(`There was an error authenticating with the cache cow api: ${verified.errors?.map((e: ResponseError) => `${e.message}. `)}`)
    }
    if (!verified.data?.valid) {
      this.auth()
    }
  }

  async auth(): Promise<void> {
    const resp = await fetch(`${API_URL}/auth`, {
      ...this.getHeaders()
    })
    const authed: AuthResponse = await resp.json()
    if (this.responseHasErrors(authed)) {
      throw new CacheCowApiError(`There was an error authenticating with the cache cow api: ${authed.errors?.map((e: ResponseError) => `${e.message}. `)}`)
    }
    if (authed.data?.token) {
      this.token = authed.data.token
    } else {
      throw new CacheCowApiError(`There was an error authenticating with the cache cow api: Unable to get token from api.`)
    }
  }

  async verify(): Promise<void> {
    const resp = await fetch(`${API_URL}/verify?token=${this.token}`, {
      ...this.getHeaders()
    })
    const verified: VerifiedResponse = await resp.json()
    this.maybeReAuth(verified)
  }

  async getStreams(muNames: string[]): Promise<CacheCowStream[]> {
    try {
      this.verify()
      const resp = await fetch(`${API_URL}/streams?${qs.stringify({ names: muNames })}`, {
        ...this.getHeaders({
          'Cache-Cow-Api-Token': this.token
        })
      })
      const streams: StreamsResponse = await resp.json()
      if (this.responseHasErrors(streams)) {
        throw new CacheCowApiError(`There was an error getting streams from the cache cow api: ${streams.errors?.map((e: ResponseError) => `${e.message}. `)}`)
      }
      return streams.data?.streams || []
    } catch (e) {
      if (e instanceof CacheCowApiError) {
        throw e
      }
      throw new CacheCowApiError(`Error fetching streams: ${(e as Error).message}`)
    }
  }
}