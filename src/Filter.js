import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from './AppContext';

Icon.loadFont();
export const Filter = ({navigation}) => {
  const appContext = useContext(AppContext);

  const renderCheckMark = (check) => {
    if (check) {
      return (
        <Icon name="check" size={30} color="black" style={styles.checkIcon} />
      );
    } else {
      return null;
    }
  };

  return (
    <ScrollView>
      <View>
        {appContext.availableCategories.map((item) => (
          <View style={styles.row} key={item}>
            <Text
              onPress={() => appContext.toggleSelectedCategories(item)}
              style={styles.text}>
              {item}
            </Text>

            {renderCheckMark(appContext.selectedCategories.includes(item))}
          </View>
        ))}
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => {
            navigation.navigate('Drinks');
          }}
          title="APPLY"
          color="#000"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 15,
  },

  text: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    fontSize: 20,
  },
  checkbox: {
    marginRight: 20,
  },
  button: {
    paddingTop: 20,
    paddingLeft: '15%',
    width: '85%',
   
  },
  checkIcon: {
    marginRight: 20,
  },
});
