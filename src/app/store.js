import { configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { bookApi } from '../features/Books/bookApi';
import pageCounterReducer from '../features/Books/pageCounter';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    pageCounter: pageCounterReducer,
  },
  middleware: (getDefaultMiddleware) =>{
   return getDefaultMiddleware().concat(bookApi.middleware)
  }
});

setupListeners(store.dispatch);
