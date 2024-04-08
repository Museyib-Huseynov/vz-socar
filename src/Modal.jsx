import styled from 'styled-components';
import data from './data';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isModalOpen, activeWell, closeModal, platform }) => {
  let well,
    difficulty,
    potentialOilProduction,
    intervention,
    type,
    status,
    currentOilProduction,
    currentWaterProduction,
    currentGasProduction;
  if (activeWell) {
    ({
      well,
      difficulty,
      potentialOilProduction,
      intervention,
      type,
      status,
      currentOilProduction,
      currentWaterProduction,
      currentGasProduction,
    } = data[platform].find((item) => item.well === activeWell));
  }

  return (
    <Wrapper $isModalOpen={isModalOpen}>
      <div className='model-container'>
        {!status ? (
          <>
            <p className='header'>
              <b>{`Well ${well || ''}`}</b> | Abandoned well
            </p>
            <button className='close-modal-btn' onClick={closeModal}>
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <p className='header'>
              <b>{`Well ${well || ''}`}</b> | Well type:{' '}
              {type === 'prod' ? 'Producer' : 'Injector'}
            </p>
            <p className='plannedIntervention'>
              <b>Planned intervention: </b>
              {intervention || 'N/A'}
            </p>
            <p className='difficulty'>
              <b>Difficulty level: </b>
              {difficulty || 'N/A'}
            </p>
            <p className='expectedProduction'>
              <b>Expected additional production: </b>
              {potentialOilProduction || 'N/A'}
            </p>
            <table>
              <tr>
                <td>Current Oil Production (ton)</td>
                <td>{currentOilProduction || 'N/A'}</td>
              </tr>
              <tr>
                <td>Current Water Production (ton)</td>
                <td>{currentWaterProduction || 'N/A'}</td>
              </tr>
              <tr>
                <td>Current Gas Production (m3)</td>
                <td>{currentGasProduction || 'N/A'}</td>
              </tr>
            </table>
            <button className='close-modal-btn' onClick={closeModal}>
              <FaTimes />
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  z-index: ${(props) => (props.$isModalOpen ? 10 : -1)};
  visibility: ${(props) => (props.$isModalOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.$isModalOpen ? 1 : 0)};
  transition: all 0.3s linear;

  .model-container {
    background: #fff;
    width: 90vw;
    max-width: 600px;
    height: 30vh;
    border-radius: 0.25rem;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 0.5fr 0.5fr 0.5fr 2fr;
    text-align: center;
    position: relative;
  }

  .header {
    grid-area: 1 / 1 / 2 / 4;
    font-size: 20px;
  }

  .plannedIntervention {
    grid-area: 2 / 1 / 3 / 4; 
  }

  .difficulty {
    grid-area: 3 / 1 / 4 / 4;
  }

  .expectedProduction {
    grid-area: 4 / 1 / 5 / 4;
  }

  table, td, th {
    border: 2px solid #000;
  }

  table {
  grid-area: 5 / 1 / 6 / 4;
  width: 50%;
  border-collapse: collapse;
}

  .close-modal-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    color: var(--red-dark);
  }
`;

export default Modal;
