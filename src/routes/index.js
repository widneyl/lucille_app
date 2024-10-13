import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import TabRoutes from './tab.routes'
import AllRoutes from './tab.routes';

export default function Routes(){
    return(
        <NavigationContainer>
            {/* mudei pra allRoutes, assim as navegações por stack também estarão habilitadas */}
            <AllRoutes/>
        </NavigationContainer>
    )
}