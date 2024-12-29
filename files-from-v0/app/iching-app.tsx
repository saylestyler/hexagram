'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { hexagrams } from './hexagrams'

export default function IChingApp() {
  const [question, setQuestion] = useState("")
  const [result, setResult] = useState<typeof hexagrams[0] | null>(null)

  const castIChing = () => {
    let hexagramNumber = 0
    for (let i = 0; i < 6; i++) {
      hexagramNumber += Math.floor(Math.random() * 2) * Math.pow(2, i)
    }
    const hexagram = hexagrams[hexagramNumber]
    setResult(hexagram)
  }

  useEffect(() => {
    const tracer = document.createElement('div')
    tracer.className = 'tracer'
    document.body.appendChild(tracer)

    const updateTracer = (e: MouseEvent) => {
      tracer.style.left = `${e.clientX}px`
      tracer.style.top = `${e.clientY}px`
    }

    document.addEventListener('mousemove', updateTracer)

    return () => {
      document.removeEventListener('mousemove', updateTracer)
      document.body.removeChild(tracer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050a1c] flex items-center justify-center p-4 overflow-hidden">
      <Card className="w-full max-w-md bg-[#0a1635]/30 backdrop-blur-xl border-[#1e3a8a] shadow-lg shadow-[#4299e1]/20 glassmorphism">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-white text-center">I Ching Oracle</CardTitle>
          <CardDescription className="text-[#93c5fd] text-center">Unveil the wisdom of the ancients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="What seeks illumination?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            aria-label="Your question"
            className="bg-[#1e3a8a]/20 border-[#3b82f6] text-white placeholder-[#60a5fa] focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all duration-300"
          />
          <Button 
            onClick={castIChing} 
            className="w-full bg-[#3b82f6] hover:bg-[#60a5fa] text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-[#4299e1]/50 glow-effect"
          >
            Cast the Oracle
          </Button>
          {result && (
            <div className="mt-4 text-center space-y-2 animate-fade-in" aria-live="polite">
              <h2 className="text-2xl font-bold text-white">{result.name}</h2>
              <p className="text-7xl my-4 text-[#60a5fa] glow-effect" aria-label={`Hexagram symbol for ${result.name}`}>{result.symbol}</p>
              <p className="text-sm text-[#93c5fd]">{result.description}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="text-sm text-[#60a5fa] text-center">
          <p>The I Ching speaks in riddles; interpret with wisdom.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

