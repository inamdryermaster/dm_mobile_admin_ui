import { configureStore } from '@reduxjs/toolkit';
import samplesSlice from './features/sample/sampleSlice';
import localStorageSlice from './features/localStorage/localStorageSlice';
import UserSlice from './features/user/userSlice';
import systemSlice from './features/system/systemSlice';
import userProfileSlice from './features/user/userProfileSlice';
import userOperatorSlice from './features/user/userOperatorSlice';
import messageSlice from './features/message/messageSlice';
import dryerMasterSlice from './features/dryerMaster/dryerMasterSlice';
import homeSlice from './features/home/homeSlice';
import chartSlice from './features/chart/chartSlice';
import userAccountSlice from './features/user/userAccountSlice';

const reducers = {
  sample: samplesSlice,
  localStorage: localStorageSlice,
  user: UserSlice,
  userProfile: userProfileSlice,
  userAccount: userAccountSlice,
  operators: userOperatorSlice,
  system: systemSlice,
  message: messageSlice,
  dryerMaster: dryerMasterSlice,
  home: homeSlice,
  chart: chartSlice,
};

const Store = configureStore({
  reducer: reducers,
});

export default Store;
