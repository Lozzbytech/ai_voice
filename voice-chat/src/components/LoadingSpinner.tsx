import { Loader2 } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl flex items-center gap-3 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="font-medium">Initializing Voice Chat...</span>
      </div>
    </div>
  )
} 