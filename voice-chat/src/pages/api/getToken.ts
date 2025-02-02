import type { NextApiRequest, NextApiResponse } from 'next';
import { getSessionToken } from '../../lib/bland';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { agentId } = req.body;
    console.log('Received request for agent:', agentId);
    
    const tokenResponse = await getSessionToken(agentId);
    console.log('Token response:', tokenResponse);
    
    if (!tokenResponse.token) {
      console.error('No token in response:', tokenResponse);
      throw new Error('No token in response');
    }

    res.status(200).json({ token: tokenResponse.token });
  } catch (error) {
    console.error('Token error:', error);
    res.status(500).json({ 
      error: 'Failed to get token',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 