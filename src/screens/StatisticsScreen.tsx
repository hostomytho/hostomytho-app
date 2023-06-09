import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";

const StatisticsScreen = ({}) => {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 items-center")}>
      <ScrollView style={tw('w-full')}>
        <CustomHeaderEmpty title="Statistiques" />
        <Text>En dev</Text>

      </ScrollView>
    </View>);
};

export default StatisticsScreen;
