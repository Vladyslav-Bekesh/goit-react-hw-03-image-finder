import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import LoaderSpinner from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import fetchPic from '../utils/fetchPic';

export class App extends Component {
  perPage = 12;

  state = {
    querry: '',
    currentPage: 1,
    data: [],
    total: 0,
    error: '',
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { perPage } = this;
    const { querry, currentPage, status } = this.state;
    const { querry: prevQuerry, currentPage: prevPage } = prevState;

    if (querry !== prevQuerry || currentPage !== prevPage) {
      try {
        this.setState({ status: 'pending' });

        const data = await fetchPic(querry, currentPage, perPage);
        if (data.hits.length === 0) {
          throw new Error('We cannot find this');
        }

        this.setState(prevState => ({
          data: [...prevState.data, ...data.hits],
          total: data.total,
          status: 'resolved',
        }));
      } catch (error) {
        this.setState({ status: 'rejected', error: error.message });
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

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { status, error, data, currentPage, total } = this.state;
    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <LoaderSpinner />}
        {status === 'rejected' && toast.error(error)}
        {status === 'resolved' && <ImageGallery images={data} />}
        {this.perPage * currentPage <= total && (
          <Button onClick={this.loadMore} text={'Load more'} />
        )}
      </>
    );
  }
}

export default App;
