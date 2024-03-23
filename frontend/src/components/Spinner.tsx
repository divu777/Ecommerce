import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`/${path}`),
      {
        state: location.pathname,
      };
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <h1>Redirecting you in {count}</h1>
    </>
  );
};

export default Spinner;
