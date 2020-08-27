import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from "../components/layout"
import Image from '../components/image'
import DbArticleHolder from '../components/DbArticleHolder';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export class Metal extends Component {
    state = {
        searchTypes: ['all', 'limit', 'exact']
    }
    render() {
        return (
            <Layout>
                {/* <div id="topContainer">
                    <DbArticleHolderSlideshow />
                </div> */}
                <div id="pageWrapperHome">
                    {/* {articleList} */}
                    <DbArticleHolder searchType={this.state.searchTypes[2]}/>
                    <div className="metalBanner">
                        <Image imageProp="metalwallpaper.jpg"/>
                    </div>
                
                    
                </div>
            </Layout>
            
        )
    }
}

export default Metal;
