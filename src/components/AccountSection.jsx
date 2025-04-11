import React from "react";
import PropTypes from "prop-types";

const AccountSection = ({ title, amount, description }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        {/* Le bouton pourrait aussi être conditionnel ou prendre un handler en prop si nécessaire */}
        <button className="button transaction-button">View transactions</button>
      </div>
    </section>
  );
};

AccountSection.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired, // Ou PropTypes.number si le format est toujours numérique
  description: PropTypes.string.isRequired,
};

export default AccountSection;
