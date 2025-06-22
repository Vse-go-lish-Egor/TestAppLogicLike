import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback } from 'react';
import { colors } from '../core/colors/mainColors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigation';
import { Font } from '../components/Font';
import Cross from '../assets/svgs/icn_cross_36px.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'TopicsListScreen'>;

const TopicsListScreen: React.FC<Props> = ({ navigation, route }) => {

  const handleNavigate = useCallback(
    (tag: string) => {
      return navigation.navigate('CourseListScreen', { selectedTag: tag });
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity onPress={() => handleNavigate(item)}>
        <View
          style={[
            styles.itemContainerStyle,
            {
              backgroundColor:
                item === route.params.selectedTag ? colors.green : colors.white,
              borderColor:
                item === route.params.selectedTag ? colors.green : colors.gray,
            },
          ]}
        >
          <Font.Weight800_18
            color={
              item === route.params.selectedTag
                ? colors.white
                : colors.dark_gray
            }
          >
            {item === 'all' ? 'Все темы' : item}
          </Font.Weight800_18>
        </View>
      </TouchableOpacity>
    ),
    [handleNavigate, route.params.selectedTag],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.crossButton} onPress={handleGoBack}>
        <Cross />
      </TouchableOpacity>
      <Font.Weight800_18 color={colors.dark_gray}>Выбор темы</Font.Weight800_18>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={['all', ...route.params.allTags]}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
    backgroundColor: colors.white,
  },
  crossButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  contentContainerStyle: {
    marginTop: 18,
    gap: 6,
    width: Dimensions.get('window').width * 0.53,
  },
  itemContainerStyle: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 2,
  },
});
export default TopicsListScreen;
