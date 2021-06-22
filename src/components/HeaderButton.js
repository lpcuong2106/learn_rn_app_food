import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  HeaderButton,
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={Ionicons} iconSize={23} {...props} />
);

export default IoniconsHeaderButton
