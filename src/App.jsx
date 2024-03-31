import styled from 'styled-components';
import data from './data.js';
import { useState } from 'react';
import Modal from './Modal.jsx';

function App() {
  const [state, setState] = useState({
    field: 'SWG',
    platform: 7,
    pieSize: 60,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWell, setActiveWell] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveWell(null);
  };

  const findMax = (arr) => {
    let max = 0;
    for (let item of arr) {
      if (item.expectedProduction > max) {
        max = item.expectedProduction;
      }
    }
    return max;
  };

  return (
    <StyledContainer>
      <h1>Workover activities</h1>
      <form>
        <label htmlFor='field'>Field</label>
        <select
          id='field'
          selected={state.field}
          onChange={(e) => setState({ ...state, field: e.target.value })}
        >
          <option>SWG</option>
          <option>Bulla</option>
        </select>
        <label htmlFor='platformSelection'>Platform</label>
        <select
          id='platformSelection'
          selected={state.platform}
          onChange={(e) => setState({ ...state, platform: e.target.value })}
        >
          <option>7</option>
          <option>15</option>
          <option>11</option>
          <option>13</option>
        </select>
        <label htmlFor='pieSize'>Pie size</label>
        <input
          type='range'
          min='20'
          max='10w0'
          value={state.pieSize}
          onChange={(e) => setState({ ...state, pieSize: e.target.value })}
        />
      </form>
      <div id='platform-container'>
        {data.map((item, _, arr) => {
          return (
            <div
              key={item.well}
              className={`platform`}
              style={{
                left: item.left,
                top: item.top,
                background:
                  item.difficulty === 'easy'
                    ? 'green'
                    : item.difficulty === 'medium'
                    ? 'yellow'
                    : 'red',
                width:
                  (item.expectedProduction * +state.pieSize) / +findMax(arr),
                height:
                  (item.expectedProduction * +state.pieSize) / +findMax(arr),
              }}
              onClick={(e) => {
                setIsModalOpen(true);
                setActiveWell(item.well);
              }}
            >
              {item.well}
            </div>
          );
        })}
      </div>
      {activeWell && (
        <Modal
          isModalOpen={isModalOpen}
          activeWell={activeWell}
          closeModal={closeModal}
        />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 1fr 6fr;
  row-gap: 20px;
  position: relative;

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    row-gap: 5px;
    column-gap: 30px;
    align-self: start;
  }

  label {
    grid-row: 1 / 2;
  }

  select {
    background: #fff;
    width: 200px;
    height: 50px;
    padding: 10px;
    text-align: center;
    outline: none;
    font-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 5px;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 0.7rem top 50%;
    background-size: 0.8rem auto;

    option {
      font-size: 16px;
      padding: 10px;
      height: 10px;
    }
  }

  input[type='range'] {
    width: 150px;
  }

  /* @keyframes bw {
    0% {
      border: 0px solid brown;
    }
    100% {
      border: 5px solid black;
    }
  } */

  #platform-container {
    min-width: 1000px;
    height: 350px;
    border-radius: 20px;
    border: 2px solid #000;
    align-self: start;
    position: relative;
    user-select: none;
    /* display: grid;
    grid-template-columns: repeat(12, 1fr); */
  }

  .platform {
    border-radius: 50%;
    display: grid;
    place-items: center;
    position: absolute;
    cursor: pointer;
  }
`;

export default App;
