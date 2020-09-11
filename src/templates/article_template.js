import React from 'react'
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import SEO from "../components/seo"
import ArticleList from '../components/FeaturedArticleList'
import Layout from "../components/layout"
import FeaturedArticleList from '../components/FeaturedArticleList'
export default function Template({data}){
    const article  = data.markdownRemark

    console.log(data)

    return (
        <Layout>
            <SEO title={article.frontmatter.title} />
            <div id="articlePage">
                <div id="featuredArticles">
                    <FeaturedArticleList pageQuery={data}/>
                </div>
                <div className="wrapperArticle">
                    {/* <Link to="/">Go Back</Link> */}
                    {/* <hr/> */}
                    <h1 style={{paddingTop: "21.44px", marginTop: "0"}}>{ article.frontmatter.title }</h1>
                    <h4>Posted by { article.frontmatter.author } | { article.frontmatter.date }</h4>
                    <div dangerouslySetInnerHTML={{__html: article.html}}/>
                </div>
            </div>

        </Layout>
    )
}


export const articleQuery = graphql`
    query articleByPath ($path: String!) {
        markdownRemark(frontmatter: {path: { eq: $path }}){
            html
            frontmatter{
                path
                title
                author
                date
            }
        }
        allMarkdownRemark {
            edges {
            node {
                    id
                    frontmatter {
                        path
                        date
                        title
                        desc
                        image
                        views
                        commentsNumber
                        author
                        content
                        category
                        number
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
`

