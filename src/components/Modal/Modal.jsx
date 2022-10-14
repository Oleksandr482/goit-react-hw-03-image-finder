import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount = () => {
    document.addEventListener('keydown', this.onKeydown);
  };
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onKeydown);
  };
  onKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <div className="Overlay" onClick={this.onClose}>
        <div className="Modal">
          <img src={url} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
