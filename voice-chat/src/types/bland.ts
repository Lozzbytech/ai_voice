export interface BlandAgent {
  agent_id: string
  prompt: string
  voice: string
  language: string
  model: string
}

export interface BlandTokenResponse {
  token: string
  expires_at: string
}

export interface BlandError {
  error: string
  message: string
  status: number
} 