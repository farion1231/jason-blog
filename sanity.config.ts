import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// 你需要替换这些值
const projectId = 'your-project-id' // 从 sanity.io 获取
const dataset = 'production'

export default defineConfig({
  name: 'jason-blog',
  title: 'Jason Blog',
  
  projectId,
  dataset,
  
  plugins: [
    structureTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes
  }
})