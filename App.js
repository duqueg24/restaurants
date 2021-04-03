import React from "react";
import Navigation from "./navigations/Navigations";
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs()
LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  return (<Navigation/>)

}