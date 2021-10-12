/* Copyright 2021 Splunk, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License. */

import React from 'react';
import layout from '@splunk/react-page';
import DashboardCore, { themes as dashboardCoreThemes } from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import definition from './definition.json';
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import CustomTable from './tableViz';
import EnterpriseViewOnlyPreset from '@splunk/dashboard-presets/EnterpriseViewOnlyPreset'




const themeToVariant = {
    enterprise: { colorScheme: 'light', family: 'enterprise' },
    enterpriseDark: { colorScheme: 'dark', family: 'enterprise' },
    prisma: {colorScheme: 'dark', family: 'prisma' },
};
// use DashboardCore to render a simple dashboard

const customPreset = {
    ...EnterpriseViewOnlyPreset,
    visualizations:{
        ...EnterpriseViewOnlyPreset.visualizations,
        'splunk.CustomTable':CustomTable,
    }
} 


layout(
    <SplunkThemeProvider {...themeToVariant.prisma}>
        <DashboardContextProvider>
            <DashboardCore
                width="100%"
                height="100%"
                preset={customPreset}
                definition={definition}
            />
        </DashboardContextProvider>
    </SplunkThemeProvider>,

    {
        pageTitle: 'Table',
        hideFooter: true,
        layout: 'fixed',
    }
);
