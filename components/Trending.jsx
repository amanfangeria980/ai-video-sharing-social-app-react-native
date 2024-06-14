import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded--[35px] my-5 overflow-hidden shadow-lg shadow-black"
            resizeMode="contain"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;

// Theory
/* 
In the provided React Native code, the `Trending` component renders a horizontally scrolling list of items using a `FlatList`. Each item in the list is rendered by the `TrendingItem` component. The `activeItem` state and animations are used to visually highlight the currently active item in the carousel by scaling it up while scaling down the other items. Here’s how it all works together:

### Key Components and Functions:

1. **Trending Component**:
   - `activeItem`: State that holds the ID of the currently active item in the carousel.
   - `onViewableItemsChanged`: Callback function that gets triggered when the viewable items change. It updates `activeItem` to the first visible item's ID.

2. **FlatList**:
   - `data`: Array of posts to be displayed.
   - `keyExtractor`: Function to extract a unique key for each item (`item.$id`).
   - `renderItem`: Function to render each item using the `TrendingItem` component.
   - `onViewableItemsChanged`: Prop that accepts the `onViewableItemsChanged` function to detect changes in viewable items.
   - `viewabilityConfig`: Configuration to determine when an item is considered visible (`itemVisiblePercentThreshold: 70` means an item is considered visible if at least 70% of it is visible).
   - `contentOffset`: Sets the initial scroll position.

3. **TrendingItem Component**:
   - `activeItem`: Prop indicating the ID of the currently active item.
   - `item`: Prop representing the current item to be displayed.
   - `play`: State to track if the item is in "play" mode.
   - `zoomIn` and `zoomOut`: Animation definitions for scaling up and scaling down, respectively.
   - `Animatable.View`: A wrapper around the item that applies the appropriate animation based on whether the item is active.

### How Active Item and Scaling Work:

1. **Setting Active Item**:
   - When the user scrolls through the carousel, the `FlatList` detects which items are currently visible using the `onViewableItemsChanged` callback.
   - The `onViewableItemsChanged` callback sets the first visible item as the active item by updating the `activeItem` state.

2. **Animating the Items**:
   - The `TrendingItem` component receives `activeItem` and `item` as props.
   - Inside `TrendingItem`, an `Animatable.View` wraps the content of the item and applies an animation based on whether the item is the active one:
     - If `activeItem === item.$id`, the `zoomIn` animation is applied, scaling the item up.
     - Otherwise, the `zoomOut` animation is applied, scaling the item down.
   - This scaling effect is achieved using the `scale` property in the animation definitions (`zoomIn` scales from 0.9 to 1, and `zoomOut` scales from 1 to 0.9).

3. **Play State**:
   - The `play` state in `TrendingItem` determines whether to display a "Playing" text or a play button overlay.
   - When the item is pressed, `setPlay(true)` updates the `play` state, which conditionally renders the "Playing" text instead of the play button.

### Summary:

- **Active Item Detection**: `FlatList` detects visible items and updates `activeItem` state.
- **Animation Application**: `TrendingItem` uses `Animatable.View` to apply scaling animations based on whether the item is active.
- **User Interaction**: Clicking an item changes its `play` state, toggling the display between a play button and "Playing" text.

This approach ensures that the active item is visually distinguished by a scaling animation, enhancing the user experience in the carousel.
*/
