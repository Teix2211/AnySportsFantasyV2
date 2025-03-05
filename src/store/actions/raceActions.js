// src/store/actions/raceActions.js
import { 
    FETCH_RACES,
    FETCH_RACES_SUCCESS, 
    FETCH_RACES_FAILURE,
    SET_SELECTED_RACE, 
    FETCH_RACE_RESULTS,
    FETCH_RACE_RESULTS_SUCCESS,
    FETCH_RACE_RESULTS_FAILURE,
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
    },
    {
      id: '2024-04',
      name: 'Japanese Grand Prix',
      circuit: 'Suzuka Circuit',
      location: 'Suzuka, Japan',
      date: '2024-04-14T05:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2024-04-12T02:30:00Z' },
        { type: 'Practice 2', date: '2024-04-12T06:00:00Z' },
        { type: 'Practice 3', date: '2024-04-13T02:30:00Z' },
        { type: 'Qualifying', date: '2024-04-13T06:00:00Z' },
        { type: 'Race', date: '2024-04-14T05:00:00Z' }
      ],
      circuitInfo: {
        length: 5.807,
        laps: 53,
        lapRecord: '1:30.983 - Lewis Hamilton (2019)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Suzuka+Circuit'
      }
    },
    {
      id: '2024-05',
      name: 'Chinese Grand Prix',
      circuit: 'Shanghai International Circuit',
      location: 'Shanghai, China',
      date: '2024-04-21T07:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2024-04-19T03:30:00Z' },
        { type: 'Practice 2', date: '2024-04-19T07:00:00Z' },
        { type: 'Practice 3', date: '2024-04-20T03:30:00Z' },
        { type: 'Qualifying', date: '2024-04-20T07:00:00Z' },
        { type: 'Race', date: '2024-04-21T07:00:00Z' }
      ],
      circuitInfo: {
        length: 5.451,
        laps: 56,
        lapRecord: '1:32.238 - Michael Schumacher (2004)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Shanghai+Circuit'
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
    {
      id: '2023-02',
      name: 'Saudi Arabian Grand Prix',
      circuit: 'Jeddah Corniche Circuit',
      location: 'Jeddah, Saudi Arabia',
      date: '2023-03-19T17:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2023-03-17T13:30:00Z' },
        { type: 'Practice 2', date: '2023-03-17T17:00:00Z' },
        { type: 'Practice 3', date: '2023-03-18T13:30:00Z' },
        { type: 'Qualifying', date: '2023-03-18T17:00:00Z' },
        { type: 'Race', date: '2023-03-19T17:00:00Z' }
      ],
      circuitInfo: {
        length: 6.174,
        laps: 50,
        lapRecord: '1:30.734 - Lewis Hamilton (2021)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Jeddah+Circuit'
      }
    },
    {
      id: '2023-03',
      name: 'Australian Grand Prix',
      circuit: 'Albert Park Circuit',
      location: 'Melbourne, Australia',
      date: '2023-04-02T05:00:00Z',
      sessions: [
        { type: 'Practice 1', date: '2023-03-31T01:30:00Z' },
        { type: 'Practice 2', date: '2023-03-31T05:00:00Z' },
        { type: 'Practice 3', date: '2023-04-01T01:30:00Z' },
        { type: 'Qualifying', date: '2023-04-01T05:00:00Z' },
        { type: 'Race', date: '2023-04-02T05:00:00Z' }
      ],
      circuitInfo: {
        length: 5.278,
        laps: 58,
        lapRecord: '1:20.235 - Charles Leclerc (2022)',
        mapUrl: 'https://via.placeholder.com/400x200?text=Albert+Park+Circuit'
      }
    }
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
    '2024-02': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', time: '1:21:14.533', points: 25 },
      { position: 2, driver: { firstName: 'Charles', lastName: 'Leclerc' }, team: 'Ferrari', time: '+13.643s', points: 18 },
      { position: 3, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', time: '+18.639s', points: 15 },
      { position: 4, driver: { firstName: 'Carlos', lastName: 'Sainz' }, team: 'Ferrari', time: '+35.784s', points: 12 },
      { position: 5, driver: { firstName: 'Lando', lastName: 'Norris' }, team: 'McLaren', time: '+37.122s', points: 10 },
      { position: 6, driver: { firstName: 'Oscar', lastName: 'Piastri' }, team: 'McLaren', time: '+39.494s', points: 8 },
      { position: 7, driver: { firstName: 'George', lastName: 'Russell' }, team: 'Mercedes', time: '+47.773s', points: 6 },
      { position: 8, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', time: '+57.162s', points: 4 },
      { position: 9, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', time: '+70.234s', points: 2 },
      { position: 10, driver: { firstName: 'Yuki', lastName: 'Tsunoda' }, team: 'Racing Bulls', time: '+89.211s', points: 1 }
    ],
    '2023-01': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', time: '1:33:56.736', points: 25 },
      { position: 2, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', time: '+11.987s', points: 18 },
      { position: 3, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', time: '+38.637s', points: 15 },
      { position: 4, driver: { firstName: 'Carlos', lastName: 'Sainz' }, team: 'Ferrari', time: '+48.052s', points: 12 },
      { position: 5, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', time: '+50.977s', points: 10 },
      { position: 6, driver: { firstName: 'Lance', lastName: 'Stroll' }, team: 'Aston Martin', time: '+54.502s', points: 8 },
      { position: 7, driver: { firstName: 'George', lastName: 'Russell' }, team: 'Mercedes', time: '+55.873s', points: 6 },
      { position: 8, driver: { firstName: 'Valtteri', lastName: 'Bottas' }, team: 'Alfa Romeo', time: '+72.647s', points: 4 },
      { position: 9, driver: { firstName: 'Pierre', lastName: 'Gasly' }, team: 'Alpine', time: '+73.753s', points: 2 },
      { position: 10, driver: { firstName: 'Alex', lastName: 'Albon' }, team: 'Williams', time: '+89.774s', points: 1 }
    ],
    '2023-02': [
      { position: 1, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', time: '1:21:14.894', points: 25 },
      { position: 2, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', time: '+5.355s', points: 18 },
      { position: 3, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', time: '+20.728s', points: 15 },
      { position: 4, driver: { firstName: 'George', lastName: 'Russell' }, team: 'Mercedes', time: '+25.866s', points: 12 },
      { position: 5, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', time: '+31.065s', points: 10 },
      { position: 6, driver: { firstName: 'Carlos', lastName: 'Sainz' }, team: 'Ferrari', time: '+35.876s', points: 8 },
      { position: 7, driver: { firstName: 'Charles', lastName: 'Leclerc' }, team: 'Ferrari', time: '+43.162s', points: 6 },
      { position: 8, driver: { firstName: 'Esteban', lastName: 'Ocon' }, team: 'Alpine', time: '+52.832s', points: 4 },
      { position: 9, driver: { firstName: 'Pierre', lastName: 'Gasly' }, team: 'Alpine', time: '+54.747s', points: 2 },
      { position: 10, driver: { firstName: 'Kevin', lastName: 'Magnussen' }, team: 'Haas', time: '+64.826s', points: 1 }
    ],
    '2023-03': [
      { position: 1, driver: { firstName: 'Max', lastName: 'Verstappen' }, team: 'Red Bull Racing', time: '1:27:57.940', points: 25 },
      { position: 2, driver: { firstName: 'Lewis', lastName: 'Hamilton' }, team: 'Mercedes', time: '+19.617s', points: 18 },
      { position: 3, driver: { firstName: 'Fernando', lastName: 'Alonso' }, team: 'Aston Martin', time: '+23.552s', points: 15 },
      { position: 4, driver: { firstName: 'Lance', lastName: 'Stroll' }, team: 'Aston Martin', time: '+33.273s', points: 12 },
      { position: 5, driver: { firstName: 'Sergio', lastName: 'Perez' }, team: 'Red Bull Racing', time: '+36.957s', points: 10 },
      { position: 6, driver: { firstName: 'Lando', lastName: 'Norris' }, team: 'McLaren', time: '+45.212s', points: 8 },
      { position: 7, driver: { firstName: 'Nico', lastName: 'Hulkenberg' }, team: 'Haas', time: '+49.936s', points: 6 },
      { position: 8, driver: { firstName: 'Oscar', lastName: 'Piastri' }, team: 'McLaren', time: '+55.644s', points: 4 },
      { position: 9, driver: { firstName: 'Zhou', lastName: 'Guanyu' }, team: 'Alfa Romeo', time: '+57.128s', points: 2 },
      { position: 10, driver: { firstName: 'Yuki', lastName: 'Tsunoda' }, team: 'AlphaTauri', time: '+63.222s', points: 1 }
    ]
  };
  
  // Action creators
  export const fetchRaces = (season = '2024') => {
    return async (dispatch) => {
      dispatch({ type: FETCH_RACES });
      
      try {
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const races = season === '2024' ? mockRaces2024 : mockRaces2023;
        
        dispatch({
          type: FETCH_RACES_SUCCESS,
          payload: races
        });
      } catch (error) {
        dispatch({
          type: FETCH_RACES_FAILURE,
          payload: error.message
        });
      }
    };
  };
  
  export const setSelectedRace = (raceId) => {
    return {
      type: SET_SELECTED_RACE,
      payload: raceId
    };
  };
  
  export const fetchRaceResults = (raceId) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_RACE_RESULTS });
      
      try {
        // In a real app, this would be an API call
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        dispatch({
          type: FETCH_RACE_RESULTS_SUCCESS,
          payload: mockRaceResults[raceId] || []
        });
      } catch (error) {
        dispatch({
          type: FETCH_RACE_RESULTS_FAILURE,
          payload: error.message
        });
      }
    };
  };
  
  export const fetchDriverStandings = (season) => {
    // In a real app, this would be an API call
    return {
      type: FETCH_DRIVER_STANDINGS,
      payload: []
    };
  };
  
  export const fetchConstructorStandings = (season) => {
    // In a real app, this would be an API call
    return {
      type: FETCH_CONSTRUCTOR_STANDINGS,
      payload: []
    };
  };
  
  export const setCurrentSeason = (season) => {
    return {
      type: SET_CURRENT_SEASON,
      payload: season
    };
  };