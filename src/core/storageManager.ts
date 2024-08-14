import {MMKV} from 'react-native-mmkv';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {create} from 'zustand';

// Create and initialise the MMKV instance
const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
};

export const clearStorage = () => {
  storage.clearAll();
};

export {create, storage, zustandStorage, persist, createJSONStorage};
