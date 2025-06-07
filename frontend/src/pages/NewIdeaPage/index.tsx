import { useFormik } from 'formik'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      text: '',
    },
    onSubmit: (values) => {
      console.info('Submitted', values)
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {}
      
      // Title
      if (!values.title) errors.title = 'Required'
      else if (values.title.length < 5) errors.title = 'Too short'
      else if (!values.title.match(/^[a-zA-Z0-9 ]+$/)) errors.title = 'Only letters, numbers and spaces allowed'

      // Description
      if (!values.description) errors.description = 'Required'
      else if (values.description.length < 10) errors.description = 'Too short'

      // Text
      if (!values.text) errors.text = 'Required'
      else if (values.text.length < 100) errors.text = 'Text of an idea must be at least 100 characters long'

      return errors
    }
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit()
        }}
      >
        <Input 
          name={'title'} 
          label={'Title for your idea'} 
          formik={formik}
        />
        
        <Input 
          name={'description'} 
          label={'Describe your idea'} 
          formik={formik}
        />

        <Textarea
          name={'text'} 
          label={'Write your idea'} 
          formik={formik}
        />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}