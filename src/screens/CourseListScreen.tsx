import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { fetchCourses } from '../core/api/courses';
import { Courses } from '../core/types';
import { useFetch } from '../core/hooks/useFetch';
import { colors } from '../core/colors/mainColors';
import { Font } from '../components/Font';
import DownPoiner from '../assets/svgs/down-poiner.svg';
import CourseList from '../components/CourseList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CourseListScreen'>;

const CourseListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data, error, status } = useFetch<Courses[]>(fetchCourses);
  const [selectedTag, _] = React.useState<string>(
    route.params?.selectedTag || 'all',
  );
  const [allTags, setAllTags] = React.useState<string[]>([]);

  const getAllTags = useCallback(
    (courses: Courses[]) =>
      Array.from(
        new Set(
          courses
            .flatMap(course => course.tags)
            .filter((tag): tag is string => !!tag),
        ),
      ),
    [],
  );

  const handleNavigate = useCallback(() => {
    navigation.navigate('TopicsListScreen', {
      selectedTag: selectedTag,
      allTags: allTags,
    });
  }, [allTags, navigation, selectedTag]);

  useEffect(() => {
    setAllTags(getAllTags(data || []));
  }, [data, getAllTags]);

  const filtredData = useMemo(
    () => data?.filter(item => item.tags?.includes(selectedTag)),
    [data, selectedTag],
  );

  if (status === 'loading' || error) {
    return (
      <View style={styles.container}>
        <Font.Weight800_12 color={colors.white}>
          {error ? error : 'Загрузка...'}
        </Font.Weight800_12>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Font.Weight800_12 color={colors.white}>
          {selectedTag === 'all' ? 'Все темы' : selectedTag}
        </Font.Weight800_12>
        <View style={styles.circle}>
          <DownPoiner />
        </View>
      </TouchableOpacity>
      {data && (
        <CourseList
          data={selectedTag === 'all' ? data : filtredData || []}
          onPress={() => {}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
    backgroundColor: colors.purple,
  },
  button: {
    borderRadius: 40,
    padding: 5,
    gap: 3,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blackWithOpacity(0.2),
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: 20,
    backgroundColor: colors.blackWithOpacity(0.2),
  },
});
export default CourseListScreen;
