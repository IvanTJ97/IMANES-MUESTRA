import Provider from './src/application/provider';
import Navigation from './src/navigation';
export default function App() {
  console.disableYellowBox = true;
  return <Provider>
    <Navigation/>
  </Provider>
  ;
};