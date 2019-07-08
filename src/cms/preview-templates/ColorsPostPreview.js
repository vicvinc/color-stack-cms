import React from "react";
import PropTypes from "prop-types";
import { ColorsPostTemplate } from "../../templates/colors-post";

const ColorsPostPreview = ({ entry, widgetFor }) => (
  <ColorsPostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "title"])}
  />
);

ColorsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default ColorsPostPreview;
