import React, { useEffect, useState } from 'react'
import ArticleList from './ArticleList'
import ArticleListSlideshow from './ArticleListSlideshow'
import { graphql, useStaticQuery } from 'gatsby'
import axios from 'axios'


export default function DbArticleHolder(props) {
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const [pubDate, setPubDate] = useState('')
    const [articles, setArticles] = useState([])
    const [Loading, setLoading] = useState(true)

    // Fetching articles initially
    // useEffect(() => {
    //     fetchArticles()
    // }, [])

    const pageQuery = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                node {
                        id
                        frontmatter {
                            path
                            date
                            title
                            desc
                            image{
                                childImageSharp {
                                    fluid {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            views
                            commentsNumber
                            author
                            content
                            category
                        }
                    }
                }
            }
            images: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
                edges {
                    node {
                        relativePath
                        name
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    `)

    // Loopable array
    // console.log(pageQuery.allMarkdownRemark.edges)
    // console.log(props.searchType)




    // Function to fetch all articles
    // const fetchArticles = async () => {
    //     // Sending GET request to 'articles/all' endpoint
    //     axios
    //         .get('https://darkwire-express-server.herokuapp.com/articles/' + props.searchType)
    //         .then(response => {
    //             // Updating articles state
    //             setArticles(response.data)
    //             console.log(response.data)

    //             // Updating loading state
    //             setLoading(false)
    //         })
            
    //         .catch(error => console.error(`There was an error retrieving the article list: ${error}`))
    // }
    return (
        <div>
            <ArticleList pageQuery={pageQuery}/> 
            {/* <ArticleListSlideshow state={articles} pageQuery={pageQuery}/> */}
        </div>
    )
}


