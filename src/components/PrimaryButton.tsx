import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PrimaryButton = ({
  title,
  destination,
  props,
  backgroundColor = 'bg-primary',
}: {
  title: string;
  destination: any;
  props?: any;
  backgroundColor?: string;
}) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      // @ts-ignore
      onPress={() => navigation.navigate(destination)}
      style={tw(`${backgroundColor} rounded mr-2 py-2 px-12 my-2 font-medium w-full`)}
    >
      <Text style={tw('text-white text-center text-lg font-primary')}
      >{title}</Text>
    </TouchableOpacity>

  );
};

export default PrimaryButton;
