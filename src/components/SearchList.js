import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Loader from 'react-loader-spinner';

export default function SearchList(props) {
    // console.log(props)
    const { pageQuery } = props
    const emptyQuery = ""
    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery
    })

    function handleChange(e){
        const topContainer = document.getElementById('searchList')
        const query = e.target.value
        // const data = pageQuery
        const articles = pageQuery.allMarkdownRemark.edges || []
        const filteredData = articles.filter(singleArticle => {
            const {desc, title} = singleArticle.node.frontmatter
            return (
                desc.toLowerCase().includes(query.toLowerCase()) || 
                title.toLowerCase().includes(query.toLowerCase())
            )
        })
        setState({
            query,
            filteredData
        })
        // console.log(filteredData[0].node.frontmatter)
        // console.log(articles)
        if (e.target.value.length == 0) {
            topContainer.style.display = "none"
        } else {
            topContainer.style.display = "block"
        }
    }

    const { filteredData, query } = state
    const articleList = filteredData.length ? (
        filteredData.map(article => {
            return (
                <div className="articleDivSearch" key={article.node.id}>
                    {/* <img src={"https://raw.githubusercontent.com/MonolithOfficial/darkwirejsons/master/images/" + article.photo} alt=""/> */}
                    <div className="articleThumbHolder">
                        <Img fluid={pageQuery.images.edges.find(n => {
                            return n.node.relativePath.includes(article.node.frontmatter.image)
                        }).node.childImageSharp.fluid} />
                    </div>
                    <div>
                        <Link to={"/" + article.node.frontmatter.content}><p className="articleTitle">{article.node.frontmatter.title}</p></Link>
                        <p className="articleDescriptionSearch">{article.node.frontmatter.desc}</p>
                        <p className="articleAuthorAndTime">By {article.node.frontmatter.author} | {article.node.frontmatter.date}</p>
                        <Link to={"/" + article.node.frontmatter.category.toLowerCase()}><p className="articleCategory">{article.node.frontmatter.category}</p></Link>
                    </div>
                </div>
            )
        })
    ) : (
        <div>
            <h4>Unfortunately, nothing of sort could be found.</h4>
        </div>
    )

    return (
        <div>
            <div id="searchBar">
                <input type="text" placeholder="Search" onChange={(e) => handleChange(e)}/>
            </div>
            <div id="searchList">
                { articleList }
            </div>
        </div>
    )
}
