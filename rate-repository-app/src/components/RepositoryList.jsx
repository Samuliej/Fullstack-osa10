import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

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

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const respositoryNodes = repositories
    ? repositories.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

export default RepositoryList;