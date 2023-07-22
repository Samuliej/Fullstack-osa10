import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList/index';
import AppBar from './AppBar/index';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepositoryView from './RepositoryList/SingleRepositoryView';
import CreateReview from './CreateReview/index';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/sign-in' element={<SignIn /> } exact />
        <Route path='/create-review' element={<CreateReview />} />
        <Route path='/:id' element={<SingleRepositoryView />} exact />
      </Routes>
    </View>
  );
};

export default Main;