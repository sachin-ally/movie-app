import React, { Component, useState } from 'react';
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      movies: [],
      searchInput: 'war'
    }
  }

  callApiData() {
    fetch(`https://www.omdbapi.com/?apikey=45f0782a&s=${this.state.searchInput}`)
    .then(data => data.json())
    .then(data => {
      this.setState({movies: data.Search}, () => console.log(this.state.movies))
    })
  }

  componentDidMount() {
    this.callApiData()
  }

  handleChange = (e) => {
    this.setState({searchInput: e.target.value}, () => {
      this.callApiData()
    })
  }

  render() { 
    return ( 
      <>
       <Search handleChange={this.handleChange}/>
       <CardsList movies={this.state.movies} />
      </>
    );
  }
}

const Search = ({handleChange}) => {
  const inputStyle = {
    display: "block",
    fontSize: "30px",
    margin: "20px auto",
    marginBottom: "50px"
  }

  return (  
    <input style={inputStyle} onChange={(e) => handleChange(e)} type="text" placeholder="Search a movie..."/>
  );
}

const CardsList = ({movies}) => {
  const listContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '90%',
    margin: "0 auto",
    justifyContent: 'center'
  }
  return (  
    <div style={listContainer}> 
      {Array.isArray(movies) && movies.length && movies.map((movie, index) => <Card key={index} idx={index} movie={movie}/>)}
    </div>
  );
}

const Card = ({movie, handleHover, idx}) => {

  const [hover, setHover] = useState(false)

  const cardStyles = {
    display: "inline-block", 
    width: "150px", 
    height: "320px", 
    padding: "0px", 
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', 
    margin: '0 20px', 
    marginBottom: '20px'
  }

  return (
    <div style={cardStyles} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}}>
      <h6 style={{textAlign: 'center', padding: '5px', margin: 0, marginTop: '10px'}}>{movie.Title}</h6>
      <div>
        {hover && <h6 style={{position: 'absolute', color: 'red', fontSize: "14px", background: 'white'}}>Imdb_id: {movie.imdbID}</h6>}
        <img src={movie.Poster} alt='.' width="100%"/>
      </div>
      <p style={{textAlign: 'center', margin: 0, marginTop: '10px'}}>{movie.Year}</p>
    </div>
  )
}

export default Movies;