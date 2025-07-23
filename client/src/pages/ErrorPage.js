import React from "react";

const ErrorPage = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong 😓</h1>
      <p className="mt-4">Please try again later or go back to the home page.</p>
    </div>
  );
};

export default ErrorPage;
