/**
 * Portable Text 图片组件
 * 专门用于渲染 Portable Text 中的图片内容
 * 支持响应式布局、懒加载和图片说明文字
 */
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

// Portable Text 图片组件属性接口
interface PortableTextImageProps {
  value: {
    asset?: {
      _ref?: string;    // Sanity 图片资源引用ID
    };
    alt?: string;       // 图片替代文本
    caption?: string;   // 图片说明文字
  };
}

/**
 * Portable Text 图片主组件
 * 处理 Sanity CMS 中的图片数据并渲染为优化的 Next.js Image 组件
 */
export default function PortableTextImage({ value }: PortableTextImageProps) {
  // 如果没有有效的图片资源引用，则不渲染任何内容
  if (!value?.asset?._ref) {
    return null;
  }

  return (
    <figure className="my-8">
      {/* 响应式图片容器 */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).url()}           // 使用 Sanity 图片 URL 生成器
          alt={value.alt || ''}               // 无障碍替代文本
          fill                                // 填充父容器
          className="object-contain"          // 保持宽高比，完整显示图片
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"  // 响应式尺寸
          loading="lazy"                      // 懒加载优化
        />
      </div>
      
      {/* 图片说明文字（如果存在） */}
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}