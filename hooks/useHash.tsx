import { useState, useEffect } from "react";

export const useHash = () => {
  const [hash, setHash] = useState<string>();
  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
};
