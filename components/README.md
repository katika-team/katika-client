# Components Folder

This folder is for React Native components.

## Structure
- Add your component files here
- Use .tsx for TypeScript components
- Export components from index.ts if needed

## Example
// ExampleComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const ExampleComponent = () => {
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
};
