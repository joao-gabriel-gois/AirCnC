import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import UserSession from './pages/UserSession';
import Book from './pages/Book';
  
const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    UserSession,
    Book
  })
);

export default Routes;

/*(
  <View style={styles.container}>
    <Text>Hello World / Test</Text>
  </View>
);*/