import React, { useEffect, useState } from "react";

const useOnOffStatus = () => {
  const [onlinestaus, setonlinestaus] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => {
      setonlinestaus(true);
    });
    window.addEventListener("offline", () => {
      setonlinestaus(false);
    });
  }, []);

  return onlinestaus;
};

export default useOnOffStatus;