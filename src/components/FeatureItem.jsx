import React from "react";
import PropTypes from "prop-types";

const FeatureItem = ({ iconSrc, iconAlt, title, text }) => {
  return (
    <div className="feature-item">
      <img src={iconSrc} alt={iconAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

FeatureItem.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FeatureItem;
