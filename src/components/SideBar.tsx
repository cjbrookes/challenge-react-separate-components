import { useEffect, useState } from 'react';

import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface SidebarProps {
  setSelectedGenreId: (id:number) => void 
  selectedGenreId: number
}

export function SideBar({selectedGenreId, setSelectedGenreId}: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) { 
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
       </nav>
      </div>
  )
}