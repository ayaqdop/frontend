import React from "react";

import "./index.css";

export const MatchMaking = () => {
  const [room, setRoom] = React.useState(null);
  const [showError, setShowError] = React.useState(false);

  const onChange = (e) => {
    setRoom(e.target.value.trim());
  };

  const joinRoom = () => {
    if (room?.length) console.log(`Joinin match: ${room}`);
    else setShowError(true);
  };

  const createRoom = () => {
    console.log("Creating new match");
  };

  return (
    <main className="match-making">
      <form>
        <button type="button" onClick={createRoom}>
          Create Match
        </button>
        <hr />
        <input
          type="text"
          placeholder="Match"
          name="match"
          onChange={onChange}
        />
        <button type="button" onClick={joinRoom}>
          Join Match
        </button>
        {showError && <p className="message">Please specify match to join</p>}
      </form>
    </main>
  );
};
