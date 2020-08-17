import React from 'react'
import { Link } from "gatsby"
import { Component } from 'react'
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

export class ArticleListSlideshow extends Component {
        componentDidMount(){
            setTimeout(() => {
                showFirstSlide()
            }, 600)
            this.interval = setInterval(() => showSlides(), 5000)
        }

        componentWillUnmount(){
            clearInterval(this.interval);
        }
        render() {
            // console.log(this.props.pageQuery)
            const { state } = this.props
            const { pageQuery } = this.props
            console.log(pageQuery.images)
            // for (let i = 0; i < pageQuery.length; i++) {
            //     console.log(pageQuery[i])
            // }
            const articleList = state.length ? (
                state.map(article => {
                    return (
                        <Link to={"/" + article.content.split('.')[0]} key={article.id}>
                            <div className="mySlides fade">
                                <div className="numbertext">{article.id} / {state.length}</div>
                                {/* <img src={article.image} alt="" style={{ width: "100%" }} /> */}
                                <Img fluid={pageQuery.images.edges.find(n => {
                                    return n.node.relativePath.includes(article.image)
                                }).node.childImageSharp.fluid} />
                                <div className="text">{article.title}</div>

                            </div>
                        </Link>
                    )
                })
            ) : (
                    <h4>Loading, please stand by.</h4>
            )
            return (
                <div className="slideshow-container">
                    {articleList}
                </div>
            )
        }
    }


let x = 0
const showSlides = () => {
    let allSlides = document.querySelectorAll('.mySlides')

    if (x === allSlides.length - 1){
        x = 0;
    }
    for (let i = 0; i < allSlides.length; i++) {
        allSlides[i].style.display = "none";
    }
    x++;
    allSlides[x - 1].style.display = "block";
    // allSlides[x - 1].style.display = "none";
    console.log(x)
}

const showFirstSlide = () => {
    const allSlides = document.querySelectorAll('.mySlides');
    
    setTimeout(() => {
        allSlides[0].style.display = "block"
    }, 400)
    
}

export default ArticleListSlideshow