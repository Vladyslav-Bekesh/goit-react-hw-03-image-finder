import React from 'react';

function Modal(lagreImg) {
  return (
    <div class="overlay">
      <div class="modal">
        <img src={lagreImg} alt="" />
      </div>
    </div>
  );
}

export default Modal;
