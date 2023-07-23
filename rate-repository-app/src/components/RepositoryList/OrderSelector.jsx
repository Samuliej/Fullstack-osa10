import { PaperSelect } from "react-native-paper-select";

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

export default OrderSelector;