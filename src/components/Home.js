import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SEO from "./seo"
import Charts from './Charts'
import { graphql, useStaticQuery } from 'gatsby'
import DbArticleHolder from './DbArticleHolder';
import SearchList from './SearchList';
import ArticleList from './ArticleList'
import DbArticleHolderSlideshow from './DbArticleHolderSlideshow'
import ArticleListSlideshow from './ArticleListSlideshow'

export default function Home() {
    // state = {
    //     searchTypes: ['all', 'limit', 'exact']
    // }

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
    `)


    // componentDidMount(){
    //     axios.get("https://raw.githubusercontent.com/MonolithOfficial/darkwirejsons/master/articles.json")
    //     .then(res => {
    //         this.setState({
    //             articles: res.data
    //         })
    //         console.log(this.state.articles)
    //     })
        
    // }
    // render() {
        // console.log(this.state.searchTypes[1])
        // let { articles } = this.state;
        // let articleList = articles.length ? (
        //     articles.map(article => {
        //         return (
                    
        //             <div className="articleDiv" key={article.number}>
        //                 <img src={"https://raw.githubusercontent.com/MonolithOfficial/darkwirejsons/master/images/" + article.photo} alt=""/>
        //                 <div>
        //                     <Link to={"/" + article.content.split('.')[0]}><p className="articleTitle">{article.title}</p></Link>
        //                     <p className="articleDescription">{article.desc}</p>
        //                     <p className="articleCategory">{article.category}</p>
        //                 </div>
        //             </div>
        //         )
        //     })
        // ) : (
        //     <h1>There are no articles at the moment</h1>
        // )
    return (
        <div>
            <SEO title="Home" />
            <SearchList pageQuery={pageQuery}/>
            <div id="topContainer">
                <ArticleListSlideshow pageQuery={pageQuery}/>
            </div>
            <div id="pageWrapperHome">
                {/* {articleList} */}
                {/* <DbArticleHolder/> */}
                <ArticleList pageQuery={pageQuery}/> 
                    
                <Charts />
                
            </div>
        </div>
        
    )
}
// }
