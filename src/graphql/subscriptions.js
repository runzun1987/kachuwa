/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateKeyword = /* GraphQL */ `
  subscription OnCreateKeyword {
    onCreateKeyword {
      id
      keywordCount
      searchedKeyword
      productBluePrint {
        page
        products {
          id
          name
          price
          pictures
          smPictures
          shortDesc
          detail_url
          category
          brands
          top
          rating
          reviews
          stock
          totalProducts
          page
          searchedKeyword
        }
        totalProducts
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateKeyword = /* GraphQL */ `
  subscription OnUpdateKeyword {
    onUpdateKeyword {
      id
      keywordCount
      searchedKeyword
      productBluePrint {
        page
        products {
          id
          name
          price
          pictures
          smPictures
          shortDesc
          detail_url
          category
          brands
          top
          rating
          reviews
          stock
          totalProducts
          page
          searchedKeyword
        }
        totalProducts
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteKeyword = /* GraphQL */ `
  subscription OnDeleteKeyword {
    onDeleteKeyword {
      id
      keywordCount
      searchedKeyword
      productBluePrint {
        page
        products {
          id
          name
          price
          pictures
          smPictures
          shortDesc
          detail_url
          category
          brands
          top
          rating
          reviews
          stock
          totalProducts
          page
          searchedKeyword
        }
        totalProducts
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      cartList {
        totalPrice
        bigImageUrl
        smallImages
        title
        price
        stock
        description
        qty
        sum
        skus
        SkuId
        skus_json
      }
      date
      status
      firstName
      lastName
      country
      street
      town
      phone
      email
      note
      total
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      cartList {
        totalPrice
        bigImageUrl
        smallImages
        title
        price
        stock
        description
        qty
        sum
        skus
        SkuId
        skus_json
      }
      date
      status
      firstName
      lastName
      country
      street
      town
      phone
      email
      note
      total
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      cartList {
        totalPrice
        bigImageUrl
        smallImages
        title
        price
        stock
        description
        qty
        sum
        skus
        SkuId
        skus_json
      }
      date
      status
      firstName
      lastName
      country
      street
      town
      phone
      email
      note
      total
      createdAt
      updatedAt
    }
  }
`;
