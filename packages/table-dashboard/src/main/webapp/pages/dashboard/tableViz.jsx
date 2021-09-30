import React from 'react'
//import BaseVisualization from '@splunk/dashboard-visualizations/common/BaseVisualization'
import AreaInTable from '@splunk/custom-table'
import SplunkVisualization from '@splunk/visualizations/common/SplunkVisualization'

const CustomTable = ({dataSource,width,height,background='transparent',title,description,options})=>
{
    return(<AreaInTable/>);
};

CustomTable.propTypes ={
    ...SplunkVisualization.propTypes,
};

CustomTable.defaultProps ={
    ...SplunkVisualization.defaultProps,
};

export default CustomTable;