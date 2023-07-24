import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const SearchBar = ({ keyword, onChangeSearch }) => {
  return (
    <Searchbar
      style={{ backgroundColor: '#F0F0F0',  marginTop: 10, marginBottom: 5 }}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={keyword}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [debouncedKey] = useDebounce(keyword);
  const first = 7;
  const { repositories, fetchMore } = useRepositories(selectedOrder, debouncedKey, first);
  const navigate = useNavigate();

  const handleOrderChange = value => setSelectedOrder(value);
  const onChangeSearch = query => setKeyword(query);

  const onEndReach = () => {
    fetchMore();
  };

  /**
   * I don't know why, but I can't pass just repositories,
   * it will crash to repositories.edges.map saying that repositories is undefined
   */
  return (
    <>
      <SearchBar keyword={keyword} onChangeSearch={onChangeSearch} />
      <RepositoryListContainer
          selectedOrder={selectedOrder}
          onOrderChange={handleOrderChange}
          repositories={repositories.edges}
          navigate={navigate}
          onEndReach={onEndReach}
        />
    </>
    );
};

export default RepositoryList;