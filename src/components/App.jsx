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
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      const API_KEY = '29336410-bf8336e60ac171a1237415fd3';
      const OPTIONS =
        'image_type=photo&orientation=horizontal&safesearch=true&lang=en&lang=uk&per_page=12';
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.state.searchQuery}&${OPTIONS}&page=${this.state.page}`;

      fetch(url)
        .then(r => {
          if (r.ok) {
            return r.json();
          }
          Promise.reject(
            new Error(
              `Sorry, we did not find any results for "${this.state.searchQuery}"`
            )
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
    return (
      <>
        <Searchbar onSubmit={this.fetchImages} />
        {this.state.status === 'rejected' && (
          <SearchError
            message={`Sorry, we did not find any results for "${this.state.searchQuery}"`}
          />
        )}
        {this.state.images.length > 0 && (
          <ImageGallery
            results={this.state.images}
            imageClick={this.imageClick}
          />
        )}
        {this.state.images.length > 0 &&
          this.state.status === 'resolved' &&
          this.state.page !== this.state.totalPages && (
            <Button onClick={this.loadMore} />
          )}
        {this.state.status === 'pending' && (
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
        {this.state.isOpen && (
          <Modal
            id={this.state.modalId}
            images={this.state.images}
            onClose={this.toggleModal}
          />
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
