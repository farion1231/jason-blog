import React from 'react'
import { PortableText as BasePortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import PortableTextImage from './PortableTextImage'

const components: PortableTextComponents = {
  types: {
    image: PortableTextImage,
  },
}

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <BasePortableText value={value} components={components} />
}