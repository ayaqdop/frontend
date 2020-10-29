import React from 'react'
import PropTypes from 'prop-types'
import './Score.css'

const Score = ({ matchState }) => {
  const currentTeam =
    matchState.teams[0].moves > 0 ? matchState.teams[0] : matchState.teams[1]
  const side = matchState.teams[0].moves > 0 ? 'moves-left' : 'moves-right'

  return (
    <footer>
      <div>
        {matchState.teams[0].score} : {matchState.teams[1].score}
      </div>
      <div>
        {matchState.teams[0].name} {matchState.teams[1].name}
      </div>
      <div className={side}>{currentTeam.moves} moves left</div>
    </footer>
  )
}

Score.propTypes = {
  matchState: PropTypes.object.isRequired
}

export default Score
