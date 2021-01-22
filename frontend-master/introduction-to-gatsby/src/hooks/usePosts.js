import { graphql, useStaticQuery } from 'gatsby'

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        totalCount
        nodes {
          frontmatter {
            title
            slug
            author
          }
        }
      }
    }
  `)

  return data.allMdx.nodes.map((posts) => ({
    title: posts.frontmatter.title,
    author: posts.frontmatter.author,
    slug: posts.frontmatter.slug,
    excerpt: posts.frontmatter.excerpt,
  }))
}

export default usePosts
