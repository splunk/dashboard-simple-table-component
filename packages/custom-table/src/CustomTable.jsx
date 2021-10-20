import React, { useState, useEffect, useCallback } from 'react';
import Table from '@splunk/react-ui/Table';
import Line from '@splunk/react-sparkline/Line';
import SplunkVisualization from '@splunk/visualizations/common/SplunkVisualization';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import { cloneDeep } from 'lodash';

// Convert sparkline data from the datasource a format usable by the @splunk/react-sparkline component
const formatSparklineData = (data) => {
    return data.slice(1).map((val) => parseInt(val, 10));
};

// Extract data from the datasource a format usable by the table
const formatData = (dataSources) => {
    if (!dataSources.primary.data) {
        return {
            fields: [],
            data: [],
        };
    }

    // Get the names of the fields
    const fields = dataSources.primary.data.fields.map((f) => f.name);
    const data = [];

    // Convert the data from column to row form
    dataSources.primary.data.columns.forEach((col, i) => {
        col.forEach((item, j) => {
            if (!data[j]) {
                data.push({});
            }
            data[j][fields[i].replace(/\s/g, '')] =
                fields[i] === 'Logins Last Week'
                    ? formatSparklineData(item)
                    : item;
        });
    });

    return { fields, data };
};

const CustomTable = ({ options, dataSources }) => {
    const [tableData, setTableData] = useState(formatData(dataSources));

    useEffect(() => {
        setTableData(formatData(dataSources));
    }, [dataSources]);

    const handleRequestMoveRow = useCallback(
        ({ fromIndex, toIndex }) => {
            if (!tableData) {
                return;
            }
            const data = cloneDeep(tableData.data);
            const rowToMove = data[fromIndex];

            const insertionIndex = toIndex < fromIndex ? toIndex : toIndex + 1;
            data.splice(insertionIndex, 0, rowToMove);

            const removalIndex =
                toIndex < fromIndex ? fromIndex + 1 : fromIndex;
            data.splice(removalIndex, 1);

            setTableData({
                fields: tableData.fields,
                data,
            });
        },
        [tableData]
    );

    return (
        <div>
            <div>
                <SplunkThemeProvider
                    family="prisma"
                    colorScheme="dark"
                    density="comfortable"
                >
                    <Table onRequestMoveRow={handleRequestMoveRow}>
                        <Table.Head>
                            {tableData.fields.map((field) => (
                                <Table.HeadCell key={field}>
                                    {field}
                                </Table.HeadCell>
                            ))}
                        </Table.Head>
                        <Table.Body>
                            {tableData.data.map((row) => (
                                <Table.Row key={row.User}>
                                    <Table.Cell>{row.User}</Table.Cell>
                                    <Table.Cell>{row.TotalLogins}</Table.Cell>
                                    <Table.Cell>
                                        <Line
                                            data={row.LoginsLastWeek}
                                            {...options}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </SplunkThemeProvider>
            </div>
        </div>
    );
};

CustomTable.config = {
    dataContract: {},
    optionsSchema: {},
    key: 'splunk.CustomTable',
    name: 'CustomTable',
};

CustomTable.propTypes = {
    ...SplunkVisualization.propTypes,
};

CustomTable.defaultProps = {
    ...SplunkVisualization.defaultProps,
};

export default CustomTable;
