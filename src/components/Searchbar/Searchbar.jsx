import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    searchField: '',
  };

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.searchField);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ searchField: '' });
  };

  render() {
    const { searchField } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="on"
            autoFocus
            placeholder="Search images and photos"
            value={searchField}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
