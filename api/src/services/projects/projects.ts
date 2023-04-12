import type {
  QueryResolvers,
  MutationResolvers,
  ProjectRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import {
  applyTerraform,
  destroyTerraform,
} from 'src/services/terraform/terraform'

export const projects: QueryResolvers['projects'] = () => {
  return db.project.findMany()
}

export const project: QueryResolvers['project'] = ({ id }) => {
  return db.project.findUnique({
    where: { id },
  })
}

export const createProject: MutationResolvers['createProject'] = async ({
  input,
}) => {
  const newProject = await db.project.create({
    data: input,
  })
  applyTerraform({
    projectId: newProject.id,
    projectName: input.name,
    postgresPassword: input.dbPassword,
  }).then((output) => {
    const lines = output.stdout.split('\n')
    const lastLine = lines[lines.length - 2]
    const ip = JSON.parse(lastLine.split(' = ')[1])
    console.log(ip)
    db.project
      .update({
        where: { id: newProject.id },
        data: { ip },
      })
      .then()
  })
  return newProject
}

export const updateProject: MutationResolvers['updateProject'] = ({
  id,
  input,
}) => {
  return db.project.update({
    data: input,
    where: { id },
  })
}

export const deleteProject: MutationResolvers['deleteProject'] = async ({
  id,
}) => {
  const project = await db.project.findUnique({ where: { id } })
  destroyTerraform({
    projectId: id,
    projectName: project.name,
    postgresPassword: project.dbPassword,
  }).then(console.log)
  return db.project.delete({
    where: { id },
  })
}

export const Project: ProjectRelationResolvers = {
  user: (_obj, { root }) => {
    return db.project.findUnique({ where: { id: root?.id } }).user()
  },
}
