import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { Courses } from '../core/types';
import { colors } from '../core/colors/mainColors';
import { Font } from './Font';
type CourseListProps = {
  data: Courses[];
  onPress: () => void;
};
const CourseList: React.FC<CourseListProps> = ({ data, onPress }) => {
  const animatedValues = useRef(data.map(() => new Animated.Value(-6))).current;

  const handlePressIn = useCallback(
    (index: number) => {
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
    [animatedValues],
  );

  const handlePressOut = useCallback(
    (index: number) => {
      Animated.timing(animatedValues[index], {
        toValue: -6,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
    [animatedValues],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Courses; index: number }) => {
      return (
        <TouchableOpacity
          onPressIn={() => handlePressIn(index)}
          onPressOut={() => handlePressOut(index)}
          onPress={onPress}
          activeOpacity={1}
        >
          <View style={[styles.card, styles.cardWrapper]}>
            <Animated.View
              style={[
                styles.card,
                { 
                  backgroundColor: item.bgColor,
                  position: 'absolute',
                  transform: [
                    { 
                      translateY: animatedValues[index] 
                    },
                  ],
                },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Font.Weight800_14 color={colors.purple_gray}>
                  {item.name}
                </Font.Weight800_14>
              </View>
            </Animated.View>
          </View>
        </TouchableOpacity>
      );
    },
    [animatedValues, handlePressIn, handlePressOut, onPress],
  );

  return (
    <FlatList
      data={data}
      horizontal
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: Dimensions.get('screen').height * 0.55,
    aspectRatio: 1.06,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  cardWrapper: {
    backgroundColor: colors.light_gray,
  },
  image: {
    height: '72%',
    aspectRatio: 1,
    marginVertical: 9,
  },
  textContainer: {
    backgroundColor: colors.white,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  contentContainerStyle: {
    gap: 9,
    paddingHorizontal: 24,
    marginTop: 38,
  },
});
export default CourseList;
