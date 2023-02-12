import { createContext, useContext, useReducer, useCallback } from 'react';

type LocationContextType = ReturnType<typeof LocationManager>;

type ActionType =
  | { type: 'ADD_LOCATION'; payload: string }
  | { type: 'REMOVE_LOCATION'; payload: '' };

const LocationContext = createContext<LocationContextType>({
  location: '',
  addLocation: () => {},
  removeLocation: () => {},
});

function LocationManager(initialLocation: string): {
  location: string;
  addLocation: (location: string) => void;
  removeLocation: () => void;
} {
  const [location, dispatch] = useReducer(
    (state: string, action: ActionType) => {
      switch (action.type) {
        case 'ADD_LOCATION':
          return action.payload;
        case 'REMOVE_LOCATION':
          return action.payload;
        default:
          return state;
      }
    },
    initialLocation
  );

  const addLocation = useCallback((location: string) => {
    dispatch({ type: 'ADD_LOCATION', payload: location });
  }, []);
  const removeLocation = useCallback(() => {
    dispatch({ type: 'REMOVE_LOCATION', payload: '' });
  }, []);

  return { location, addLocation, removeLocation };
}

export default function LocationProvider({
  children,
  initialLocation,
}: {
  children: React.ReactNode;
  initialLocation: string;
}) {
  return (
    <LocationContext.Provider value={LocationManager(initialLocation)}>
      {children}
    </LocationContext.Provider>
  );
}

export const useCurrentLocation = (): string => {
  const { location } = useContext(LocationContext);
  return location;
};

export const useAddLocation = (): LocationContextType['addLocation'] => {
  const { addLocation } = useContext(LocationContext);
  return addLocation;
};

export const useRemoveLocation = (): LocationContextType['removeLocation'] => {
  const { removeLocation } = useContext(LocationContext);
  return removeLocation;
};
