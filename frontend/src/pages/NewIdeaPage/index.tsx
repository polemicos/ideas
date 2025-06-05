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