import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Insta from '../components/insta'
import PostPreview from '../components/PostPreview'
import usePosts from '../hooks/usePosts'

const Index = () => {
  const posts = usePosts()

  return (
    <>
      <Hero />
      <Layout>
        <h2>Read my blog</h2>
        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
        <Insta />
      </Layout>
    </>
  )
}

export default Index
