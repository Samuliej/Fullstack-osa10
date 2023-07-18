import { View } from 'react-native';
import Text from './Text';

const RepositoryItem = (props) => {
  const { fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage } = props.item;

  return (
    <View>
      <Text fontWeight='bold' fontSize='subheading'>Full name: {fullName}</Text>
      <Text color='textSecondary'>Description: {description}</Text>
      <Text color='textSecondary'>Language: {language}</Text>
      <Text color='textSecondary'>Stars: {stargazersCount}</Text>
      <Text color='textSecondary'>Forks: {forksCount}</Text>
      <Text color='textSecondary'>Reviews: {reviewCount}</Text>
      <Text color='textSecondary'>Rating: {ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;