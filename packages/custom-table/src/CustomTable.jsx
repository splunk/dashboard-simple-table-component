import React, { Component } from 'react';
import { cloneDeep } from 'lodash';

import Table from '@splunk/react-ui/Table';
import Line from '@splunk/react-sparkline/Line';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
class AreaInTable extends Component {
    constructor(props, ...rest) {
        super(props, ...rest);

        this.state = {
            data: [
                { User: 'userA', tl: 10, logins: [1, 0, 0, 2, 3, 4, 0] },
                { User: 'userB', tl: 20, logins: [0, 4, 2, 5, 3, 6, 0] },
                { User: 'userC', tl: 30, logins: [5, 2, 5, 4, 6, 2, 6] },
                { User: 'userD', tl: 40, logins: [7, 5, 8, 6, 6, 8, 10] },
            ],
        };
    }

    handleRequestMoveRow = ({ fromIndex, toIndex }) => {
        this.setState((state) => {
            const data = cloneDeep(state.data);
            const rowToMove = data[fromIndex];

            const insertionIndex = toIndex < fromIndex ? toIndex : toIndex + 1;
            data.splice(insertionIndex, 0, rowToMove);

            const removalIndex = toIndex < fromIndex ? fromIndex + 1 : fromIndex;
            data.splice(removalIndex, 1);

            return { data };
        });
    };

    render() {
        const { data } = this.state;
        return (
            <div>
                <div>
                    <SplunkThemeProvider family="prisma" colorScheme="dark" density="comfortable">
                        <Table stripeRows onRequestMoveRow={this.handleRequestMoveRow}>
                            <Table.Head>
                                <Table.HeadCell>User</Table.HeadCell>
                                <Table.HeadCell>Total Logins</Table.HeadCell>
                                <Table.HeadCell>Logins Last Week</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {data.map((row) => (
                                    <Table.Row key={row.User}>
                                        <Table.Cell>{row.User}</Table.Cell>
                                        <Table.Cell>{row.tl}</Table.Cell>
                                        <Table.Cell>
                                            <Line
                                                data={row.logins}
                                                showTooltip={true}
                                                showEndDot={true}
                                                endDotCount={0}
                                                endDotRadius={3}
                                                endDotFillColor={'white'}
                                                endDotStroke={'black'}
                                                endDotStrokeWidth={2}
                                                fillColor={'#f7912c'}
                                                fillOpacity={`${0.2}`}
                                                height={50}
                                                isArea={true}
                                                cursorStroke={'#f7912c'}
                                                cursorStrokeWidth={3}
                                                cursorStrokeLinecap={'square'}
                                                cursorStrokeDasharray={'1,5'}
                                                lineColor={'#6cb8ca'}
                                                lineStrokeWidth={4}
                                                lineLength={10}
                                                width={240}
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
    }
}

export default AreaInTable;
