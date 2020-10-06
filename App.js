/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainPage} from './src/MainPage';
import {Filter} from './src/Filter';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from './src/AppContext';

Icon.loadFont();
const Stack = createStackNavigator();

// fetch(
//   `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary%20Drink`,
// )
//   .then((res) => res.json())
//   .then(console.log);

const App = () => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleSelectedCategories = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category),
      );
    } else {
      setSelectedCategories(
        availableCategories.filter(
          (item) => item === category || selectedCategories.includes(item),
        ),
      );
      // setSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((res) => res.json())
      .then((res) => {
        const categories = res.drinks.map((drink) => drink.strCategory);
        setAvailableCategories(categories);
        setSelectedCategories(categories);
      });
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          availableCategories,
          selectedCategories,
          toggleSelectedCategories,
        }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Drinks"
              component={MainPage}
              options={({navigation}) => ({
                headerRight: () => (
                  <View style={{paddingRight: 20}}>
                    <Icon
                      onPress={() => {
                        navigation.navigate('Filter');
                      }}
                      name="filter"
                      size={30}
                      color="black"
                    />
                  </View>
                ),
                headerTitle: <Text style={styles.headerTitle}>Drinks</Text>,
              })}
            />
            <Stack.Screen
              name="Filter"
              component={Filter}
              options={{
                headerTitle: <Text style={styles.headerTitle}>Filter</Text>,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
