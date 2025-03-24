"use client"
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import React from 'react'
const page = () => {
  return (
    <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <Features />
    <Footer />
  </div>
  )
}

export default page