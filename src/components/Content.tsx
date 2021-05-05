import { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';

import '../styles/content.scss';
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  Category: string;
  GenreId: number;
}

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);  
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.GenreId}`).then(response => {
      setMovies(response.data);
    });    
  }, [props.GenreId]);  

  console.log('Category', props.Category);


  return (
      <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.Category}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>    
  )
}