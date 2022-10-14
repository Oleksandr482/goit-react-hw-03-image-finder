import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { SearchError } from './SearchError/SearchError';

export class App extends Component {
  state = {
    page: 1,
    totalPages: 1,
    images: [],
    searchQuery: '',
    isOpen: false,
    modalId: null,
    status: 'idle',
  };

  fetchImages = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };
  componentDidUpdate = (prevProps, prevState) => {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      const API_KEY = '29336410-bf8336e60ac171a1237415fd3';
      const OPTIONS =
        'image_type=photo&orientation=horizontal&safesearch=true&lang=en&lang=uk&per_page=12';
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&${OPTIONS}&page=${page}`;

      fetch(url)
        .then(r => {
          if (r.ok) {
            return r.json();
          }
          Promise.reject(
            new Error(`Sorry, we did not find any results for "${searchQuery}"`)
          );
        })
        .then(r => {
          if (r.totalHits === 0) {
            return Promise.reject(new Error());
          }
          const images = r.hits.map(image => {
            return {
              id: image.id,
              webformatURL: image.webformatURL,
              tags: image.tags,
              largeImageURL: image.largeImageURL,
            };
          });
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
          this.setState({
            status: 'resolved',
            totalPages: Math.ceil(r.totalHits / 12),
          });
        })
        .catch(e => {
          this.setState({ status: 'rejected' });
          // console.log(this.state.error);
        });
    }
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  imageClick = e => {
    this.toggleModal();
    this.setState({
      modalId: Number(e.currentTarget.id),
    });
  };

  render() {
    const { status, images, searchQuery, page, totalPages, isOpen, modalId } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.fetchImages} />
        {status === 'rejected' && (
          <SearchError
            message={`Sorry, we did not find any results for "${searchQuery}"`}
          />
        )}
        {images.length > 0 && (
          <ImageGallery results={images} imageClick={this.imageClick} />
        )}
        {images.length > 0 && status === 'resolved' && page !== totalPages && (
          <Button onClick={this.loadMore} />
        )}
        {status === 'pending' && (
          <ThreeDots
            height="80"
            width="80"
            radius="12"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperClass="Loader"
            visible={true}
          />
        )}
        {isOpen && (
          <Modal id={modalId} images={images} onClose={this.toggleModal} />
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    );
  }
}
