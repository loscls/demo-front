export interface Product {
  ID: number,
  image: string,
  brand: string,
  name: string,
  price: number,
  quantity: number,
  uniCode: string
 }

 export interface ProductInCart {
  ID: number,
  product: Product,
  user: User;
  totalPrice: number,
  quantity: number
 }

 export interface User {
  id: number,
  name: string,
  surname: string,
  email: string,
  role: string,
  balance: number
 }

  export interface AuthenticationRequest {
    email: string,
    password: string
  }

  export interface RegistrationRequest {
    name: string,
    surname: string,
    email: string,
    password: string
  }

  export interface getCartResponse {
    productInCart: ProductInCart;
    totalQuantity: number,
    totalPrice: number
  }

  export interface AddToCartRequest {
    uniCode: string,
    quantity: number
  }

  export interface addBalanceRequest {
    balance: number
  }

  export interface Paging {
    content: Product[],
    totalElements: number,
    first: boolean,
    last: boolean,
    number: number

  }
