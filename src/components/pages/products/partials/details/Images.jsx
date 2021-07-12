import React from 'react'

const Images = ({imageUrl,setUrl})=>{
   return <img 
                src={imageUrl}
                alt="img"
                onClick={() => {
                  setUrl(imageUrl);
                }}
              />
}

export default Images