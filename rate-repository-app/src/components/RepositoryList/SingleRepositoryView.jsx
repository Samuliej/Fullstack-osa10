import RepositoryItem from "./RepositoryItem/index";
import Text from "../Text";
import { useParams } from 'react-router-native';
import { View, StyleSheet } from "react-native";
import theme from "../../theme";
import useRepository from "../../hooks/useRepository";

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
});

const SingleRepositoryView = () => {
  const { id } = useParams();
  const repository = useRepository(id);

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
        <RepositoryItem item={repository.data} />
      </View>
    </View>
  );
};

export default SingleRepositoryView;