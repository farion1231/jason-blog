import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface PortableTextImageProps {
  value: {
    asset?: {
      _ref?: string;
    };
    alt?: string;
    caption?: string;
  };
}

export default function PortableTextImage({ value }: PortableTextImageProps) {
  if (!value?.asset?._ref) {
    return null;
  }

  return (
    <figure className="my-8">
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ''}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          loading="lazy"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}