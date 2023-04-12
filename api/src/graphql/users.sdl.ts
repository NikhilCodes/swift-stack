export const schema = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    projects: [Project]!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastLogin: DateTime
    resetToken: String
    resetExpires: DateTime
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    password: String!
    lastLogin: DateTime
    resetToken: String
    resetExpires: DateTime
  }

  input UpdateUserInput {
    email: String
    password: String
    lastLogin: DateTime
    resetToken: String
    resetExpires: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
