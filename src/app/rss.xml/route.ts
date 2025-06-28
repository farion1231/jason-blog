import { getAllPosts } from '@/lib/posts';
import { PostMeta } from '@/types/post';

export async function GET() {
  try {
    const posts = await getAllPosts();
    
    const rssXml = generateRssXml(posts);
    
    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}

function generateRssXml(posts: PostMeta[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-blog.com';
  const buildDate = new Date().toUTCString();
  
  // 按发布时间排序，最新的在前
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const rssItems = sortedPosts.map(post => {
    const postUrl = `${siteUrl}/posts/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      ${post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('')}
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Jason's Blog]]></title>
    <description><![CDATA[Jason 的个人博客，分享技术文章、项目经验和学习心得]]></description>
    <link>${siteUrl}</link>
    <language>zh-CN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>jason@example.com (Jason)</managingEditor>
    <webMaster>jason@example.com (Jason)</webMaster>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`.trim();
}