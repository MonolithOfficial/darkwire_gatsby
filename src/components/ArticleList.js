import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Loader from 'react-loader-spinner';

export default function ArticleList(props) {
    const { state } = props
    const { pageQuery } = props
    // console.log(props.pageQuery.images.edges.find(n => {
    //     return n.node.relativePath.includes(article.image)
    // }))

    console.log(pageQuery.allMarkdownRemark.edges)
    // console.log(pageQuery.id)

    // JUS CONSOLE
    console.log(props.pageQuery.images.edges.find(n => {
        return  n.node.relativePath.includes("90s_concepts.png")
    }).node.childImageSharp)

    console.log(state)

    const articleList = pageQuery.allMarkdownRemark.edges.length ? (
        pageQuery.allMarkdownRemark.edges.map(article => {
            return (
                <div className="articleDiv" key={article.node.id}>
                    {/* <img src={"https://raw.githubusercontent.com/MonolithOfficial/darkwirejsons/master/images/" + article.photo} alt=""/> */}
                    <div className="articleThumbHolder">
                        <Img fluid={pageQuery.images.edges.find(n => {
                            return n.node.relativePath.includes(article.node.frontmatter.image)
                        }).node.childImageSharp.fluid} />
                    </div>
                    <div>
                        <Link to={"/" + article.node.frontmatter.content}><p className="articleTitle">{article.node.frontmatter.title}</p></Link>
                        <p className="articleDescription">{article.node.frontmatter.desc}</p>
                        <p className="articleAuthorAndTime">By {article.node.frontmatter.author} | {article.node.frontmatter.date}</p>
                        <Link to={"/" + article.node.frontmatter.category.toLowerCase()}><p className="articleCategory">{article.node.frontmatter.category}</p></Link>
                    </div>
                </div>
            )
        })
    ) : (
        <div
        style={{
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
        >
            <Loader type="Watch" color="#787878" height="100" width="100" />
        </div>
    )
    // const articleList = state.length ? (
    //     state.map(article => {
    //         return (
    //             <div className="articleDiv" key={article.id}>
    //                 {/* <img src={"https://raw.githubusercontent.com/MonolithOfficial/darkwirejsons/master/images/" + article.photo} alt=""/> */}
    //                 <div className="articleThumbHolder">
    //                     <Img fluid={props.pageQuery.images.edges.find(n => {
    //                         return n.node.relativePath.includes(article.image)
    //                     }).node.childImageSharp.fluid} />
    //                 </div>
    //                 <div>
    //                     <Link to={"/" + article.content.split('.')[0]}><p className="articleTitle">{article.title}</p></Link>
    //                     <p className="articleDescription">{article.desc}</p>
    //                     <p className="articleAuthorAndTime">By {article.author} | {article.pubDate}</p>
    //                     <Link to={"/" + article.category.toLowerCase()}><p className="articleCategory">{article.category}</p></Link>
    //                 </div>
    //             </div>
    //         )
    //     })
    // ) : (
    //         <div
    //         style={{
    //             width: "100%",
    //             height: "100",
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center"
    //         }}
    //         >
    //             <Loader type="Watch" color="#787878" height="100" width="100" />
    //         </div>
    // )
    return (
        <div className="wrapper">
            { articleList }
        </div>
    )
}

