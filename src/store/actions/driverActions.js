import { 
    FETCH_DRIVERS,
    SELECT_DRIVER,
    REMOVE_DRIVER
  } from './types';
  
  // Fetch all available drivers
  export const fetchDrivers = () => {
    // In a real app, this would make an API call
    // For now, we'll use mock data
    return {
      type: FETCH_DRIVERS,
      payload: [
        {
          id: 1,
          firstName: 'Max',
          lastName: 'Verstappen',
          team: 'Red Bull Racing',
          points: 410,
          price: 30.5,
          form: 9.2,
          imageUrl: 'https://i.imgur.com/VdkIiG5.jpg'
        },
        {
          id: 2,
          firstName: 'Lewis',
          lastName: 'Hamilton',
          team: 'Mercedes',
          points: 274,
          price: 28.0,
          form: 8.7,
          imageUrl: 'https://i.imgur.com/xDsIFxS.jpg'
        },
        {
          id: 3,
          firstName: 'Lando',
          lastName: 'Norris',
          team: 'McLaren',
          points: 299,
          price: 25.5,
          form: 9.0,
          imageUrl: 'https://i.imgur.com/zcL16P9.jpg'
        },
        {
          id: 4,
          firstName: 'Charles',
          lastName: 'Leclerc',
          team: 'Ferrari',
          points: 280,
          price: 24.0,
          form: 8.5,
          imageUrl: 'https://i.imgur.com/L5IVQbM.jpg'
        },
        {
          id: 5,
          firstName: 'Carlos',
          lastName: 'Sainz',
          team: 'Ferrari',
          points: 240,
          price: 23.0,
          form: 8.3,
          imageUrl: 'https://i.imgur.com/7qWQKGy.jpg'
        },
        {
          id: 6,
          firstName: 'Sergio',
          lastName: 'Perez',
          team: 'Red Bull Racing',
          points: 175,
          price: 22.5,
          form: 7.2,
          imageUrl: 'https://i.imgur.com/dzfpZGY.jpg'
        },
        {
          id: 7,
          firstName: 'George',
          lastName: 'Russell',
          team: 'Mercedes',
          points: 235,
          price: 23.5,
          form: 8.0,
          imageUrl: 'https://i.imgur.com/OTnBr2g.jpg'
        },
        {
          id: 8,
          firstName: 'Oscar',
          lastName: 'Piastri',
          team: 'McLaren',
          points: 192,
          price: 19.5,
          form: 8.4,
          imageUrl: 'https://i.imgur.com/qF2SdKb.jpg'
        },
        {
          id: 9,
          firstName: 'Fernando',
          lastName: 'Alonso',
          team: 'Aston Martin',
          points: 131,
          price: 17.5,
          form: 7.5,
          imageUrl: 'https://i.imgur.com/7v5iIQQ.jpg'
        },
        {
          id: 10,
          firstName: 'Lance',
          lastName: 'Stroll',
          team: 'Aston Martin',
          points: 42,
          price: 12.0,
          form: 6.5,
          imageUrl: 'https://i.imgur.com/o5BiHLR.jpg'
        },
        {
          id: 11,
          firstName: 'Yuki',
          lastName: 'Tsunoda',
          team: 'Racing Bulls',
          points: 28,
          price: 9.5,
          form: 7.0,
          imageUrl: 'https://i.imgur.com/BQIxPeV.jpg'
        },
        {
          id: 12,
          firstName: 'Daniel',
          lastName: 'Ricciardo',
          team: 'Racing Bulls',
          points: 12,
          price: 8.5,
          form: 6.0,
          imageUrl: 'https://i.imgur.com/xRRFvYP.jpg'
        },
        {
          id: 13,
          firstName: 'Alexander',
          lastName: 'Albon',
          team: 'Williams',
          points: 18,
          price: 8.0,
          form: 7.3,
          imageUrl: 'https://i.imgur.com/YS0DtTj.jpg'
        },
        {
          id: 14,
          firstName: 'Logan',
          lastName: 'Sargeant',
          team: 'Williams',
          points: 1,
          price: 5.0,
          form: 5.0,
          imageUrl: 'https://i.imgur.com/hJ1ux8E.jpg'
        },
        {
          id: 15,
          firstName: 'Kevin',
          lastName: 'Magnussen',
          team: 'Haas',
          points: 6,
          price: 6.0,
          form: 5.8,
          imageUrl: 'https://i.imgur.com/T74f1Pn.jpg'
        },
        {
          id: 16,
          firstName: 'Nico',
          lastName: 'Hulkenberg',
          team: 'Haas',
          points: 9,
          price: 6.5,
          form: 6.2,
          imageUrl: 'https://i.imgur.com/4EWnY8A.jpg'
        },
        {
          id: 17,
          firstName: 'Esteban',
          lastName: 'Ocon',
          team: 'Alpine',
          points: 10,
          price: 7.0,
          form: 6.0,
          imageUrl: 'https://i.imgur.com/TOqVfpJ.jpg'
        },
        {
          id: 18,
          firstName: 'Pierre',
          lastName: 'Gasly',
          team: 'Alpine',
          points: 12,
          price: 7.5,
          form: 6.3,
          imageUrl: 'https://i.imgur.com/x2cC9fF.jpg'
        },
        {
          id: 19,
          firstName: 'Zhou',
          lastName: 'Guanyu',
          team: 'Kick Sauber',
          points: 0,
          price: 5.5,
          form: 5.5,
          imageUrl: 'https://i.imgur.com/d3h7pZB.jpg'
        },
        {
          id: 20,
          firstName: 'Valtteri',
          lastName: 'Bottas',
          team: 'Kick Sauber',
          points: 2,
          price: 7.0,
          form: 5.7,
          imageUrl: 'https://i.imgur.com/gDU6EqF.jpg'
        }
      ]
    };
  };
  
  // Add a driver to the user's team
  export const selectDriver = (driver) => {
    return {
      type: SELECT_DRIVER,
      payload: driver
    };
  };
  
  // Remove a driver from the user's team
  export const removeDriver = (driver) => {
    return {
      type: REMOVE_DRIVER,
      payload: driver
    };
  };