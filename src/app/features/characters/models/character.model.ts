export interface Character {
  id: number;
  name: string;
  status: 'Dead' | 'Alive' | 'unknown';
  species: string;
  type: string;
  gender: 'unknown' | 'Female' | 'Male' | 'Genderless';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
}
