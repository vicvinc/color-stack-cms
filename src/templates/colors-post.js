import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ColorsPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  colors,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            {tags && tags.length ? (
              <div className="tags">
                {tags.map(tag => (
                  <Link
                    key={tag + `tag`}
                    className="tag is-link"
                    to={`/tags/${kebabCase(tag)}/`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
            <PostContent content={content} />
            <div className="container-fluid row mt-4">
              {colors && colors.length
                ? colors.map((item, idx) => {
                    return (
                      <div class="col-4 color-box" key={idx}>
                        <div
                          class="color-panel"
                          style={{
                            background: `#${item.hex}`
                          }}
                        >
                          <span class="color-hex-val">{item.hex}</span>
                          <span class="color-times text-right">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ColorsPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  colors: PropTypes.array,
  helmet: PropTypes.object
};

const ColorsPost = ({ data }) => {
  if (!data) return <p> not found </p>;

  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ColorsPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        colors={post.frontmatter.colors}
      />
    </Layout>
  );
};

ColorsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default ColorsPost;

export const pageQuery = graphql`
  query ColorPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        colors {
          hex
          hexa
          rgb
          alpha
          count
        }
      }
    }
  }
`;
