import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Todo } from "@/types/interfaces";
import { Link } from "expo-router";
import { Colors } from "@/constants/colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

interface TaskRowProps {
  task: Todo;
}
const TaskRow = ({ task }: TaskRowProps) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);
  const markAsCompleted = async () => {
    console.log("🚀 ~ markAsCompleted ~ markAsCompleted:");
    await drizzleDb
      .update(todos)
      .set({ completed: 1, date_completed: Date.now() })
      .where(eq(todos.id, task.id));
  };
  return (
    <View>
      <Link asChild href={`/task/${task.id}`} style={styles.container}>
        <TouchableOpacity>
          <View style={styles.row}>
            <BouncyCheckbox
              textContainerStyle={{ display: "none" }}
              size={25}
              unFillColor="#fff"
              fillColor={task.project_color}
              isChecked={task.completed === 1}
              onPress={markAsCompleted}
            />
            <Text style={styles.name}>{task.name}</Text>
          </View>
          <Text style={styles.projectName}>{task.project_name}</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TaskRow;

const styles = StyleSheet.create({
  projectName: {
    fontSize: 12,
    color: Colors.lightText,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  container: {
    padding: 14,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
  row: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
