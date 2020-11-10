# Get migration like structure for your released App

## Installation

`yarn add react-native-onupdate`

### or

`npm i react-native-onupdate`

## Usage

` import Migration from 'react-native-onupdate';

const migrationFunctions = [ () => { console.log('migration 1') }, () => { console.log('migration 2') } () => { console.log('migration 3') } ];

Migration.migrations = migrationFunctions;

const App = () => { Migration.migrate(); 

return (

        <View>
            <Text>TEST</Text>
        </View>

    );

}

`
