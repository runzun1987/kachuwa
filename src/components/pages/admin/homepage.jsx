import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHttpClient } from '../../../api/hooks/http-hook';
import FilteredKeyword from './filterKeyword';
import Formula from './formula';
import Orders from './orders';
import './style.css';

const HomePage = ({ token }) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [innerError, setInnerError] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.querySelector('body').classList.add('loaded');
    document.querySelector('#root').classList.add('loaded');

    const sendRequestToBackEnd = async () => {

      try {
        const re = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/admin',
          'GET',
          {},
          { Authorization: `Bearer ${token}` }
        );

        setLoaded(true);
      } catch (err) {
        console.log(err, '--------------');
        setInnerError(err.message);
        setLoaded(true);
        // window.location = process.env.PUBLIC_URL + '/pages/404';
      }
    };

    sendRequestToBackEnd();
  }, []);
  return (
    <>
      {loaded && !innerError ? (
        <div>
          <h3> Hakim ko Office</h3>
          <div className="top">
            <FilteredKeyword token={token} />
          </div>
          <div className="button">
            <Formula token={token}/>
          </div>
          <div className="middle">
           <Orders token={token}/>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(HomePage);
