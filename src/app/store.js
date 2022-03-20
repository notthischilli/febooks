import { configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { bookApi } from '../features/Books/bookApi';
import pageCounterReducer from '../features/Books/pageCounter';
import searchPageCounterReducer from '../features/Books/searchPageCounter';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    pageCounter: pageCounterReducer,
    searchPageCounter: searchPageCounterReducer
  },
  middleware: (getDefaultMiddleware) =>{
   return getDefaultMiddleware().concat(bookApi.middleware)
  }
});

setupListeners(store.dispatch);
