// Action Types
export const FETCH_UPCOMING_RACE = 'FETCH_UPCOMING_RACE';
export const FETCH_LATEST_NEWS = 'FETCH_LATEST_NEWS';
export const FETCH_USER_TEAM = 'FETCH_USER_TEAM';
export const FETCH_DRIVERS = 'FETCH_DRIVERS';
export const FETCH_RACE_SCHEDULE = 'FETCH_RACE_SCHEDULE';
export const UPDATE_USER_TEAM = 'UPDATE_USER_TEAM';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';

// Action Creators
export const fetchUpcomingRace = () => {
  // In a real app, this would make an API call
  return {
    type: FETCH_UPCOMING_RACE,
    payload: {
      id: 1,
      name: 'Bahrain Grand Prix',
      circuit: 'Bahrain International Circuit',
      location: 'Sakhir, Bahrain',
      date: new Date(2024, 2, 2), // March 2, 2024
      daysUntil: 5
    }
  };
};

export const fetchLatestNews = () => {
  // In a real app, this would make an API call
  return {
    type: FETCH_LATEST_NEWS,
    payload: [
      {
        id: 1,
        title: 'Hamilton Secures Pole Position in Qualifying',
        summary: 'Lewis Hamilton secured pole position for the upcoming race with a stunning lap time.',
        date: new Date(2024, 1, 28),
      },
      {
        id: 2,
        title: 'Verstappen Fastest in Practice Sessions',
        summary: 'Max Verstappen showed impressive pace during Friday practice sessions.',
        date: new Date(2024, 1, 27),
      },
      {
        id: 3,
        title: 'Ferrari Unveils Upgrades for Next Race',
        summary: 'Ferrari brings significant aerodynamic upgrades to improve performance.',
        date: new Date(2024, 1, 26),
      }
    ]
  };
};

export const fetchUserTeam = () => {
  // Initially return null to indicate no team exists yet
  return {
    type: FETCH_USER_TEAM,
    payload: null
  };
};

export const fetchDrivers = () => {
  // In a real app, this would make an API call
  return {
    type: FETCH_DRIVERS,
    payload: [
      {
        id: 1,
        firstName: 'Max',
        lastName: 'Verstappen',
        team: 'Red Bull Racing',
        points: 125,
        price: 30.5,
        form: 9.2,
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        firstName: 'Lewis',
        lastName: 'Hamilton',
        team: 'Mercedes',
        points: 95,
        price: 28.0,
        form: 8.7,
        imageUrl: 'https://via.placeholder.com/150'
      }
    ]
  };
};

export const fetchRaceSchedule = (season) => {
  // In a real app, this would make an API call
  return {
    type: FETCH_RACE_SCHEDULE,
    payload: [
      {
        id: 1,
        name: 'Bahrain Grand Prix',
        circuit: 'Bahrain International Circuit',
        location: 'Sakhir, Bahrain',
        date: new Date(2024, 2, 2), // March 2, 2024
      },
      {
        id: 2,
        name: 'Saudi Arabian Grand Prix',
        circuit: 'Jeddah Corniche Circuit',
        location: 'Jeddah, Saudi Arabia',
        date: new Date(2024, 2, 9), // March 9, 2024
      }
    ]
  };
};

export const updateUserTeam = (team) => {
  // In a real app, this would make an API call
  return {
    type: UPDATE_USER_TEAM,
    payload: team
  };
};

export const fetchLeaderboard = (type) => {
  // In a real app, this would make an API call
  return {
    type: FETCH_LEADERBOARD,
    payload: [
      {
        id: 1,
        name: 'Champion Racer',
        owner: 'user123',
        points: 856,
      },
      {
        id: 2,
        name: 'Speed Demons',
        owner: 'f1fan',
        points: 842,
      }
    ]
  };
};