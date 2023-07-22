import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem/index';
import theme from '../../theme';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: theme.separator
});

const Item = ({ renderItem, item, navigate }) => {
  return renderItem({ item, navigate });
};

const renderItem = ({ item, navigate }) => {
   const openSingleView = () => {
     navigate(`/${item.id}`);
   };

  return (
    <Pressable onPress={openSingleView}>
      <RepositoryItem item={item} />
    </Pressable>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const respositoryNodes = repositories
  ? repositories.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Item renderItem={renderItem} item={item} navigate={navigate} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();
  /**
   * I don't know why, but I can't pass just repositories,
   * it will crash to repositories.edges.map saying that repositories is undefined
   */
  return <RepositoryListContainer repositories={repositories.edges} navigate={navigate} />;
};

export default RepositoryList;