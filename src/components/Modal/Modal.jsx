import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { OverlayCss, ModalCss, Button } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeByButton);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeByButton);
  }

  closeOnOverlay = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose(event);
      console.log('click on backdrop');
    }
  };

  closeByButton = event => {
    if (event.code === 'Escape') {
      this.props.onClose(event);
    }
  };

  render() {
    return createPortal(
      <OverlayCss onClick={this.closeOnOverlay}>
        <ModalCss>
          {this.props.children}
          <Button type="button" onClick={this.props.onClose}>
            Close
          </Button>
        </ModalCss>
      </OverlayCss>,
      modalRoot
    );
  }
}

export default Modal;
