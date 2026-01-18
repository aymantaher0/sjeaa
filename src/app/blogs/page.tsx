'use client'

import { useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import ContactCTA from '@/components/sections/ContactCTA'

const blogPosts = [
  { id: 1, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 2, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 3, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 4, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 5, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 6, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 7, title: 'Creative landing page', excerpt: 'Read more' },
  { id: 8, title: 'Creative landing page', excerpt: 'Read more' },
]

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'resources'>('blogs')

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blogs & Resources
            </h1>
            <p className="text-gray-text max-w-2xl mx-auto">
              I offer a complete education system for designers centered around two main products: Course
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-8 py-3 rounded-btn font-medium transition-all ${
                activeTab === 'blogs'
                  ? 'bg-primary text-dark'
                  : 'bg-dark-card text-gray-text hover:text-white'
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-8 py-3 rounded-btn font-medium transition-all ${
                activeTab === 'resources'
                  ? 'bg-primary text-dark'
                  : 'bg-dark-card text-gray-text hover:text-white'
              }`}
            >
              Resources
            </button>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} padding="none" hover className="overflow-hidden">
                {/* Blog Image */}
                <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder for blog image - building illustration */}
                    <div className="w-32 h-40 bg-amber-200 rounded-t-lg border-4 border-amber-300">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        <div className="w-full h-3 bg-amber-400 rounded" />
                        <div className="w-full h-3 bg-amber-400 rounded" />
                        <div className="w-full h-3 bg-amber-400 rounded" />
                        <div className="w-full h-3 bg-amber-400 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {post.title}
                  </h3>
                  <Link
                    href={`/blogs/${post.id}`}
                    className="text-primary text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                  >
                    {post.excerpt}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </>
  )
}
