import React from 'react'

function Die(props) {

  const styles = {
  backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  

  return (
    <div className='dice-face' style={styles} onClick={props.holdDice}>
      {[...Array(props.value)].map(() => (
        <span
          className={'pip'}
          style={{
            height: '12px',
            width: '12px',
            background: 'black',
            display: 'inline-block',
            alignSelf: 'center',
            justifySelf: 'center',
            borderRadius: '50%',
            backgroundColor: '#333',
            boxShadow: 'inset 0 3px #111, inset 0 -3px #555',
          }}
        ></span>
      ))}
    </div>
  );
}

export default Die