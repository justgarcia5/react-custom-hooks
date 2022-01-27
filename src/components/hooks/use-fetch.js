import { useState, useCallback } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestData, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestData.url, {
          method: requestData.method ? requestData.method : 'GET',
          headers: requestData.headers ? requestData.headers : {},
          body: requestData.body ? JSON.stringify(requestData.body) : null,
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data, requestData.body);

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest
  }
};

export default useFetch;