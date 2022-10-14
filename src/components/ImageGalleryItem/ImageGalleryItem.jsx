import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { webformatURL, tegs, largeImageURL } = this.props;
    return (
      <>
        <li className="ImageGalleryItem" onClick={this.toggleModal}>
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt={tegs}
          />
        </li>
        {this.state.isOpen && (
          <Modal url={largeImageURL} alt={tegs} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tegs: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
