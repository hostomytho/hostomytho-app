import { useTailwind } from "tailwind-rn";
import { Text, TextInput, TouchableOpacity, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const MainInput = ({
  text,
  hide,
  setter,
  value,
  onSubmitEditing,
  isError,
  width = '80%',
  minWidth = 300,
  maxWidth = 600
}: {
  setter: any;
  text: string,
  hide: boolean,
  value: string,
  onSubmitEditing?: any;
  isError?: boolean,
  width?: string | number,
  minWidth?: string | number,
  maxWidth?: string | number
}) => {
  const tw = useTailwind();
  const errorStyle = isError ? tw("border-red-500") : {};
  const widthStyle = { minWidth, maxWidth, width };

  return (
    <TextInput
      style={{ ...tw(" my-1 px-2 py-1 leading-6 text-gray-700 border border-gray-300 rounded-md"), ...errorStyle, ...widthStyle }}
      placeholder={text}
      secureTextEntry={hide}
      onChangeText={setter}
      value={value}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default MainInput;
