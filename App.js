import React from "react";
import Navigation from "./navigations/Navigations";
import {LogBox} from "react-native"

LogBox.ignoreAllLogs()

export default function App() {
  return (<Navigation/>)

}


