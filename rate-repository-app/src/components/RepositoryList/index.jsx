import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../theme';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.appBackground
  },
});

const renderItem = ({item}) => {
  return <RepositoryItem item={item} />;
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const respositoryNodes = repositories
  ? repositories.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  /**
   * I don't know why, but I can't pass just repositories,
   * it will crash to repositories.edges.map saying that repositories is undefined
   */
  return <RepositoryListContainer repositories={repositories.edges} />;
};

export default RepositoryList;