import { FlatList, View, StyleSheet, Pressable } from "react-native";
import OrderSelector from "./OrderSelector";
import theme from "../../theme";
import RepositoryItem from "./RepositoryItem";

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

export default RepositoryListContainer;