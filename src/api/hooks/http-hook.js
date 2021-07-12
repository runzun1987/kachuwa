import { useState, useCallback, useRef, useEffect } from 'react';
import Axios from 'axios';
import { signOut } from './../../actions';
import { Link, useHistory } from 'react-router-dom';

export const useHttpClient = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);

      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      const UNAUTHORIZED = 401;
      Axios.interceptors.response.use(
        (response) => response,
        (error) => {
          const { status } = error.response;
          if (status === UNAUTHORIZED) {
            // setTimeout(console.log.bind(console, '\n%c' ));
          }
          return Promise.reject(error);
        }
      );

      try {
        const result = await Axios({
          method,
          url,
          data: body,
          headers,
          // withCredentials: true
        });

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        setIsLoading(false);

        return result;
      } catch (err) {
        setError(err.response.data);
        setIsLoading(false);
        throw err.response.data;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
