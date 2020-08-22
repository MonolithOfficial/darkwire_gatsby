/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Navbar from './Navbar'
import Image from './image'
import Header from "./header"
import "./layout.css"
import Footer from "./Footer"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  const [articles, setArticles] = useState([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    // Sending GET request to 'articles/all' endpoint
    axios
        .get('https://darkwire-express-server.herokuapp.com/articles/limit')
        .then(response => {
            // Updating articles state
            setArticles(response.data)
            console.log(response.data)

            // Updating loading state
            setLoading(false)
        })
        
        .catch(error => console.error(`There was an error retrieving the article list: ${error}`))
}

  return (
    <>
    <div id="upperBound">
      <Image />
    </div>
      
      <Navbar />
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div>
        <main>{children}</main>
        <Footer articleProps={articles}/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
