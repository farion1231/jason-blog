import React from 'react'
import { PortableText as BasePortableText, type PortableTextBlock } from '@portabletext/react'

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-lg max-w-none 
      prose-headings:font-bold prose-headings:text-gray-900
      prose-p:text-gray-900 prose-p:leading-relaxed
      prose-a:text-blue-500 prose-a:no-underline hover:prose-a:text-pink-500
      prose-strong:text-gray-900 prose-strong:font-semibold
      prose-code:text-blue-500 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm
      prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:shadow-sm
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-6
      prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
      prose-ul:list-disc prose-ol:list-decimal
      prose-li:text-gray-900"
    >
      <BasePortableText value={value} />
    </div>
  )
}