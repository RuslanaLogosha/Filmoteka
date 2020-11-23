import localStorageApi from './localStorageApi';

const userPoint = {

    'USER_POINT_STORAGE_NAME': 'user',
    
    getCurrentLibrary() {
      const userPoint = localStorageApi.load(this.USER_POINT_STORAGE_NAME);
      if(userPoint?.currentLibrary) return userPoint.currentLibrary;
    },

    saveCurrentLibrary(currentLibrary) {
      localStorageApi.save(this.USER_POINT_STORAGE_NAME, { currentLibrary });
    }
}

export default userPoint;
