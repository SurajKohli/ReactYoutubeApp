import React, { Component } from 'react';

class SearchBar extends Component {
  // each class based component has a state object
  // whenever state changes, render function re-runs

  constructor(props) {
      // super is called to override the function "constructor" which is present in inbuilt Component
      super(props);

      // this is how we define state in a class component
      // *Remember* that functional component does not have state!
      this.state = { term: '' };
  }

  // this is how we define methods on a class
  render() {
      return (
          <div className="search-bar">
              <input onChange={(event) => { this.onInputChange(event.target.value)}}/>
          </div>
      );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;