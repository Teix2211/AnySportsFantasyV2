// src/store/actions/raceActions.js
import { 
    FETCH_RACES, 
    SET_SELECTED_RACE, 
    FETCH_RACE_RESULTS,
    FETCH_DRIVER_STANDINGS,
    FETCH_CONSTRUCTOR_STANDINGS,
    SET_CURRENT_SEASON
  } from './types';
  
  // Mock data - in a real app, this would come from an API
  const mockRaces2024 = [
    {
      id: '2024-01',
      name: 'Bahrain Grand Prix',
      circuit: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      date: '2024-03-02T15:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2024-03-01T11:30:00Z' },
        { type: 'Practice 2', date: '2024-03-01T15:00:00Z' },
        { type: 'Practice 3', date: '2024-03-02T11:30:00Z' },
        { type: 'Qualifying', date: '2024-03-02T15:00:00Z' },
        { type: 'Race', date: '2024-03-03T15:00:00Z' }
      ],
      circuitInfo: {
        length: 5.412,
        laps: 57,
        lapRecord: '1:31.447 - Pedro de la Rosa (2005)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Bahrain+Circuit'
      }
    },
    {
      id: '2024-02',
      name: 'Saudi Arabian Grand Prix',
      circuit: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      date: '2024-03-09T17:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2024-03-08T13:30:00Z' },
        { type: 'Practice 2', date: '2024-03-08T17:00:00Z' },
        { type: 'Practice 3', date: '2024-03-09T13:30:00Z' },
        { type: 'Qualifying', date: '2024-03-09T17:00:00Z' },
        { type: 'Race', date: '2024-03-10T17:00:00Z' }
      ],
      circuitInfo: {
        length: 6.174,
        laps: 50,
        lapRecord: '1:30.734 - Lewis Hamilton (2021)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Jeddah+Circuit'
      }
    },
    {
      id: '2024-03',
      name: 'Australian Grand Prix',
      circuit: 'Albert Park Circuit',
      location: 'Melbourne, Australia',
      date: '2024-03-24T06:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2024-03-22T01:30:00Z' },
        { type: 'Practice 2', date: '2024-03-22T05:00:00Z' },
        { type: 'Practice 3', date: '2024-03-23T01:30:00Z' },
        { type: 'Qualifying', date: '2024-03-23T05:00:00Z' },
        { type: 'Race', date: '2024-03-24T06:00:00Z' }
      ],
      circuitInfo: {
        length: 5.278,
        laps: 58,
        lapRecord: '1:20.235 - Charles Leclerc (2022)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Albert+Park+Circuit'
      }
    }
  ];
  
  const mockRaces2023 = [
    {
      id: '2023-01',
      name: 'Bahrain Grand Prix',
      circuit: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      date: '2023-03-05T15:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2023-03-03T11:30:00Z' },
        { type: 'Practice 2', date: '2023-03-03T15:00:00Z' },
        { type: 'Practice 3', date: '2023-03-04T11:30:00Z' },
        { type: 'Qualifying', date: '2023-03-04T15:00:00Z' },
        { type: 'Race', date: '2023-03-05T15:00:00Z' }
      ],
      circuitInfo: {
        length: 5.412,
        laps: 57,
        lapRecord: '1:31.447 - Pedro de la Rosa (2005)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Bahrain+Circuit'
      }
    },
    // More 2023 races would be here
  ];
  
  const mockRaceResults = {
    '2024-01': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', time: '1:33:56.736', points: 25 },
      { position: 2, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', time: '+20.927s', points: 18 },
      { position: 3, driver: { firstName: 'Carlos', lastName: 'Sainz' }, team: 'Ferrari', time: '+25.112s', points: 15 },
      { position: 4, driver: { firstName: 'Charles', lastName: 'Leclerc' }, team: 'Ferrari', time: '+35.627s', points: 12 },
      { position: 5, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', time: '+44.460s', points: 10 },
      { position: 6, driver: { firstName: 'Lando', lastName: 'Norris' }, team: 'McLaren', time: '+46.249s', points: 8 },
      { position: 7, driver: { firstName: 'Oscar', lastName: 'Piastri' }, team: 'McLaren', time: '+50.753s', points: 6 },
      { position: 8, driver: { firstName: 'George', lastName: 'Russell' }, team: 'Mercedes', time: '+51.202s', points: 4 },
      { position: 9, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', time: '+69.881s', points: 2 },
      { position: 10, driver: { firstName: 'Lance', lastName: 'Stroll' }, team: 'Aston Martin', time: '+73.226s', points: 1 }
    ],
    '2023-01': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', time: '1:33:56.736', points: 25 },
      { position: 2, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', time: '+11.987s', points: 18 },
      { position: 3, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', time: '+38.637s', points: 15 },
      // More results would be here
    ]
  };
  
  const mockDriverStandings = {
    '2024': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', points: 51 },
      { position: 2, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', points: 36 },
      { position: 3, driver: { firstName: 'Carlos', lastName: 'Sainz' }, team: 'Ferrari', points: 28 },
      { position: 4, driver: { firstName: 'Charles', lastName: 'Leclerc' }, team: 'Ferrari', points: 20 },
      { position: 5, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', points: 16 },
      { position: 6, driver: { firstName: 'Lando', lastName: 'Norris' }, team: 'McLaren', points: 12 },
      { position: 7, driver: { firstName: 'Oscar', lastName: 'Piastri' }, team: 'McLaren', points: 8 },
      { position: 8, driver: { firstName: 'George', lastName: 'Russell' }, team: 'Mercedes', points: 6 },
      { position: 9, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', points: 5 },
      { position: 10, driver: { firstName: 'Lance', lastName: 'Stroll' }, team: 'Aston Martin', points: 1 }
    ],
    '2023': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', points: 575 },
      { position: 2, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', points: 285 },
      { position: 3, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', points: 234 },
      // More standings would be here
    ]
  };
  
  const mockConstructorStandings = {
    '2024': [
      { position: 1, team: 'Red Bull Racing', points: 87 },
      { position: 2, team: 'Ferrari', points: 48 },
      { position: 3, team: 'Mercedes', points: 22 },
      { position: 4, team: 'McLaren', points: 20 },
      { position: 5, team: 'Aston Martin', points: 6 },
      { position: 6, team: 'AlphaTauri', points: 5 },
      { position: 7, team: 'Alfa Romeo', points: 0 },
      { position: 8, team: 'Alpine', points: 0 },
      { position: 9, team: 'Williams', points: 0 },
      { position: 10, team: 'Haas F1 Team', points: 0 }
    ],
    '2023': [
      { position: 1, team: 'Red Bull Racing', points: 860 },
      { position: 2, team: 'Mercedes', points: 409 },
      { position: 3, team: 'Ferrari', points: 406 },
      // More standings would be here
    ]
  };
  
  // Action creators
  export const fetchRaces = (season) => {
    // In a real app, this would be an API call
    const races = season === '2024' ? mockRaces2024 : mockRaces2023;
    return {
      type: FETCH_RACES,
      payload: races
    };
  };
  
  export const setSelectedRace = (raceId) => {
    return {
      type: SET_SELECTED_RACE,
      payload: raceId
    };
  };
  
  export const fetchRaceResults = (raceId) => {
    // In a real app, this would be an API call
    return {
      type: FETCH_RACE_RESULTS,
      payload: mockRaceResults[raceId] || []
    };
  };
  
  export const fetchDriverStandings = (season) => {
    // In a real app, this would be an API call
    return {
      type: FETCH_DRIVER_STANDINGS,
      payload: mockDriverStandings[season] || []
    };
  };
  
  export const fetchConstructorStandings = (season) => {
    // In a real app, this would be an API call
    return {
      type: FETCH_CONSTRUCTOR_STANDINGS,
      payload: mockConstructorStandings[season] || []
    };
  };
  
  export const setCurrentSeason = (season) => {
    return {
      type: SET_CURRENT_SEASON,
      payload: season
    };
  };