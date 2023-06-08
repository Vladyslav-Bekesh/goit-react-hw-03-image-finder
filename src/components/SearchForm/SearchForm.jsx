import React, { Component } from 'react';
import { toast } from 'react-toastify';

class SearchForm extends Component {
  state = {
    searchField: '',
  };

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.searchField !== '') {
      this.props.onSubmit(this.makeCorrectQuerry(this.state.searchField));
      this.resetForm();
      return;
    }

    toast.warning('Enter name of images or photos');
  };

  resetForm = () => {
    this.setState({ searchField: '' });
  };

  makeCorrectQuerry(querry) {
    const cos = querry.trim().split(' ').join('+');
    return cos;
  }

  render() {
    const { searchField } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search images and photos"
          value={searchField}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchForm;
