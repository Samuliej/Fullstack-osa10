import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

/*

test to see if it works
const testAuth = async () => {
  const authA = new AuthStorage('authA');
  const authB = new AuthStorage('authB');

  await authA.setAccessToken('jfidsajgfidsajfjfidopsahgiesahgieap');
  await authB.setAccessToken('hyvinsalainen');

  const tokenA = await authA.getAccessToken();
  const tokenB = await authB.getAccessToken();

  console.log('authA token: ', tokenA);
  console.log('authB token: ', tokenB);

  await authA.removeAccessToken();
  await authB.removeAccessToken();
};

testAuth();

*/

export default AuthStorage;