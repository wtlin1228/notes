import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

const About = () => (
  <Layout>
    <h1>Find me here &darr;</h1>
    <div>
      <a href="https://www.facebook.com/unasees" alt="facebook">
        FB
      </a>{' '}
      &{' '}
      <a href="https://www.instagram.com/una_886/" alt="instagram">
        IG
      </a>
    </div>
    <Link to="/">homepage</Link>
  </Layout>
)

export default About
