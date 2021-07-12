// import React from 'react'
// import Axios from 'Axios';
import { useHttpClient } from '../api/hooks/http-hook';

const VerifyUser = async (code) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  try {
    const result = await sendRequest(
      process.env.REACT_APP_BACKEND_URL + '/users/activate/' + code,
      'GET',
      {},
      { 'Content-Type': 'application/json' }
    );

    return result.data;
  } catch (err) {}
};

export default VerifyUser;
