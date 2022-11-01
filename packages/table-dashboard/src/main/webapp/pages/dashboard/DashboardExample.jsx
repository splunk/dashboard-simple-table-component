import React from 'react';

import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
// import EnterpriseViewOnlyPreset from '@splunk/dashboard-presets/EnterpriseViewOnlyPreset';
import Table from '@splunk/visualizations/Table';
import Markdown from '@splunk/visualizations/Markdown';
import Rectangle from '@splunk/visualizations/Rectangle';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import AbsoluteLayoutViewer from '@splunk/dashboard-layouts/AbsoluteLayoutViewer';
import CustomTable from '@splunk/custom-table';
import TestDataSource from '@splunk/datasources/TestDataSource';

// import CustomTable from '@splunk/my-react-component';
import definition from './definition.json';

const themeToVariant = {
    enterprise: { colorScheme: 'light', family: 'enterprise' },
    enterpriseDark: { colorScheme: 'dark', family: 'enterprise' },
    prisma: { colorScheme: 'dark', family: 'prisma' },
};

// use DashboardCore to render a simple dashboard
const customPreset = {
    layouts: {
        absolute: AbsoluteLayoutViewer,
    },
    visualizations: {
        'splunk.table': Table,
        'splunk.markdown': Markdown,
        'splunk.rectangle': Rectangle,
        'splunk.CustomTable': CustomTable,
    },
    dataSources: {
        'ds.test': TestDataSource,
    },
};
// NOTICE: If you are on Dashboard Core versions LOWER than 25.X.X, preset will be a prop for <DashboardCore> instead of
// <DashboardContextProvider>
const DashboardExample = () => {
    return (
        <SplunkThemeProvider {...themeToVariant.prisma}>
            <DashboardContextProvider>
                <DashboardCore
                    preset={customPreset}
                    width="100%"
                    height="100%"
                    definition={definition}
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;
