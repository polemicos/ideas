import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'

export const NewIdeaPage = () => {
  const [state, setState] = useState({
    title: '',
    nick: '',
    description: '',
    text: '',
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.info('Submitted', state)
        }}
      >
        <Input 
          name={'title'} 
          label={'Title for your idea'} 
          state={state} 
          setState={setState}
        />
        
        <Input 
          name={'description'} 
          label={'Describe your idea'} 
          state={state} 
          setState={setState}
        />

        <Textarea
          name={'text'} 
          label={'Write your idea'} 
          state={state} 
          setState={setState} 
        />

        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}