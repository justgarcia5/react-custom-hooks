import { useState, useCallback } from "react";

const useFetchHttps = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      applyData(data);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [applyData, requestConfig]);

  return {
    isLoading,
    error,
    sendRequests

  }
};

export default useFetchHttps;