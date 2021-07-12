import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import $ from 'jquery';
import { API, graphqlOperation } from 'aws-amplify';

// import Custom Components
import SideBar from '../../features/sidebar/shop-filter';
import ProductListTwo from '../../features/product/list/product-list-two';
import Breadcrumb from '../../common/breadcrumb';
import {
  searchProducts,
  searchProductsLoading,
  searchImageProducts,
  receiveSearchProducts,
  resetSearchProducts,
} from '../../../actions';
import './style.css';
import { listKeywords } from './../../../graphql/queries';
import { createKeyword, updateKeyword } from './../../../graphql/mutations';

function NoSideBar(props) {
  const [progress, setProgress] = useState(0);
  const [choice, setChoice] = useState(props.match.params.choice);
  const [firstChoice, setFirstChoice] = useState();

  const type = props.match.params.grid;
  const keyword = props.match.params.keyword;
  const id = props.match.params.id;
  const title = {
    boxed: 'Product Page',
    fullwidth: 'Product Page',
  };

  /*******************STEP 1. Search logic ***********************/
  useEffect(() => {
    // console.log(firstChoice,choice)
    if (keyword !== props.serachKeyword) {
      //search for if keyword exist in the database
      const searchIfKeywordExits = async (keyword) => {
        try {
          const result = await API.graphql(graphqlOperation(listKeywords));
          const finalResult = result.data.listKeywords.items;
          const foundKeyword = finalResult.find(
            (obj) => keyword === obj.searchedKeyword
          );

          if (!foundKeyword) {
            const searchForProducts = async (keyword) => {
              try {
                const products = await props.searchProducts(keyword);
                // save products to database
                try {
                  await API.graphql(
                    graphqlOperation(createKeyword, {
                      input: {
                        keywordCount: 1,
                        searchedKeyword: keyword,
                        productBluePrint: products,
                      },
                    })
                  );
                } catch (err) {
                  console.log(err, 'Error saving on database');
                }
              } catch (err) {
                console.log(err);
              }
            };
            searchForProducts(keyword);
          } else {
            props.searchProductsLoading();
            const result = await API.graphql(
              graphqlOperation(updateKeyword, {
                input: {
                  id: foundKeyword.id,
                  keywordCount: foundKeyword.keywordCount + 1,
                  searchedKeyword: keyword,
                },
              })
            );

            const x = result.data.updateKeyword.productBluePrint;

            props.receiveSearchProducts(x);
          }
        } catch (error) {
          console.log(error);
        }
      };

      searchIfKeywordExits(keyword);
    }
    // if(keyword !== props.search)
  }, [keyword, id, props.userId]);

  useEffect(() => {
    document.querySelector('body').classList.remove('mmenu-active');
  });

  useEffect(() => {
    if (type !== 'boxed' && type !== 'fullwidth') {
      window.location = process.env.PUBLIC_URL + '/pages/404';
    }
  }, [type]);

  function hideSideBar() {
    if (
      document.querySelector('body').classList.contains('sidebar-filter-active')
    )
      document.querySelector('body').classList.remove('sidebar-filter-active');
  }

  return (
    <>
      <Helmet>
        <title>Kachuwa Nepal's No 1 Shopping Site</title>
      </Helmet>

      <h1 className="d-none">Kachuwa Nepal's No 1 Shopping Site</h1>

      <div className="main">
        {/* <PageHeader title={title[type]} subTitle="Shop" /> */}
        <Breadcrumb
          title={title[type]}
          parent1={['Shop', 'shop/nosidebar']}
          adClass="mb-2"
          container={type === 'boxed' ? 'container' : 'container-fluid'}
        />

        <div className="page-content">
          <div className={type === 'boxed' ? 'container' : 'container-fluid'}>
            {
              <ProductListTwo
                type={type}
                keywordToSearch={keyword}
                progress={progress}
                choice={choice}
              />
            }

            <div className="sidebar-filter-overlay" onClick={hideSideBar}></div>

            <SideBar numbers={50} />
          </div>
        </div>
      </div>
    </>
  );
}

export const mapStateToProps = (state) => {
  return {
    image: state.imageSet.file,
    search: state.search.products,
    serachKeyword: state.search.searchedKeyword,
    error: state.search.error,
    innerChoice: state.choice.userChoice,
    userId: state.auth.userId ? state.auth.userId : 'unknown',
  };
};

export default connect(mapStateToProps, {
  searchProducts,
  searchProductsLoading,

  searchImageProducts,
  receiveSearchProducts,
  resetSearchProducts,
})(React.memo(NoSideBar));
