import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { SearchError } from './SearchError/SearchError';
import { fetchArticles } from 'js/fetchArticles';

export class App extends Component {
  state = {
    page: 1,
    totalPages: 1,
    images: [],
    searchQuery: '',
    status: 'idle',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });

      fetchArticles(searchQuery, page)
        .then(r => {
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
            status: 'resolved',
            totalPages: Math.ceil(r.totalHits / 12),
          }));
        })
        .catch(e => {
          this.setState({ status: 'rejected' });
        });
    }
  };

  fetchImages = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    const { status, images, searchQuery, page, totalPages } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.fetchImages} />
        {status === 'rejected' && (
          <SearchError
            message={`Sorry, we did not find any results for "${searchQuery}"`}
          />
        )}
        {images.length > 0 && <ImageGallery results={images} />}
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
