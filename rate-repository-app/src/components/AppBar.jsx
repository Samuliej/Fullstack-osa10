import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

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
  }
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
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <AppBarTab text='Repositories' onPress={() => navigate('/')} />
      <AppBarTab text='Sign in' onPress={() => navigate('/sign-in')} />
    </View>
  );
};

export default AppBar;