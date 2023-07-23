import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../Text';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import { useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../../graphql/queries';
import { useAuthStorage } from '../../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: theme.container
});


const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ME);
  let user = null;

  if (loading) {
    return <Text>User loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!loading) {
    if (data) {
      user = data.me;
    }
  }

  console.log('user', user);

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
            <AppBarTab text='Sign out' onPress={handleSignOut}/>
          </>

        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;