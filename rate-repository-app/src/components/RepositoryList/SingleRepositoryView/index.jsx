import Text from "../../Text";
import { useParams } from 'react-router-native';
import { View, StyleSheet } from "react-native";
import theme from "../../../theme";
import useRepository from "../../../hooks/useRepository";
import ReviewList from "./ReviewList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.appBackground,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  separator: theme.separator,
});

const SingleRepositoryView = () => {
  const { id } = useParams();
  const first = 4;
  const { repository, fetchMore, loading, error } = useRepository(id, first);

  if (loading) {
    return <Text>Repository is loading</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!repository) {
    return <Text>Repository data not found</Text>;
  }

  const onEndReach = () => {
    console.log('loppu');
    fetchMore();
  };

  return (
    <View style={styles.container}>
      <View>
        <ReviewList onEndReach={onEndReach} repository={repository}/>
      </View>
    </View>
  );
};


export default SingleRepositoryView;