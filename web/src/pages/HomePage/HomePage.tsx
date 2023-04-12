import { useState } from 'react'

import { gql } from '@apollo/client'

import { MetaTags, useMutation } from '@redwoodjs/web'

const APPLY_TERRAFORM = gql`
  mutation ApplyTerraform($projectName: String!, $postgresPassword: String!) {
    applyTerraform(
      projectName: $projectName
      postgresPassword: $postgresPassword
    ) {
      success
      message
      error
    }
  }
`

const HomePage = () => {
  const [projectName, setProjectName] = useState('')
  const [postgresPassword, setPostgresPassword] = useState('')
  const [applyTerraformMutation, { loading, error }] = useMutation(
    APPLY_TERRAFORM,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        console.log('data', data)
      },
    }
  )

  console.log('loading', loading)
  console.log('error', error)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await applyTerraformMutation({
      variables: {
        projectName,
        postgresPassword,
      },
    })
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="w-full max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Create Project</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <div className={'mb-4'}>
              <label
                htmlFor="projectName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label
                htmlFor="postgresPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Database Password
              </label>
              <input
                type="password"
                id="postgresPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={postgresPassword}
                onChange={(e) => setPostgresPassword(e.target.value)}
                placeholder="Enter Postgres password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Lift Off 🚀
          </button>
        </form>
      </div>
    </>
  )
}

export default HomePage
