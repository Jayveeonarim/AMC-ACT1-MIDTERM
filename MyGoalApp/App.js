import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;

    if (editingIndex !== null) {
      const updatedGoals = [...courseGoals];
      updatedGoals[editingIndex] = { text: enteredGoalText, id: updatedGoals[editingIndex].id };
      setCourseGoals(updatedGoals);
      setEditingIndex(null);
    } else {
      setCourseGoals((currentCourseGoals) => [
        ...currentCourseGoals,
        { text: enteredGoalText, id: Math.random().toString() },
      ]);
    }
    setEnteredGoalText('');
  };

  const deleteGoalHandler = (index) => {
    const updatedGoals = [...courseGoals];
    updatedGoals.splice(index, 1);
    setCourseGoals(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditingHandler = (index) => {
    setEnteredGoalText(courseGoals[index].text);
    setEditingIndex(index);
  };

  return (
    <View>
      <View>
        <TextInput style={styles.input}
          placeholder="My Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="My Goal" onPress={addGoalHandler} />
      </View>

      <FlatList
        data={courseGoals}
        renderItem={({ item, index }) => (
          <View style={styles.goalContainer}>
          <View> 
          <TouchableOpacity onPress={() => deleteGoalHandler(index)}>
              <Text style={styles.clickableSize}>X</Text>
            </TouchableOpacity>
            </View>
            
            <Text style={styles.text}>{item.text}</Text>
            <View style={styles.edit}>
            <TouchableOpacity onPress={() => startEditingHandler(index)}>
              <Text style={styles.clickableSize}>Edit</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  goalContainer: {
    paddingTop: 20,
    padding: 10,
    backgroundColor: "#add8e6",
    marginTop: 25,
    borderWidth: 2,
 
  },
  input: {
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 20,
      textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
  clickableSize: {
    fontSize: 20
  },
  edit: {
    alignSelf: 'flex-end',
    fontSize: 24,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#32cd32",
  },
});
