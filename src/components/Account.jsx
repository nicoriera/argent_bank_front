import React from "react";

const Account = ({ title, amount, description }) => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center border border-black bg-white w-4/5 mx-auto p-6 mb-8 text-left">
      <div className="w-full flex-1">
        <h3 className="m-0 p-0 text-base font-normal">{title}</h3>
        <p className="m-0 text-4xl font-bold">{amount}</p>
        <p className="m-0">{description}</p>
      </div>
      <div className="w-full md:w-auto">
        <button className="block w-full md:w-48 p-2 text-lg font-bold mt-4 bg-green-500 text-white cursor-pointer">
          View transactions
        </button>
      </div>
    </section>
  );
};

export default Account;
