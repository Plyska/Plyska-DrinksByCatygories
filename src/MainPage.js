import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  SectionList,
} from 'react-native';
import AppContext from './AppContext';

export const MainPage = ({route, navigation}) => {
  const appContext = useContext(AppContext);

  const [drinks, setDrinks] = useState([]);
  const [loadedCategoryIndex, setLoadedCategoryIndex] = useState(null);
  const [isEverythingLoaded, setIsEverythingLoaded] = useState(false);

  const loadNextCategory = () => {
    const category = appContext.selectedCategories[loadedCategoryIndex];

    if (!category) {
      setIsEverythingLoaded(true);
      return;
    }

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setDrinks([
          ...drinks,
          {
            title: category,
            data: res.drinks,
          },
        ]);
        setLoadedCategoryIndex(loadedCategoryIndex + 1);
      });
  };

  useEffect(() => {
    setDrinks([]);
    setLoadedCategoryIndex(0);
    setIsEverythingLoaded(false);
  }, [appContext.selectedCategories]);

  useEffect(() => {
    if (!!loadedCategoryIndex || !appContext.selectedCategories.length) return;
    loadNextCategory();
  }, [loadedCategoryIndex, appContext.selectedCategories.length]);

  return (
    <SafeAreaView>
      <SectionList
        onEndReachedThreshold={0.01}
        onEndReached={loadNextCategory}
        sections={drinks}
        renderItem={({item}) => (
          <View style={styles.cards} key={item.idDrink}>
            <View>
              <Image source={{uri: item.strDrinkThumb}} style={styles.image} />
            </View>

            <View style={styles.name}>
              <Text>{item.strDrink}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.category} key={title}>
            <Text style={styles.categoryName}>{title}</Text>
          </View>
        )}
      />
      {isEverythingLoaded && <Text style={styles.finish} >Finish</Text>}
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  category: {
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  categoryName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  name: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  cards: {
    paddingLeft: 30,
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  footer: {
    marginBottom: 25,
    marginTop: 15,
  },

  finish: {
    paddingLeft: "45%"
    
  }
});
