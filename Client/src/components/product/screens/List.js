import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../ProductContext'

export const List = (props) => {
  const { navigation } = props;
  const { onGetProducts, products } = useContext(ProductContext);
  const [data, setData] = useState(products);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const res = await onGetProducts();
    // await onGetProducts();
    setData(res);
    setIsLoading(false);
    return () => {
      res;
    }
  }, []);

  const renderItem = ({ item }) => {
    const { _id, name, image, price, quantity, category } = item;
    return (
      <Pressable style={styles.productContainer} onPress={() => navigation.navigate('Detail', { _id: _id })}>
        <View style={styles.imageContainer}>
          <Image style={styles.image}
            source={{ uri: image }}
          />
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Tên: </Text>
            <Text style={styles.nameText} numberOfLines={1} >{name}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Giá: </Text>
            <Text style={styles.priceText}>{price}$</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Số lượng: </Text>
            <Text style={styles.quantityText}>{quantity}sp</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.title}>Thể loại: </Text>
            <Text style={styles.categoryText} numberOfLines={1}>{category.name}</Text>
          </View>
        </View>

      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listText}>List Products</Text>
      </View>

      {
        isLoading == true ?
          <View style={styles.load}><Text>Đang tải dữ liệu</Text></View> :
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={Math.random}
          />
      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },

  load:{
    alignItems: 'center',
    marginTop: 300
  },

  listContainer: {
    marginTop: 32,
    alignItems: 'center',
  },

  listText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5,
  },

  productContainer: {
    width: '100%',
    height: 180,
    borderColor: 'black',
    borderWidth: 0.6,
    marginTop: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  imageContainer: {
    justifyContent: 'center',
  },

  image: {
    height: 140,
    width: 140,
    resizeMode: 'cover',
  },

  detailContainer: {
    marginTop: 5,
    width: '40%'
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5,
  },

  nameText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'red',
    letterSpacing: 0.5,
  },

  priceText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'blue',
    letterSpacing: 0.5,
  },

  quantityText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'orange',
    letterSpacing: 0.5,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'green',
    letterSpacing: 0.5,
  },
})