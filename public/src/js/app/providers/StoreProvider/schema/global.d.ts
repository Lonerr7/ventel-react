import {AppDispatch as StoreAppDispatch, RootState} from '../store/store';

declare global {
  type AppDispatch = StoreAppDispatch;
  type StateSchema = RootState;

  const f: any;
}
