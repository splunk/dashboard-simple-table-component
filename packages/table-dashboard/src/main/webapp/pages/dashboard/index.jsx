import React from 'react';
import layout from '@splunk/react-page';
import DashboardExample from './DashboardExample';

layout(<DashboardExample />, {
    pageTitle: 'Table',
    hideFooter: true,
    layout: 'fixed',
});
