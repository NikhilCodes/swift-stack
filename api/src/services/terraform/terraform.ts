import * as fs from 'fs'

import { downloadStateFile } from 'src/functions/aws'
import { saveStateFile } from 'src/functions/filesystem'
import {
  runTerraformDestroy,
  runTerraformScript,
} from 'src/functions/terraform'

export const applyTerraform = async ({
  projectId,
  projectName,
  postgresPassword,
}) => {
  try {
    const stdout = await runTerraformScript({
      projectId,
      projectName,
      postgresPassword,
    })
    return {
      success: true,
      message: 'Terraform apply has been triggered.',
      stdout,
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while triggering Terraform apply.',
      error: error,
    }
  }
}

export const destroyTerraform = async ({
  projectId,
  projectName,
  postgresPassword,
}) => {
  try {
    const stateFileData = await downloadStateFile(projectId)
    console.log('Fetched state file data', stateFileData)

    fs.mkdirSync(`/tmp/${projectId}-terraform-workspace`, { recursive: true })

    const stateFilePath = `/tmp/${projectId}-terraform-workspace/terraform.tfstate`
    await saveStateFile(stateFileData, stateFilePath)
    console.log('Saved state file')
    console.log('Running terraform destroy')
    const stdout = await runTerraformDestroy({
      stateFilePath,
      projectId,
      projectName,
      postgresPassword,
    })
    console.log('Terraform destroy DONE', stdout)
    return {
      success: true,
      message: 'Terraform destroy has been triggered.',
      stdout,
    }
  } catch (error) {
    console.error(
      `Error destroying resources for project ${projectId}: ${error}`
    )
    return {
      success: false,
      message: 'An error occurred while triggering Terraform destroy.',
      error: error,
    }
  }
}
