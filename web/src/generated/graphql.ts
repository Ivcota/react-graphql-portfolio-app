import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FileResponse = {
  __typename?: 'FileResponse';
  fileURL: Scalars['String'];
  filename?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new project serverside */
  CreateProject?: Maybe<ProjectResponse>;
  /** Create a single new user */
  CreateUser?: Maybe<UserResponse>;
  DeleteProject?: Maybe<Scalars['Boolean']>;
  DeleteUser?: Maybe<Scalars['Boolean']>;
  EditProject: ProjectResponse;
  EditUser: UserResponse;
  UploadFile: FileResponse;
  UserLogin?: Maybe<UserResponse>;
};


export type MutationCreateProjectArgs = {
  desc: Scalars['String'];
  githubURL: Scalars['String'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  userId?: InputMaybe<Scalars['Int']>;
  websiteURL?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationEditProjectArgs = {
  desc?: InputMaybe<Scalars['String']>;
  githubURL?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  imageUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  websiteURL?: InputMaybe<Scalars['String']>;
};


export type MutationEditUserArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  githubURL?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: InputMaybe<Scalars['String']>;
  profilePictureURL?: InputMaybe<Scalars['String']>;
  socialMediaURL?: InputMaybe<Scalars['String']>;
  websiteURL?: InputMaybe<Scalars['String']>;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationUserLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** A project object that's related to a user */
export type Project = {
  __typename?: 'Project';
  desc: Scalars['String'];
  githubURL: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  websiteURL?: Maybe<Scalars['String']>;
};

/** Response object for the createProject mutation */
export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  code: Scalars['Int'];
  message: Scalars['String'];
  project?: Maybe<Project>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  /** Get a list of users. */
  GetManyUsers: Array<Maybe<User>>;
  /** Get single user */
  GetSingleUser?: Maybe<User>;
  SingleProject: Project;
};


export type QueryGetManyUsersArgs = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryGetSingleUserArgs = {
  id: Scalars['Int'];
};


export type QuerySingleProjectArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  JWT?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  githubURL?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  profilePictureURL?: Maybe<Scalars['String']>;
  projects: Array<Maybe<Project>>;
  socialMediaURL?: Maybe<Scalars['String']>;
  websiteURL?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  User?: Maybe<User>;
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type GetManyUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetManyUsersQuery = { __typename?: 'Query', GetManyUsers: Array<{ __typename?: 'User', id: number, email: string, firstName: string, lastName?: string | null, isAdmin: boolean, profilePictureURL?: string | null, socialMediaURL?: string | null, websiteURL?: string | null, githubURL?: string | null } | null> };


export const GetManyUsers = gql`
    query GetManyUsers {
  GetManyUsers {
    id
    email
    firstName
    lastName
    isAdmin
    profilePictureURL
    socialMediaURL
    websiteURL
    githubURL
  }
}
    `;

export const GetManyUsersDocument = gql`
    query GetManyUsers {
  GetManyUsers {
    id
    email
    firstName
    lastName
    isAdmin
    profilePictureURL
    socialMediaURL
    websiteURL
    githubURL
  }
}
    `;

export function useGetManyUsersQuery(options?: Omit<Urql.UseQueryArgs<GetManyUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetManyUsersQuery>({ query: GetManyUsersDocument, ...options });
};