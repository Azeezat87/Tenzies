import Die from './Components/Die';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function generateNewDie() {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
}

function allNewDice() {
  let newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push(generateNewDie());
  }
  return newDice;
}

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [count, setCount] = useState(0);

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
    if (startTime === 0 || tenzies) {
      setStartTime(new Date().getTime());
    }
    if (tenzies) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameDice = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameDice) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div className='App'>
      {tenzies && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight} />
      )}
      <main>
        <div style={{ filter: tenzies ? 'opacity(0.3)' : '' }}>
          <h1>Tenzies</h1>

          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className='dice-container'>{diceElements}</div>
          <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
        </div>
        {tenzies && (
          <div className='pop-up'>
            <h1>You won!</h1>
            <p>Congratulations! You have won the game.</p>
            <p>You spent {(new Date().getTime() - startTime) / 1000} seconds</p>
            <p>You rolled {count} times</p>

            <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
