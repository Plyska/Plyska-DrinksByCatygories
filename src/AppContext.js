import {createContext} from 'react';

const AppContext = createContext({
  availableCategories: [],
  selectedCategories: [],
  toggleSelectedCategories: () => {},
});

export default AppContext;
