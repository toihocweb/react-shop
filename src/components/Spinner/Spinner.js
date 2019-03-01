import React from 'react'
import {  Dimmer } from 'semantic-ui-react'
import {RingLoader} from 'react-spinners'

const Spinner = () => {
  return (
    <Dimmer active>
    {/* <Loader size='huge' content={"Preparing..."} /> */}
    <RingLoader size={100} color={'#36D7B7'}/>
</Dimmer>
  )
}

export default Spinner
