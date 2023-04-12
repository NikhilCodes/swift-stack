import type { EditProjectById, UpdateProjectInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormProject = NonNullable<EditProjectById['project']>

interface ProjectFormProps {
  project?: EditProjectById['project']
  onSave: (data: UpdateProjectInput, id?: FormProject['id']) => void
  error: RWGqlError
  loading: boolean
}

const ProjectForm = (props: ProjectFormProps) => {
  const onSubmit = (data: FormProject) => {
    props.onSave(data, props?.project?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormProject> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.project?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="dbPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Db password
        </Label>

        <TextField
          name="dbPassword"
          defaultValue={props.project?.dbPassword}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dbPassword" className="rw-field-error" />

        {/*<Label*/}
        {/*  name="dbUser"*/}
        {/*  className="rw-label"*/}
        {/*  errorClassName="rw-label rw-label-error"*/}
        {/*>*/}
        {/*  Db user*/}
        {/*</Label>*/}

        {/*<TextField*/}
        {/*  name="dbUser"*/}
        {/*  defaultValue={props.project?.dbUser}*/}
        {/*  className="rw-input"*/}
        {/*  errorClassName="rw-input rw-input-error"*/}
        {/*  validation={{ required: true }}*/}
        {/*/>*/}

        <FieldError name="dbUser" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.project?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm
