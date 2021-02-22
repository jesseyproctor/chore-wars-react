import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import MusicSearch from './MusicSearch'
import { createTeam } from '../api'
import BackgroundImage from './BackgroundImage'

const CreateTeamDashboard = ({ token, username }) => {
  const [step, countStep] = useState(1)
  const [musicTrack, setMusicTrack] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamSlogan, setTeamSlogan] = useState('')
  const [teamDashboardStyle, setTeamDashboardStyle] = useState('black')

  function handleCreateTeam () {
    createTeam(token, teamName, teamSlogan, username, musicTrack, backgroundImage, teamDashboardStyle)
    handleDone()
  }

  if (step === 0) {
    return <Redirect to='/' />
  }

  function handleNextStep () {
    countStep(step + 1)
  }
  function handlePreviousStep () {
    countStep(step - 1)
  }
  const handleDone = () => {
    countStep(0)
  }
  return (

    <div>
      <div className='flex'>
        <div className='team-dashboard-container' style={{ backgroundColor: 'crimson', backgroundImage: `url(${backgroundImage}` }}>
          <div className='team-title'><input required onChange={(e) => setTeamName(e.target.value)} style={{ backgroundColor: '#00000022', color: 'white' }} placeholder='We are team TEAM' /></div>
          <div className='team-slogan'><input required onChange={(e) => setTeamSlogan(e.target.value)} style={{ backgroundColor: '#00000022', color: 'white' }} placeholder='Your Slogan' />
            <audio controls style={{ width: '140px', height: '15px' }} src={musicTrack} />
          </div>
          <div className='team-scoreblock flex' />
        </div>
        <div style={{ border: `3px solid ${teamDashboardStyle}`, backgroundColor: `${teamDashboardStyle}` }} className='team-feed-container'>
          <h1>Feed will go here:</h1>
          <ul />
        </div>
      </div>
      {(step === 1) &&
        <div className='animate__animated animate__fadeInLeft' style={{ textAlign: 'center' }}>Add Team Name and Team Slogan and Select Color from Dropdown
          <button onClick={() => handleNextStep()}>Next Step</button>
          <DropdownButton
            className='color-dropdown'
            alignRight
            title='Select Team Color'
            id='display-color'
            onSelect={(e) => setTeamDashboardStyle(e)}
          >
            <Dropdown.Item style={{ backgroundColor: 'crimson' }} eventKey='crimson'>Crimson</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: 'dodgerblue' }} eventKey='dodgerblue'>DodgerBlue</Dropdown.Item>
            <Dropdown.Item style={{ backgroundColor: 'purple' }} eventKey='purple'>Purple</Dropdown.Item>
          </DropdownButton>
        </div>}
      {(step === 2) &&
        <div className='animate__animated animate__fadeInLeft' style={{ textAlign: 'center' }}>
          <button onClick={() => handlePreviousStep()}>Previous Step</button>
          <button onClick={() => handleNextStep()}>Next Step</button>
          <BackgroundImage token={token} setBackgroundImage={setBackgroundImage} />
        </div>}
      {(step === 3) &&
        <div className='animate__animated animate__fadeInLeft' style={{ textAlign: 'center' }}>
          <button onClick={() => handlePreviousStep()}>Previous Step</button>
          <button onClick={() => handleNextStep()}>Next</button>
          <MusicSearch token={token} setMusicTrack={setMusicTrack} />
        </div>}
      {(step === 4) &&
        <div className='animate__animated animate__fadeInLeft' style={{ textAlign: 'center' }}>Complete Create Team
          <button onClick={() => handlePreviousStep()}>Previous Step</button>
          <button onClick={() => handleCreateTeam()}>Create Team</button>
        </div>}
    </div>
  )
}

export default CreateTeamDashboard
