import React from "react";

const FeatureItem = ({ icon, alt, title, text }) => {
  return (
    <div class="feature-item">
      <img src={icon} alt={alt} class="feature-icon" />
      <h3 class="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default FeatureItem;
