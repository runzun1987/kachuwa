import React, { useState } from 'react';
import api from '../../../api/formulaUpdate';
import { useHttpClient } from '../../../api/hooks/http-hook';

const Formula = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [innerError, setInnerError] = useState(error);
  const token = props.token;
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const operator = e.target.formula.value;
    const value = e.target.value.value;

    try {
      const result = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + '/admin/update-formula',
        'POST',
        {
          operator,
          value,
        },
        { Authorization: `Bearer ${token}` }
      );
      if (result) {
        alert('Done');
      }
    } catch (err) {
      console.log(err, '--------------');
      setInnerError(err);
    }
  };

  return (
    <div>
      {innerError ? (
        <h1>{innerError}</h1>
      ) : (
        <div>
          {' '}
          <h2>Price Formula</h2>
          <form onSubmit={formSubmitHandler}>
            <p>Please select Operator:</p>
            <input
              type="radio"
              id="multiply"
              name="formula"
              value="*"
              required
            />
            <label htmlFor="multiply">Multiply</label>
            <input type="radio" id="add" name="formula" value="+" required />
            <label htmlFor="add">Add</label>
            <p>Please Enter Value</p>
            <input type="number" name="value" required />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Formula;
