import React from 'react'
import { PortableText as BasePortableText, type PortableTextBlock } from '@portabletext/react'

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <BasePortableText value={value} />
}