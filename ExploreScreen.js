import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';


const ExploreScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Explore Screen</Text>
      <Button
        title="eXPLjkahsdjfkhaksjORE"
        onPress={() => alert('BUtton Clicked')}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
