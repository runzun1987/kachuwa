import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../../api/hooks/http-hook';
import api, { addRestrictedKeyword } from '../../../api/restrictedKeywords';

const FilterKeyword = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [innerError, setInnerError] = useState(error);
  const token = props.token;
  const [keywords, setKeywords] = useState();
  const [addKeyword, setAddKeyword] = useState();

  const listOfRestrictedProduct = async () => {
    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/admin/restricted-keywords',
        'GET',
        {},
        { Authorization: `Bearer ${token}` }
      );
      setKeywords(result.data.keywords);
    } catch (err) {
      console.log(err, '--------------');
      setInnerError(err);
    }
  };
  useEffect(() => {
    listOfRestrictedProduct();
  }, []);

  const addKeywordHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/admin/restricted-keywords',
        'POST',
        {
          keyword: addKeyword,
        },
        { Authorization: `Bearer ${token}` }
      );
    } catch (err) {
      console.log(err, '--------------');
      setInnerError(err);
    }

    listOfRestrictedProduct();
  };
  const keywordOnChangeHandler = (e) => {
    setAddKeyword(e.target.value);
  };

  return (
    <div>
      {innerError ? (
        <h1>{innerError}</h1>
      ) : (
        <div className="top-keyword">
          <h3>List Of Restricted Keywords to Translate</h3>
          <div className="keyword-list">
            {keywords &&
              keywords.map((k, index) => <p key={index}>{k.keyword}</p>)}
          </div>
          <label>Add Keyword:</label>
          <input onChange={keywordOnChangeHandler} />
          <button onClick={addKeywordHandler}> Add</button>
        </div>
      )}
    </div>
  );
};

export default FilterKeyword;
