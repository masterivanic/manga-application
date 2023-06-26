import { createAppContainer, createStackNavigator } from 'react-navigation'
// import { createStackNavigator, createAppContainer } from 'react-navigation-stack'
import Search from '../Components/Search'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    }
})

export default createAppContainer(SearchStackNavigator)