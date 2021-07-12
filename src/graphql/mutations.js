/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createKeyword = /* GraphQL */ `
  mutation CreateKeyword(
    $input: CreateKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    createKeyword(input: $input, condition: $condition) {
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
export const updateKeyword = /* GraphQL */ `
  mutation UpdateKeyword(
    $input: UpdateKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    updateKeyword(input: $input, condition: $condition) {
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
export const deleteKeyword = /* GraphQL */ `
  mutation DeleteKeyword(
    $input: DeleteKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    deleteKeyword(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
