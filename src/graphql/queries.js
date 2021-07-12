/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getKeyword = /* GraphQL */ `
  query GetKeyword($id: ID!) {
    getKeyword(id: $id) {
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
export const listKeywords = /* GraphQL */ `
  query ListKeywords(
    $filter: ModelKeywordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        keywordCount
        searchedKeyword
        productBluePrint {
          page
          totalProducts
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
