const path = require('path')
const { promises } = require('fs')

exports.createPages = ({boundActionCreators, graphql}) => {
    const { createPage } = boundActionCreators

    const articleTemplate = path.resolve('src/templates/article_template.js')

    return graphql(`
        {
            allMarkdownRemark {
                edges {
                  node {
                      html
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
        }
    `).then(res => {
        if(res.errors){
            return promises.reject(res.errors)
        }

        res.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: articleTemplate
            })
        })
    })
}
