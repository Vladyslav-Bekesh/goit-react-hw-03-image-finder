import React, { Component } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
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

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { status, error, data, currentPage, total } = this.state;
    return (
      <>
        {/* toast.error */}
        {/* <ToastContainer /> */}
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <LoaderSpinner />}
        {status === 'rejected' && <h2>{console.log(error, 'IN JSX')}</h2>}
        {status === 'resolved' && <ImageGallery images={data} />}
        {this.perPage * currentPage <= total && (
          <Button onClick={this.loadMore} text={'Load more'} />
        )}
      </>
    );
  }
}

export default App;
