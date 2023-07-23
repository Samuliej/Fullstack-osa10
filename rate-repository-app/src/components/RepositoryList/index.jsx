import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem/index';
import theme from '../../theme';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { PaperSelect } from 'react-native-paper-select';
import { useState } from 'react';

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

export const RepositoryListContainer = ({ selectedOrder, onOrderChange, repositories, navigate }) => {
  const respositoryNodes = repositories
  ? repositories.map((edge) => edge.node)
  : [];

  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <Item renderItem={renderItem} item={item} navigate={navigate} />}
      ListHeaderComponent={<OrderSelector selectedOrder={selectedOrder} onOrderChange={onOrderChange} />}
    />
  );
};

const OrderSelector = ({ selectedOrder, onOrderChange }) => {
  const orderOptions = [
    { _id: '1', value: 'Latest repositories' },
    { _id: '2', value: 'Oldest repositories' },
    { _id: '3', value: 'Highest rated repositories' },
    { _id: '4', value: 'Lowest rated repositories' },
  ];

  return (
    <PaperSelect
      label="Select Order"
      value={selectedOrder}
      onSelection={(value) => {
        onOrderChange(value.text);
      }}
      arrayList={orderOptions}
      selectedArrayList={[{ _id: selectedOrder, value: selectedOrder }]}
      errorText={null}
      multiEnable={false}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { repositories } = useRepositories(selectedOrder);
  const navigate = useNavigate();

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
  };

  /**
   * I don't know why, but I can't pass just repositories,
   * it will crash to repositories.edges.map saying that repositories is undefined
   */
  return <RepositoryListContainer
          selectedOrder={selectedOrder}
          onOrderChange={handleOrderChange}
          repositories={repositories.edges}
          navigate={navigate}
        />;
};

export default RepositoryList;