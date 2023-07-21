import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useAuthStorage } from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    paddingBottom: 16,
    paddingLeft: 16,
    flexDirection: 'row'
  },
  containerItem: {
    paddingHorizontal: 5
  },
});

const AppBarTab = (props) => {
  return (
    <Pressable
      style={styles.containerItem}
      onPress={props.onPress}>
    <Text fontSize='subheading' color='appBar'>{props.text}</Text>
  </Pressable>
  );
};

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text='Repositories' onPress={() => navigate('/')} />
        {!user && <AppBarTab text='Sign in' onPress={() => navigate('/sign-in')} />}
        {user && <AppBarTab text='Sign out' onPress={handleSignOut}/>}
      </ScrollView>
    </View>
  );
};

export default AppBar;