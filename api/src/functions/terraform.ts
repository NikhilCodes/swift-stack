// import { requireAuth } from 'src/lib/auth'
import { exec } from 'child_process'

export const runTerraformScript = ({
  projectId,
  projectName,
  postgresPassword,
}) => {
  return new Promise<string>((resolve, reject) => {
    exec(
      `mkdir -p /tmp/${projectId}-terraform-workspace && cp *.tf /tmp/${projectId}-terraform-workspace/ && cd /tmp/${projectId}-terraform-workspace && terraform init -backend-config="bucket=${process.env.S3_BUCKET_NAME}" -backend-config="key=${projectId}/terraform.tfstate" && terraform apply -auto-approve -lock=false -var='project_name=${projectName}' -var='postgres_password=${postgresPassword}'`,
      { cwd: `./terraform` },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`)
          reject(error)
        } else if (stderr) {
          console.error(`Stderr: ${stderr}`)
          reject(new Error(stderr))
        } else {
          resolve(stdout)
        }
      }
    )
  })
}

export const runTerraformDestroy = ({
  stateFilePath,
  projectId,
  projectName,
  postgresPassword,
}) => {
  return new Promise((resolve, reject) => {
    exec(
      `cp *.tf /tmp/${projectId}-terraform-workspace/ && cd /tmp/${projectId}-terraform-workspace && terraform init -backend-config="bucket=${process.env.S3_BUCKET_NAME}" -backend-config="key=${projectId}/terraform.tfstate" && terraform destroy -auto-approve -state=${stateFilePath} -lock=false -var='project_name=${projectName}' -var='postgres_password=${postgresPassword}'`,
      { cwd: `./terraform` },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error running terraform destroy: ${error}`)
          reject(error)
        } else if (stderr) {
          console.error(`Stderr running terraform destroy: ${stderr}`)
          reject(stderr)
        } else {
          console.log(`Terraform destroy output: ${stdout}`)
          resolve(stdout)
        }
      }
    )
  })
}
