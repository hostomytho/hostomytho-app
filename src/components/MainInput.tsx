import { useTailwind } from "tailwind-rn";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const MainInput = ({
  text,
  hide,
  setter,
  value,
  onSubmitEditing,
}: {
  setter: any;
  text: string,
  hide: boolean,
  value: string,
  onSubmitEditing?: any;
}) => {
  const tw = useTailwind();

  return (
    <TextInput
      style={tw("block my-1 px-2 py-1 leading-6 text-gray-700 border border-gray-300 rounded-md")}
      placeholder={text}
      secureTextEntry={hide}
      onChangeText={setter}
      value={value}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default MainInput;