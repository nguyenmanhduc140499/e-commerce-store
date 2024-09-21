import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AllCollectionResponse = {
  __typename?: 'AllCollectionResponse';
  code: Scalars['Float']['output'];
  listCollection?: Maybe<Array<Collection>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AllOrderResponse = {
  __typename?: 'AllOrderResponse';
  code: Scalars['Float']['output'];
  listOrder?: Maybe<Array<ListOrderData>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AllProductResponse = {
  __typename?: 'AllProductResponse';
  code: Scalars['Float']['output'];
  listProduct?: Maybe<Array<Product>>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image: Scalars['String']['output'];
  products?: Maybe<Array<Product>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CollectionResponse = {
  __typename?: 'CollectionResponse';
  code: Scalars['Float']['output'];
  collection?: Maybe<Collection>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateOrderInput = {
  address: Scalars['String']['input'];
  customerClerkId: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  products: Array<OrderItemTypeInput>;
  totalAmount: Scalars['Float']['input'];
};

export type CreateProductInput = {
  category: Scalars['String']['input'];
  collections?: InputMaybe<Array<Scalars['String']['input']>>;
  colors?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  expense: Scalars['Float']['input'];
  media: Array<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  sizes?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  clerkId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DeleteCollectionInput = {
  _id: Scalars['String']['input'];
};

export type DeleteProductInput = {
  _id: Scalars['String']['input'];
};

export type DetailsOrderInput = {
  orderId: Scalars['String']['input'];
};

export type GetCollectionInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetProductInput = {
  productId: Scalars['String']['input'];
};

export type GetUserInput = {
  clerkId: Scalars['String']['input'];
};

export type IResponse = {
  __typename?: 'IResponse';
  code: Scalars['Float']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ListOrderData = {
  __typename?: 'ListOrderData';
  _id: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  customer: Scalars['String']['output'];
  products: Scalars['Float']['output'];
  totalAmount: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: Collection;
  createOrder: OrderResponse;
  createProduct: ProductResponse;
  createUser: UserResponse;
  deleteCollection: IResponse;
  deleteProduct: IResponse;
  updateCollection: CollectionResponse;
  updateProduct: ProductResponse;
  userWishlist: UserResponse;
};


export type MutationCreateCollectionArgs = {
  CreateCollectionInput: CreateCollectionInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteCollectionArgs = {
  DeleteCollectionInput: DeleteCollectionInput;
};


export type MutationDeleteProductArgs = {
  DeleteProductInput: DeleteProductInput;
};


export type MutationUpdateCollectionArgs = {
  UpdateCollectionInput: UpdateCollectionInput;
};


export type MutationUpdateProductArgs = {
  UpdateProductInput: UpdateProductInput;
};


export type MutationUserWishlistArgs = {
  userWishlistInput: UserWishlistInput;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID']['output'];
  address: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerClerkId: Scalars['String']['output'];
  customerName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  products: Array<OrderItemType>;
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrderItemType = {
  __typename?: 'OrderItemType';
  color: Scalars['String']['output'];
  product: Product;
  quantity: Scalars['Float']['output'];
  size: Scalars['String']['output'];
};

export type OrderItemTypeInput = {
  color: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  size: Scalars['String']['input'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  code: Scalars['Float']['output'];
  message?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  success: Scalars['Boolean']['output'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID']['output'];
  category: Scalars['String']['output'];
  collections?: Maybe<Array<Scalars['String']['output']>>;
  colors?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  expense: Scalars['Float']['output'];
  media: Array<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  sizes?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  code: Scalars['Float']['output'];
  message?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCollection?: Maybe<CollectionResponse>;
  getCollectionTitle?: Maybe<Scalars['String']['output']>;
  getListCollection?: Maybe<AllCollectionResponse>;
  getListOrder?: Maybe<AllOrderResponse>;
  getListProduct?: Maybe<AllProductResponse>;
  getOrderDetails: OrderResponse;
  getProductDetail: ProductResponse;
  getUserDetail: UserResponse;
};


export type QueryGetCollectionArgs = {
  GetCollectionInput: GetCollectionInput;
};


export type QueryGetCollectionTitleArgs = {
  _id: Scalars['String']['input'];
};


export type QueryGetOrderDetailsArgs = {
  detailsOrderInput: DetailsOrderInput;
};


export type QueryGetProductDetailArgs = {
  getProductInput: GetProductInput;
};


export type QueryGetUserDetailArgs = {
  getUserInput: GetUserInput;
};

export type UpdateCollectionInput = {
  _id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateProductInput = {
  _id: Scalars['String']['input'];
  category: Scalars['String']['input'];
  collections?: InputMaybe<Array<Scalars['String']['input']>>;
  colors?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  expense: Scalars['Float']['input'];
  media: Array<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  sizes?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  clerkId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wishlist?: Maybe<Array<Scalars['String']['output']>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  code: Scalars['Float']['output'];
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UserWishlistInput = {
  clerkId: Scalars['String']['input'];
  wishlistProductId: Scalars['String']['input'];
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, clerkId: string, email: string, name: string, wishlist?: Array<string> | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type UserWishlistMutationVariables = Exact<{
  userWishlistInput: UserWishlistInput;
}>;


export type UserWishlistMutation = { __typename?: 'Mutation', userWishlist: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, clerkId: string, email: string, name: string, wishlist?: Array<string> | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetUserDetailQueryVariables = Exact<{
  getUserInput: GetUserInput;
}>;


export type GetUserDetailQuery = { __typename?: 'Query', getUserDetail: { __typename?: 'UserResponse', code: number, success: boolean, message?: string | null, user?: { __typename?: 'User', _id: string, clerkId: string, email: string, name: string, wishlist?: Array<string> | null, createdAt?: any | null, updatedAt?: any | null } | null } };


export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    code
    success
    message
    user {
      _id
      clerkId
      email
      name
      wishlist
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UserWishlistDocument = gql`
    mutation UserWishlist($userWishlistInput: UserWishlistInput!) {
  userWishlist(userWishlistInput: $userWishlistInput) {
    code
    success
    message
    user {
      _id
      clerkId
      email
      name
      wishlist
      createdAt
      updatedAt
    }
  }
}
    `;
export type UserWishlistMutationFn = Apollo.MutationFunction<UserWishlistMutation, UserWishlistMutationVariables>;

/**
 * __useUserWishlistMutation__
 *
 * To run a mutation, you first call `useUserWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userWishlistMutation, { data, loading, error }] = useUserWishlistMutation({
 *   variables: {
 *      userWishlistInput: // value for 'userWishlistInput'
 *   },
 * });
 */
export function useUserWishlistMutation(baseOptions?: Apollo.MutationHookOptions<UserWishlistMutation, UserWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserWishlistMutation, UserWishlistMutationVariables>(UserWishlistDocument, options);
      }
export type UserWishlistMutationHookResult = ReturnType<typeof useUserWishlistMutation>;
export type UserWishlistMutationResult = Apollo.MutationResult<UserWishlistMutation>;
export type UserWishlistMutationOptions = Apollo.BaseMutationOptions<UserWishlistMutation, UserWishlistMutationVariables>;
export const GetUserDetailDocument = gql`
    query GetUserDetail($getUserInput: GetUserInput!) {
  getUserDetail(getUserInput: $getUserInput) {
    code
    success
    message
    user {
      _id
      clerkId
      email
      name
      wishlist
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetUserDetailQuery__
 *
 * To run a query within a React component, call `useGetUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailQuery({
 *   variables: {
 *      getUserInput: // value for 'getUserInput'
 *   },
 * });
 */
export function useGetUserDetailQuery(baseOptions: Apollo.QueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables> & ({ variables: GetUserDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
      }
export function useGetUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export function useGetUserDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export type GetUserDetailQueryHookResult = ReturnType<typeof useGetUserDetailQuery>;
export type GetUserDetailLazyQueryHookResult = ReturnType<typeof useGetUserDetailLazyQuery>;
export type GetUserDetailSuspenseQueryHookResult = ReturnType<typeof useGetUserDetailSuspenseQuery>;
export type GetUserDetailQueryResult = Apollo.QueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;