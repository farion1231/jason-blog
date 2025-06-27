import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: '中文', value: 'zh-CN' },
          { title: 'English', value: 'en' }
        ],
        layout: 'radio'
      },
      initialValue: 'zh-CN',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'code',
          options: {
            language: {
              list: [
                { title: 'JavaScript', value: 'javascript' },
                { title: 'TypeScript', value: 'typescript' },
                { title: 'JSX', value: 'jsx' },
                { title: 'TSX', value: 'tsx' },
                { title: 'HTML', value: 'html' },
                { title: 'CSS', value: 'css' },
                { title: 'SCSS', value: 'scss' },
                { title: 'JSON', value: 'json' },
                { title: 'Markdown', value: 'markdown' },
                { title: 'Bash', value: 'bash' },
                { title: 'Python', value: 'python' },
                { title: 'Java', value: 'java' },
                { title: 'C++', value: 'cpp' },
                { title: 'SQL', value: 'sql' },
                { title: 'YAML', value: 'yaml' },
                { title: 'Plain Text', value: 'text' }
              ]
            },
            withFilename: true
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'isDraft',
      title: 'Draft',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'content'
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
})