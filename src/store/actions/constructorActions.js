// src/store/actions/constructorActions.js
import { 
    FETCH_CONSTRUCTORS,
    SELECT_CONSTRUCTOR,
    REMOVE_CONSTRUCTOR
  } from './types';
  
  // Fetch all available constructors
  export const fetchConstructors = () => {
    // Mock data for constructors with realistic values
    return {
      type: FETCH_CONSTRUCTORS,
      payload: [
        {
          id: 1,
          name: 'Red Bull Racing',
          points: 620,
          price: 32.5,
          form: 9.5,
          drivers: ['Max Verstappen', 'Sergio Perez'],
          logoUrl: 'https://i.imgur.com/t6kIYsA.png',
          color: '#0600EF'
        },
        {
          id: 2,
          name: 'Ferrari',
          points: 520,
          price: 28.0,
          form: 8.9,
          drivers: ['Charles Leclerc', 'Carlos Sainz'],
          logoUrl: 'https://i.imgur.com/qg5zE7Y.png',
          color: '#DC0000'
        },
        {
          id: 3,
          name: 'Mercedes',
          points: 480,
          price: 26.5,
          form: 8.4,
          drivers: ['Lewis Hamilton', 'George Russell'],
          logoUrl: 'https://i.imgur.com/vNGF1ZN.png',
          color: '#00D2BE'
        },
        {
          id: 4,
          name: 'McLaren',
          points: 450,
          price: 24.0,
          form: 9.2,
          drivers: ['Lando Norris', 'Oscar Piastri'],
          logoUrl: 'https://i.imgur.com/Z8iZ73r.png',
          color: '#FF8700'
        },
        {
          id: 5,
          name: 'Aston Martin',
          points: 190,
          price: 16.5,
          form: 7.5,
          drivers: ['Fernando Alonso', 'Lance Stroll'],
          logoUrl: 'https://i.imgur.com/EKxYa3N.png',
          color: '#006F62'
        },
        {
          id: 6,
          name: 'Alpine',
          points: 22,
          price: 9.5,
          form: 6.0,
          drivers: ['Pierre Gasly', 'Esteban Ocon'],
          logoUrl: 'https://i.imgur.com/Eb1OUPn.png',
          color: '#0090FF'
        },
        {
          id: 7,
          name: 'Racing Bulls',
          points: 32,
          price: 8.0,
          form: 6.8,
          drivers: ['Daniel Ricciardo', 'Yuki Tsunoda'],
          logoUrl: 'https://i.imgur.com/dHYbEBR.png',
          color: '#1E41FF'
        },
        {
          id: 8,
          name: 'Haas F1 Team',
          points: 15,
          price: 7.0,
          form: 6.2,
          drivers: ['Kevin Magnussen', 'Nico Hulkenberg'],
          logoUrl: 'https://i.imgur.com/fH6EEYp.png',
          color: '#FFFFFF'
        },
        {
          id: 9,
          name: 'Williams',
          points: 19,
          price: 6.5,
          form: 6.5,
          drivers: ['Alexander Albon', 'Logan Sargeant'],
          logoUrl: 'https://i.imgur.com/3bZcFQi.png',
          color: '#005AFF'
        },
        {
          id: 10,
          name: 'Kick Sauber',
          points: 2,
          price: 5.5,
          form: 5.5,
          drivers: ['Valtteri Bottas', 'Zhou Guanyu'],
          logoUrl: 'https://i.imgur.com/b39UIDl.png',
          color: '#900000'
        }
      ]
    };
  };
  
  // Add a constructor to the user's team
  export const selectConstructor = (constructor) => {
    return {
      type: SELECT_CONSTRUCTOR,
      payload: constructor
    };
  };
  
  // Remove a constructor from the user's team
  export const removeConstructor = () => {
    return {
      type: REMOVE_CONSTRUCTOR
    };
  };