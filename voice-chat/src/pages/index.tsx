import { useState, useEffect } from 'react';
import VoiceChat from '../components/VoiceChat';
import { createWebAgent } from '../lib/bland';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomePage() {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAgent = async () => {
      setIsLoading(true);
      try {
        const response = await createWebAgent();
        if (!response.agent?.agent_id) {
          throw new Error('Failed to create web agent');
        }
        setAgentId(response.agent.agent_id);
      } catch (err) {
        console.error('Agent creation error:', err);
        setError(err instanceof Error ? err.message : 'Failed to create agent');
      } finally {
        setIsLoading(false);
      }
    };

    initAgent();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto space-y-6">
        {error ? (
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardContent className="p-6">
              <div className="text-red-300/90 text-center font-light p-4 rounded-2xl bg-red-500/10">
                {error}
              </div>
            </CardContent>
          </Card>
        ) : !agentId ? (
          <Card className="bg-white/10 backdrop-blur-lg border-none">
            <CardContent className="p-6">
              <div className="text-white/70 text-center font-light p-4">
                <div className="animate-pulse">Initializing...</div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <VoiceChat agentId={agentId} />
        )}
      </div>
    </main>
  );
} 