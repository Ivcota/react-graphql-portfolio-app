/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Upload: any
}

export interface NexusGenObjects {
  FileResponse: { // root type
    fileURL: string; // String!
    filename?: string | null; // String
    success: boolean; // Boolean!
  }
  MeObject: { // root type
    isAuth: boolean; // Boolean!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Project: { // root type
    desc: string; // String!
    githubURL: string; // String!
    id: string; // ID!
    imageUrl: string; // String!
    title: string; // String!
    websiteURL?: string | null; // String
  }
  ProjectResponse: { // root type
    code: number; // Int!
    message: string; // String!
    project?: NexusGenRootTypes['Project'] | null; // Project
    success: boolean; // Boolean!
  }
  Query: {};
  User: { // root type
    email: string; // String!
    firstName: string; // String!
    githubURL?: string | null; // String
    id: number; // Int!
    isAdmin: boolean; // Boolean!
    lastName?: string | null; // String
    profilePictureURL?: string | null; // String
    socialMediaURL?: string | null; // String
    websiteURL?: string | null; // String
  }
  UserResponse: { // root type
    User?: NexusGenRootTypes['User'] | null; // User
    code: number; // Int!
    message: string; // String!
    success: boolean; // Boolean!
    token?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  FileResponse: { // field return type
    fileURL: string; // String!
    filename: string | null; // String
    success: boolean; // Boolean!
  }
  MeObject: { // field return type
    isAuth: boolean; // Boolean!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    CreateProject: NexusGenRootTypes['ProjectResponse'] | null; // ProjectResponse
    CreateUser: NexusGenRootTypes['UserResponse'] | null; // UserResponse
    DeleteProject: boolean | null; // Boolean
    DeleteUser: boolean | null; // Boolean
    EditProject: NexusGenRootTypes['ProjectResponse']; // ProjectResponse!
    EditUser: NexusGenRootTypes['UserResponse']; // UserResponse!
    SessionEditUser: NexusGenRootTypes['UserResponse']; // UserResponse!
    UploadFile: NexusGenRootTypes['FileResponse']; // FileResponse!
    UserLogin: NexusGenRootTypes['UserResponse'] | null; // UserResponse
  }
  Project: { // field return type
    desc: string; // String!
    githubURL: string; // String!
    id: string; // ID!
    imageUrl: string; // String!
    title: string; // String!
    websiteURL: string | null; // String
  }
  ProjectResponse: { // field return type
    code: number; // Int!
    message: string; // String!
    project: NexusGenRootTypes['Project'] | null; // Project
    success: boolean; // Boolean!
  }
  Query: { // field return type
    GetManyUsers: Array<NexusGenRootTypes['User'] | null>; // [User]!
    GetSingleUser: NexusGenRootTypes['User'] | null; // User
    Me: NexusGenRootTypes['MeObject']; // MeObject!
    SingleProject: NexusGenRootTypes['Project']; // Project!
  }
  User: { // field return type
    email: string; // String!
    firstName: string; // String!
    githubURL: string | null; // String
    id: number; // Int!
    isAdmin: boolean; // Boolean!
    lastName: string | null; // String
    profilePictureURL: string | null; // String
    projects: Array<NexusGenRootTypes['Project'] | null>; // [Project]!
    socialMediaURL: string | null; // String
    websiteURL: string | null; // String
  }
  UserResponse: { // field return type
    User: NexusGenRootTypes['User'] | null; // User
    code: number; // Int!
    message: string; // String!
    success: boolean; // Boolean!
    token: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  FileResponse: { // field return type name
    fileURL: 'String'
    filename: 'String'
    success: 'Boolean'
  }
  MeObject: { // field return type name
    isAuth: 'Boolean'
    user: 'User'
  }
  Mutation: { // field return type name
    CreateProject: 'ProjectResponse'
    CreateUser: 'UserResponse'
    DeleteProject: 'Boolean'
    DeleteUser: 'Boolean'
    EditProject: 'ProjectResponse'
    EditUser: 'UserResponse'
    SessionEditUser: 'UserResponse'
    UploadFile: 'FileResponse'
    UserLogin: 'UserResponse'
  }
  Project: { // field return type name
    desc: 'String'
    githubURL: 'String'
    id: 'ID'
    imageUrl: 'String'
    title: 'String'
    websiteURL: 'String'
  }
  ProjectResponse: { // field return type name
    code: 'Int'
    message: 'String'
    project: 'Project'
    success: 'Boolean'
  }
  Query: { // field return type name
    GetManyUsers: 'User'
    GetSingleUser: 'User'
    Me: 'MeObject'
    SingleProject: 'Project'
  }
  User: { // field return type name
    email: 'String'
    firstName: 'String'
    githubURL: 'String'
    id: 'Int'
    isAdmin: 'Boolean'
    lastName: 'String'
    profilePictureURL: 'String'
    projects: 'Project'
    socialMediaURL: 'String'
    websiteURL: 'String'
  }
  UserResponse: { // field return type name
    User: 'User'
    code: 'Int'
    message: 'String'
    success: 'Boolean'
    token: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    CreateProject: { // args
      desc: string; // String!
      githubURL: string; // String!
      imageUrl: string; // String!
      title: string; // String!
      userId?: number | null; // Int
      websiteURL?: string | null; // String
    }
    CreateUser: { // args
      email: string; // String!
      firstName: string; // String!
      password: string; // String!
    }
    DeleteProject: { // args
      id: number; // Int!
    }
    DeleteUser: { // args
      id: number; // Int!
    }
    EditProject: { // args
      desc?: string | null; // String
      githubURL?: string | null; // String
      id: number; // Int!
      imageUrl?: string | null; // String
      title?: string | null; // String
      websiteURL?: string | null; // String
    }
    EditUser: { // args
      firstName?: string | null; // String
      githubURL?: string | null; // String
      id: number; // Int!
      lastName?: string | null; // String
      profilePictureURL?: string | null; // String
      socialMediaURL?: string | null; // String
      websiteURL?: string | null; // String
    }
    SessionEditUser: { // args
      firstName?: string | null; // String
      githubURL?: string | null; // String
      lastName?: string | null; // String
      profilePictureURL?: string | null; // String
      socialMediaURL?: string | null; // String
      websiteURL?: string | null; // String
    }
    UploadFile: { // args
      file: NexusGenScalars['Upload']; // Upload!
    }
    UserLogin: { // args
      email: string; // String!
      password: string; // String!
    }
  }
  Query: {
    GetManyUsers: { // args
      skip: number; // Int!
      take: number; // Int!
    }
    GetSingleUser: { // args
      id: number; // Int!
    }
    SingleProject: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}