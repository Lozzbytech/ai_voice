declare module 'bland-client-js-sdk' {
  export class BlandWebClient {
    constructor(agentId: string, token: string);
    
    disconnect(): Promise<void>;
    initConversation(options: { sampleRate: number; callId: string }): Promise<void>;
    // Add other methods as needed
  }
} 