export const getItem = <T>(key: string): T | null => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.log('Error getting data from localStorage', e);
    return null;
  }
};

export const setItem = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log('Error saving data in localStorage', e);
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing data in localStorage', e);
  }
};
