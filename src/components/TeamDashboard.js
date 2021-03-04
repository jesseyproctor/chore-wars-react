import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTeam, postNotification, getFeed } from './../api'
import Feed from './Feed'
import ScoreBoard from './ScoreBoard'

const TeamDashboard = ({ token, profileUsername, today, myPod, feedPk }) => {
  const { teamPk } = useParams()
  const [team, setTeam] = useState()
  const [notPosted, setNotPosted] = useState(false)
  // const [feed, setFeed] = useState()
  // const [feedPk, setFeedPk] = useState()

  useEffect(updateTeam, [token, teamPk, today, profileUsername, notPosted])

  function updateTeam () {
    getTeam(token, teamPk).then(team => setTeam(team))
  }

  useEffect(updateNotifications, [token, today, notPosted])
  function updateNotifications () {
    if (team && notPosted && feedPk) {
      for (const member of team.members) {
        console.log(member.possible_chore_points.chore__points__sum, member.earned_chore_points.chore__points__sum)
        if (member.earned_chore_points.chore__points__sum / member.possible_chore_points.chore__points__sum > 0.5) {
          console.log(member.username + 'has more than than than 50%')
          createNotifications(feedPk, member.username, 'you are above 30%')
        }
      }
    }
  }

  function createNotifications (feedPk, target, message) {
    postNotification(token, feedPk, target, message).then((response) => {
      updateTeam()
      setNotPosted(false)
    }
    )
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {team &&
        (
          <>
            <div className='flex-center'>
              <div className='team-dashboard-container' style={{ backgroundImage: `url(${team.background_image}` }}>
                <div className='team-title'>{team.name}!</div>
                <div className='team-slogan'>{team.slogan}!
                </div>
                <audio controls src={team.theme_song} />
              </div>
              <div style={{ width: '100%', margin: '20px', justifyContent: 'space-between' }} className='flex'>
                <div style={{ border: `3px solid ${team.dashboard_style}`, backgroundColor: `${team.dashboard_style}` }} className='team-feed-container'>
                  {feedPk && (
                    <Feed token={token} profileUsername={profileUsername} today={today} feedPk={feedPk} />
                  )}
                </div>
                <div className='team-dashboard-scoreboard-container' style={{ border: `3px solid ${team.dashboard_style}` }}>
                  <div style={{ justifyContent: 'center' }} className='team-scoreblock flex-col'>
                    {team.members.length > 0
                      ? (
                        <div>
                          {team.members.map(member => (
                            <ScoreBoard team={team} member={member} key={member.username} />
                          ))}
                        </div>
                        )
                      : <button style={{ border: `3px solid ${team.dashboard_style}`, backgroundColor: team.dashboard_style }} className='team-dash-button'><Link to={`/create-team-members/${team.pk}/${team.name}`}>Add Team Members</Link></button>}
                  </div>
                </div>
                {/* <button style={{ border: `3px solid ${team.dashboard_style}`, backgroundColor: team.dashboard_style }} className='team-dash-button'>Send Notifications</button> */}

                <button onClick={() => setNotPosted(true)} style={{ border: `3px solid ${team.dashboard_style}`, backgroundColor: team.dashboard_style }} className='team-dash-button'>Send Notifications</button>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default TeamDashboard
