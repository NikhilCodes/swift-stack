import type { Prisma, Project } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProjectCreateArgs>({
  project: {
    one: { data: { name: 'String', dbPassword: 'String' } },
    two: { data: { name: 'String', dbPassword: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Project, 'project'>
