import React from 'react'
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"
export default function Template({data}){
    const article  = data.markdownRemark

    return (
        <Layout>
            <div className="wrapperArticle">
                {/* <Link to="/">Go Back</Link> */}
                <hr/>
                <h1>{ article.frontmatter.title }</h1>
                <h4>Posted by { article.frontmatter.author } | { article.frontmatter.date }</h4>
                <div dangerouslySetInnerHTML={{__html: article.html}}/>
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
    }
`

