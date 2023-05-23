import gql from "graphql-tag";

const typeDefs = gql`
  type Post{
      id:ID!
      body:String!
      createAt:String!
      username:String!
  }

  type User{
  id:ID!
  email:String!
  username:String!
  createAt:String!
  }

  input RegisterInput{
    username:String!
    password:String!
    confirmPassword:String!
    email:String!
  }

  input LoginInput{
     email:String
     password:String
  }

  type Query{
    getPost:[Post]
    user(id:ID!):User
  }
  type Mutation {
   register(registerInput: RegisterInput) :User!
   login(loginInput: LoginInput):User
  }

`;


export default typeDefs;