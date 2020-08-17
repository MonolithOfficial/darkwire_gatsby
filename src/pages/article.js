import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

export default function Article({ data }){
    console.log(data.image.childImageSharp.fluid)
    if (!data) { return null };
    return (
        <div>
            {data.allMarkdownRemark.edges.map(article => (
                <div key={ article.node.id }>
                    <div className="articleThumbHolder">
                        <Img fluid={data.image.childImageSharp.fluid} />
                    </div>
                    <h3>{ article.node.frontmatter.title }</h3>
                    <small>Posted by { article.node.frontmatter.author } | { article.node.frontmatter.date }</small>
                    <Link to={ article.node.frontmatter.path }>Read More</Link>
                    <hr/>
                </div>
            ))}
        </div>
    )
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark {
            edges {
              node {
                    id
                    frontmatter {
                        path
                        date
                        title
                        author
                    }
                }
            }
        }
        image: file(relativePath: { eq: "90s_concepts.png" }){
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`