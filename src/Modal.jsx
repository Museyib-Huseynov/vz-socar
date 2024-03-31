import styled from 'styled-components';
import data from './data';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isModalOpen, activeWell, closeModal }) => {
  const { well, difficulty, expectedProduction } = data.find(
    (item) => item.well === activeWell
  );
  return (
    <Wrapper $isModalOpen={isModalOpen}>
      <div className='model-container'>
        <h2>{`Well ${well}`}</h2>
        <p>{`Difficulty level: ${difficulty}`}</p>
        <p>{`Expected production: ${expectedProduction}`}</p>
        <p>Well needs to be perforated to upper horizon.</p>
        <button className='close-modal-btn' onClick={closeModal}>
          <FaTimes />
        </button>
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
  transition: all 2s linear;

  .model-container {
    background: #fff;
    width: 90vw;
    max-width: 600px;
    height: 30vh;
    border-radius: 0.25rem;
    display: grid;
    place-items: center;
    text-align: center;
    position: relative;
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
