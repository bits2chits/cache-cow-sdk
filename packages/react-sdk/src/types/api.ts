export type ResponseError = {
  message: string
  stack?: string
  // ... probably more
}

export type GenericResponse = {
  data?: Record<string, any>
  errors?: ResponseError[]
}

export interface VerifiedResponse extends GenericResponse {
  data?: {
    valid: boolean,
    organization: string,
    // ... more stuff
  }
}

export interface AuthResponse extends GenericResponse {
  data?: {
    token: string,
    // ... more stuff
  }
}

export type CacheCowStream = {
  socket: string
  muName: string
}

export interface StreamsResponse extends GenericResponse {
  data?: {
    streams: CacheCowStream[]
  }
}
