import { getSessionToken } from '@/lib/bland';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { agentId } = req.body;
    
    if (!agentId) {
      return res.status(400).json({ message: 'Agent ID is required' });
    }

    const sessionData = await getSessionToken();
    
    if (!sessionData?.token) {
      return res.status(500).json({ message: 'No token received from Bland AI' });
    }

    return res.status(200).json({ token: sessionData.token });
  } catch (error) {
    console.error('Token fetch error:', error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to get token' 
    });
  }
}