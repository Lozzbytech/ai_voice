import { agentConfig } from '../config/agent-config';


const BLAND_API_KEY = process.env.NEXT_PUBLIC_BLAND_API_KEY!;
const BLAND_AGENT_ID = process.env.NEXT_PUBLIC_BLAND_AGENT_ID;
const BLAND_API_URL = 'https://api.bland.ai';
const BLAND_WEB_URL = 'https://web.bland.ai';

if (!BLAND_API_KEY) {
  throw new Error('BLAND_API_KEY is not set in environment variables');
}

export async function createWebAgent() {
  try {
    console.log('Creating new web agent...');
    console.log('BLAND_API_KEY:', BLAND_API_KEY);

    const response = await fetch(`${BLAND_API_URL}/v1/agents`, {
      method: 'POST',
      headers: {
        'authorization': BLAND_API_KEY, // or `Bearer ${BLAND_API_KEY}` if required
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(agentConfig)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Agent creation error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`Failed to create agent: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Created agent:', data);
    return data;
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

export async function getSessionToken() {
  try {
    console.log('Fetching session token for agent:', BLAND_AGENT_ID);

    const response = await fetch(`${BLAND_WEB_URL}/v1/agents/${BLAND_AGENT_ID}/authorize`, {
      method: 'POST',
      headers: {
        'authorization': BLAND_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({}) // Add any required body parameters here
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Session token error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Session token response:', data);
    return data;
  } catch (error) {
    console.error('Error getting session token:', error);
    throw error;
  }
}

export async function startConversation() {
  try {
    // Fetch the session token for the agent
    const sessionToken = await getSessionToken(BLAND_AGENT_ID);
    console.log('Session token:', sessionToken);

    // Use the session token to start a conversation
    const conversationResponse = await fetch(`${BLAND_API_URL}/v1/conversations`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${sessionToken.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: BLAND_AGENT_ID,
        // Add other required parameters here
      })
    });

    if (!conversationResponse.ok) {
      const errorText = await conversationResponse.text();
      throw new Error(`Failed to start conversation: ${conversationResponse.status} - ${errorText}`);
    }

    const conversationData = await conversationResponse.json();
    console.log('Conversation started:', conversationData);
    return conversationData;
  } catch (error) {
    console.error('Error starting conversation:', error);
    throw error;
  }
}