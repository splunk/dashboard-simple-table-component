import React from 'react';

import layout from '@splunk/react-page';
import CustomTable from '@splunk/custom-table';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Hello, from inside TableDashboard!</StyledGreeting>
            <div>Your component will appear below.</div>
            <CustomTable name="from inside CustomTable" />
        </StyledContainer>
    </SplunkThemeProvider>
);
