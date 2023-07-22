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
  const repository = useRepository(id);

  console.log(id);

  if (repository.loading) {
    return <Text>Repository is loading</Text>;
  }

  if (repository.error) {
    return <Text>Error: {repository.error.message}</Text>;
  }

  if (!repository.data) {
    return <Text>Repository data not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <ReviewList repository={repository}/>
      </View>
    </View>
  );
};


export default SingleRepositoryView;