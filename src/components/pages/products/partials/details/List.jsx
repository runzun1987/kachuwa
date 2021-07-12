import React,{ useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { productGalleryTwo } from '../../../../../utils';
import imagesLoaded from 'imagesloaded';
import Images from './Images';

const List = ({
  ind,
  mainId,
  listName,
  listId,
  img,
  activeIndex,
  setUrl,
  setActiveIndex,
  fixIds,
  compIndex,
  setId,
  conditon,
  setClickTrack,
  clickTrack,
  activeIndexArr,
  setActiveIndexArr,
  product
}) => {

  const bigImages = product.lgPictures ? product.lgPictures : product.pictures;
  const clicks = clickTrack;
  const activeArr = activeIndexArr;

  
  useEffect(() => {
    productGalleryTwo()

    document.querySelector('.skel-pro-single').classList.remove('loaded');

    let imgLoad = imagesLoaded('.product-main-image', { background: true });

    imgLoad.on('done', function(instance, image) {
      document.querySelector('.skel-pro-single').classList.add('loaded');
    });
  }, []);
  
  const listClickHandler = (id, mId, ind) => {


    if (activeIndex === ind) {
  
      setActiveIndex(null);
      clicks.splice(compIndex, 1);
      activeArr.splice(compIndex, 1);
    } else {
  
      activeArr[compIndex] = mId;
      clicks[compIndex] = mId + ':' + id;

      setActiveIndex(ind);
    }
    setClickTrack(clicks);

    setActiveIndexArr(activeArr);

    //Join main id and id to mId:id
    const singleVal = mId + ':' + id;
    //get fix ids from state
    const fixIdsState = fixIds;

    //setting pure Sting setPureSting

    //checking the singleVal is in specific index id fixIds
    if (fixIdsState[compIndex] === singleVal) {
      fixIdsState[compIndex] = null;
    } else {
      //from compIndex received from on click event inserting main id and in inside array
      fixIdsState[compIndex] = mId + ':' + id;
    }

    //converging array to string with special character ';'
    let finalString = fixIdsState.join(';');
    //modifing string if special character starts with ';'
    finalString =
      finalString.charAt(0) === ';' ? finalString.substring(1) : finalString;

    //setting string as id in a state
    setId(finalString);
  };

  return (
    <span className={conditon ? 'list top' : 'list'}>
      <div
        className={
          ind === activeIndex
            ? `inside select`
            : `${conditon ? 'inside deactive' : 'inside'} `
        }
        onClick={() => listClickHandler(listId, mainId, ind)}
      >
        <li className={`list-contains`}>
          {img && img.map((i,index) => {
            if (i.properties === mainId + ':' + listId) {
              return <button className={"prop-images"} to="#" data-image={ process.env.PUBLIC_URL + '/' + i.url } data-zoom-image={ process.env.PUBLIC_URL + '/' + bigImages[ index ] } key={ product.id + '-' + index }> <Images imageUrl={i.url} setUrl={setUrl}   /></button>;
            }
          })}

         <h4 className="list-name">{listName}</h4> 
        </li>
      </div>
    </span>
  );
};

function mapStateToProps( state, props ) {
  return {
      // product: state.data.products.filter( product => product.id === 8 )[ 0 ],
      product:state.productDetail.prodDetail,
      prodDetailLoadingState: state.productDetail.isLoading,
  }
}

export default connect( mapStateToProps )(List);
