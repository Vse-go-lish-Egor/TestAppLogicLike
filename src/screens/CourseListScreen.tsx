import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { fetchCourses } from '../core/api/courses';
import { Courses } from '../core/types';
import { useFetch } from '../core/hooks/useFetch';
import { colors } from '../core/colors/mainColors';
import { Font } from '../components/Font';
import DownPoiner from '../assets/svgs/down-poiner.svg';
import CourseList from '../components/CourseList';

const CourseListScreen = () => {
  const { data, error, status, isLoading } = useFetch<Courses[]>(fetchCourses);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Font.Weight800_12 color={colors.white}>Все темы</Font.Weight800_12>
        <View style={styles.circle}>
          <DownPoiner />
        </View>
      </TouchableOpacity>
      {data && <CourseList data={data} onPress={() => {}} />}
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
