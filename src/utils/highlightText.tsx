export function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-gray-100 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  )
}