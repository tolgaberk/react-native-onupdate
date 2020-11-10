# Get migration like logic for your released App

Keep track of which functions have been called when releasing a new update!

# Installation

`yarn add react-native-onupdate @react-native-async-storage/async-storage`

## or

`npm i react-native-onupdate @react-native-async-storage/async-storage`

# Usage

```
import Migration from 'react-native-onupdate';

const migrationFunctions = [
    () => { console.log('migration 1') },
    () => { console.log('migration 2') },
    () => { console.log('migration 3') }
];

Migration.migrations = migrationFunctions;

const App = () => {
    Migration.migrate();

    return (
        <View>
            <Text>TEST</Text>
        </View>
    );
}
```

# API

| Property \| Method | DEFINITION | TYPE |
| --- | --- | --- |
| `migrations` | Migration functions to run | `Function[]` |
| `migrate()` | Runs the migrations which have been never called | `function()` |
| `DEBUG(true\|false)` | Enables logging | `function(debug:boolean):void` |
| `version` | Last runned migration functions index. It persists in `AsyncStorage`. | `number` |
| `AsyncStorageKey` | The key used for `AsyncStorage` | `string` |
