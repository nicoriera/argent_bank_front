import React from "react";
import IconChat from "../assets/img/icon-chat.png";
import IconMoney from "../assets/img/icon-money.png";
import IconSecurity from "../assets/img/icon-security.png";
import FeatureItem from "../components/FeatureItem"; // Reusable component for displaying features
import PropTypes from "prop-types";

// Static data for features displayed on the homepage.
const featuresData = [
  {
    iconSrc: IconChat,
    iconAlt: "Chat Icon",
    title: "You are our #1 priority",
    text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    iconSrc: IconMoney,
    iconAlt: "Money Icon",
    title: "More savings means higher rates",
    text: "The more you save with us, the higher your interest rate will be!",
  },
  {
    iconSrc: IconSecurity,
    iconAlt: "Security Icon",
    title: "Security you can trust",
    text: "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

const Home = () => {
  return (
    // Using React Fragment as the component returns multiple top-level elements (hero and features sections)
    <>
      <div className="hero">
        <section className="hero-content">
          {/* sr-only class makes this heading accessible to screen readers but visually hidden */}
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>

          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {/* Map over the features data to render each FeatureItem component */}
        {featuresData.map((feature, index) => (
          <FeatureItem
            key={index} // Using index as key is acceptable here as the list is static and order won't change
            iconSrc={feature.iconSrc}
            iconAlt={feature.iconAlt}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </section>
    </>
  );
};

// Remove incorrect PropTypes definition for internal data
// Home.propTypes = { ... };

export default Home;
