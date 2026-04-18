import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="library-hero-card mb-10 md:mb-16">
      <div className="library-hero-content">
        
        {/* Left: Text & Button */}
        <div className="library-hero-text">
          <h1 className="library-hero-title">Your Library</h1>
          <p className="library-hero-description">
            Convert your books into interactive AI conversations.<br className="hidden sm:block" />
            Listen, learn, and discuss your favorite reads.
          </p>
          <Link href="/books/new" className="library-cta-primary mt-2">
            <Plus strokeWidth={2.5} size={20} />
            Add new book
          </Link>
        </div>

        {/* Center: Illustration */}
        <div className="library-hero-illustration-desktop">
          <Image 
            src="/assets/assets/hero-illustration.png" 
            alt="Vintage books and a globe" 
            width={350} 
            height={260} 
            className="object-contain"
            priority
          />
        </div>
        
        {/* Mobile Illustration (shown on small screens) */}
        <div className="library-hero-illustration">
          <Image 
            src="/assets/assets/hero-illustration.png" 
            alt="Vintage books and a globe" 
            width={250} 
            height={180} 
            className="object-contain"
            priority
          />
        </div>

        {/* Right: Steps Card */}
        <div className="library-steps-card">
          <ul className="flex flex-col gap-4">
            <li className="library-step-item">
              <div className="library-step-number">1</div>
              <div>
                <h3 className="library-step-title">Upload PDF</h3>
                <p className="library-step-description">Add your book file</p>
              </div>
            </li>
            <li className="library-step-item">
              <div className="library-step-number">2</div>
              <div>
                <h3 className="library-step-title">AI Processing</h3>
                <p className="library-step-description">We analyze the content</p>
              </div>
            </li>
            <li className="library-step-item">
              <div className="library-step-number">3</div>
              <div>
                <h3 className="library-step-title">Voice Chat</h3>
                <p className="library-step-description">Discuss with AI</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default HeroSection
