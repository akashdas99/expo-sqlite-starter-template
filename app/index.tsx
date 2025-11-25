import { StyleSheet, View } from "react-native";
import { db } from "../db/db";

export default function App() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    ></View>
  );
}
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  btnText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
});
