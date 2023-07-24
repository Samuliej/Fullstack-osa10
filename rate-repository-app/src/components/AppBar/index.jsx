import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../../hooks/useAuthStorage';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';

const styles = StyleSheet.create({
  container: theme.container
});


const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  let user = null;
  const data = useGetCurrentUser(false);
  user = data && data.user;

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken();
      apolloClient.resetStore();
      console.log('signed out successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' onPress={() => navigate('/')} />
        {!user && (
          <>
            <AppBarTab text='Sign in' onPress={() => navigate('/sign-in')} />
            <AppBarTab text='Sign up' onPress={() => navigate('/sign-up')} />
          </>
        )}
        {user && (
          <>
            <AppBarTab text='Create a review' onPress={() => navigate('/create-review')}/>
            <AppBarTab text='My reviews' onPress={() => navigate('/my-reviews')}/>
            <AppBarTab text='Sign out' onPress={handleSignOut}/>
          </>

        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;