export const schema = gql`
  type ApplyTerraformResult {
    success: Boolean!
    message: String
    error: String
  }

  type Mutation {
    applyTerraform(
      projectName: String!
      postgresPassword: String!
    ): ApplyTerraformResult! @requireAuth
  }
`
