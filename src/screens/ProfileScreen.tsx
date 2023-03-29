import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "../components/MainTitle";

const ProfileScreen = ({}) => {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <MainTitle title="Profile Screen" />
      <PrimaryButton title="Menu principal" destination="Main" />
    </View>
  );
};

export default ProfileScreen;
