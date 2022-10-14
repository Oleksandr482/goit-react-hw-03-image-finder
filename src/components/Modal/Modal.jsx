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
    const { images, id } = this.props;
    const image = images.find(image => id === image.id);
    return (
      <div className="Overlay" onClick={this.onClose}>
        <div className="Modal">
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  id: PropTypes.number.isRequired,
};
