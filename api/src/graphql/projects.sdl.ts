export const schema = gql`
  type Project {
    id: Int!
    name: String!
    dbPassword: String!
    dbUser: String
    userId: Int
    user: User
    ip: String
    createdAt: DateTime!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: Int!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    dbPassword: String!
    dbUser: String
    userId: Int
  }

  input UpdateProjectInput {
    name: String
    dbPassword: String
    dbUser: String
    userId: Int
    ip: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @skipAuth
    updateProject(id: Int!, input: UpdateProjectInput!): Project! @requireAuth
    deleteProject(id: Int!): Project! @requireAuth
  }
`
