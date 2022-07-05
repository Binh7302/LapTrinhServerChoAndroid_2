import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../ProductContext'

export const Detail = (props) => {
  const { navigation, route: { params: { _id } } } = props;
  const { onGetProductById, product } = useContext(ProductContext);
  const [data, setData] = useState(product);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const res = await onGetProductById(_id);
    // await onGetProductById(_id);
    setData(res);
    setIsLoading(false);
    return () => {
      res;
    }
  }, []);
  return (

    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listText}>Detail</Text>
      </View>
      {
        isLoading == true ?
          <View style={styles.load}><Text>Đang tải dữ liệu</Text></View> :
          <View  style={styles.containerCon}>
            <Image style={styles.image}
              source={{ uri: product.image }}
            />
            <View style={styles.detailContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.title}>Tên: </Text>
                <Text style={styles.nameText} numberOfLines={1} >{product.name}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.title}>Giá: </Text>
                <Text style={styles.priceText}>{product.price} $</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.title}>Số lượng: </Text>
                <Text style={styles.quantityText}>{product.quantity} sp</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.title}>Mô tả: </Text>
                <Text style={styles.descriptionText} numberOfLines={4}>{product.description}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.title}>Ngày nhập: </Text>
                <Text style={styles.releaseText} numberOfLines={1}>{product.release}</Text>
              </View>
            </View>

            <Pressable style={styles.button}>
              <Text style={styles.labelText}>Chọn mua</Text>
            </Pressable>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.goBackText}>Quay lại</Text>
            </Pressable>
          </View>
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
    alignItems: 'center',
  },

  containerCon: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
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

  image: {
    height: 250,
    width: 250,
    resizeMode: 'cover',
    marginTop: 16,
    borderColor: 'black',
    borderWidth: 1,
  },

  detailContainer: {
    marginTop: 5,
    width: '70%'
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    letterSpacing: 0.5,
  },

  nameText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'red',
    letterSpacing: 0.5,
  },

  priceText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'blue',
    letterSpacing: 0.5,
  },

  quantityText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'orange',
    letterSpacing: 0.5,
  },

  descriptionText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'green',
    letterSpacing: 0.5,
  },

  releaseText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'purple',
    letterSpacing: 0.5,
  },

  button: {
    width: '70%',
    height: 57,
    backgroundColor: '#1676F3',
    borderRadius: 4,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },

  labelText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 20,
    color: 'white',
    letterSpacing: 0.5,
  },

  goBackText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: 'black',
    letterSpacing: 0.5,
    marginTop: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },

  load:{
    alignItems: 'center',
    marginTop: 300
  },
})