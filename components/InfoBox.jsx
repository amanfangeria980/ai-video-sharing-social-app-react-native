import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyles, textStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`${textStyles} text-white text-center font-psemibold`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
