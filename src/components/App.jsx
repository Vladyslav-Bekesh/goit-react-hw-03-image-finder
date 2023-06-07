import React, { Component } from 'react';

import Searchbar from './Searchbar';
import LoaderSpinner from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import fetchPic from '../utils/fetchPic';

export class App extends Component {
  state = {
    querry: '',
    currentPage: 1,
    data: [],
    error: '',
    status: 'idle',
  };

  perPage = 12;

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

        this.setState({ data: data, status: 'resolved' });
      } catch (error) {
        this.setState({ status: 'rejected', error: error.message });
      }
    }
  }

  handleSubmit = querry => {
    this.setState({ querry: querry });
  };

  btnLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { status, error, data, currentPage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <LoaderSpinner />}
        {status === 'rejected' && <h2>{error}</h2>}
        {status === 'resolved' && <ImageGallery images={data.hits} />}
        {this.perPage * currentPage <= data.total && (
          <Button onClick={this.btnLoadMore} text={'Load more'} />
        )}
      </>
    );
  }
}

export default App;

//! не обнова а додавання нових результатів
//*в ліст приходить дата, і коли приходить має додавтись в стейт новий масив