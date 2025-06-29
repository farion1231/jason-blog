import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .id('posts')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
        )
    ])
