import _ from 'lodash';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBiE4L4fbaz29sG-716aURv5_-pVoaRXew';


// Create a new Component. It should produce some HTML
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
       videos: [],
       selectedVideo: null
      };

    this.videoSearch('tasty');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 300);
    return (
      <div>
        <SearchBar 
          onSearchTermChange = {videoSearch}
        />
        {/* We need to pass data from parent component to child component, in this case videos list 
            If we see below component, we see a videos property (in react language a prop)*/}
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect = { (selectedVideo) => this.setState({selectedVideo}) }
          videos={this.state.videos}/>
      </div>
    );
  }
}
// Now this newly produced Component's HTML should be put on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));