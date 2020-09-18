import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
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
            allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
                edges {
                node {
                        id
                        frontmatter {
                            path
                            date(formatString: "MMM Do YYYY")
                            title
                            desc
                            image {
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
            <button
                onClick={e => {
                    // To stop the page reloading
                    e.preventDefault()
                    // Lets track that custom click
                    trackCustomEvent({
                    // string - required - The object that was interacted with (e.g.video)
                    category: "Special Button",
                    // string - required - Type of interaction (e.g. 'play')
                    action: "Click",
                    // string - optional - Useful for categorizing events (e.g. 'Spring Campaign')
                    label: "Gatsby Plugin Example Campaign",
                    // number - optional - Numeric value associated with the event. (e.g. A product ID)
                    value: 43
                    })
                    //... Other logic here
                }}
                >
                Tap that!
            </button>
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
