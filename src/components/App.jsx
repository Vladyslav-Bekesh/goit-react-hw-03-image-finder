import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import LoaderSpinner from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import SearchForm from './SearchForm';

import fetchPic from '../utils/fetchPic';

import { ImgCss } from './Modal/Modal.styled';

export class App extends Component {
  perPage = 12;

  state = {
    querry: '',
    currentPage: 1,
    data: [],
    total: 0,
    error: '',
    status: 'idle',
    showModal: false,
    bigImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { perPage } = this;
    const { querry, currentPage } = this.state;
    const { querry: prevQuerry, currentPage: prevPage } = prevState;

    if (querry !== prevQuerry || currentPage !== prevPage) {
      try {
        this.setState({ status: 'pending' });
        console.log('fecth');

        const data = await fetchPic(querry, currentPage, perPage);

        console.log('fecth fecthed');
        if (data.hits.length === 0) {
          console.log('fecth rejected');
          throw new Error('We cannot find this');
        }

        this.setState(prevState => ({
          data: [...prevState.data, ...data.hits],
          total: data.total,
          status: 'resolved',
        }));
      } catch ({ message }) {
        console.log(message);
        this.setState({ status: 'rejected', error: message });
      }
    }
  }

  handleSubmit = querry => {
    this.setState({
      querry: querry,
      currentPage: 1,
      data: [],
      total: 0,
      error: '',
      status: 'idle',
    });
  };

  togleBigImg = event => {
    event.preventDefault();
    const { target } = event;

    this.togleModal(event);

    this.setState({
      bigImage: target.getAttribute('data-large-image-url'),
    });
  };

  togleModal = event => {
    event.preventDefault();

    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { status, error, data, currentPage, total, showModal, bigImage } =
      this.state;
    
    return (
      <>
        <ToastContainer />
        <Searchbar>
          <SearchForm onSubmit={this.handleSubmit} />
        </Searchbar>

        {status === 'pending' && <LoaderSpinner />}
        {status === 'rejected' && toast.error(error)}

        {status === 'resolved' && (
          <ImageGallery images={data} onClick={this.togleBigImg} />
        )}

        {this.perPage * currentPage <= total && (
          <Button onClick={this.loadMore} text={'Load more'} />
        )}

        {showModal && (
          <Modal onClose={this.togleModal}>
            <ImgCss src={bigImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
