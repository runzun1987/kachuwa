import { useHttpClient } from '../api/hooks/http-hook';

// API to get products from mock server
export const listOfRestrictedKeywords = async function(token) {
//     const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   try {
//     await sendRequest(
//       process.env.REACT_APP_BACKEND_URL + '/admin/restricted-keywords',
//       'GET',
//       {},
//       { Authorization: `Bearer ${token}` }
//     );
//   } catch (err) {
//     console.log(err, '--------------');
//   }
};

export const addRestrictedKeyword = async function(keyword, token) {
//     const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   try {
//     await sendRequest(
//       process.env.REACT_APP_BACKEND_URL + '/admin/restricted-keywords',
//       'POST',
//       {
//         keyword,
//       },
//       { Authorization: `Bearer ${token}` }
//     );
//   } catch (err) {
//     console.log(err, '--------------');
//   }
};

export default listOfRestrictedKeywords;
