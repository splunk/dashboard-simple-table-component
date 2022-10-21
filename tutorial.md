
# Getting Started with Dashboards: Adding a Component

# Introduction

Welcome to the Splunk Dashboard Framework guide! In this getting started series we will be going over **how to develop Splunk apps that leverage the Splunk Dashboard Framework**. With the Dashboard Framework you can use the latest tools offered by Splunk to create beautiful dashboards that capture and frame your data. The Dashboard Framework is used in many Splunk apps, such as Dashboard Studio in Splunk Enterprise. The framework provides an out-of-the-box experience for developers and dashboard authors. However, if you would like to expand on that functionality in your own app, this tutorial will teach you how to get started.

It is recommended (but not necessary) that before you try this tutorial, you check out the Splunk UI tutorials [Tutorial I: Component](https://splunkui.splunk.com/Create/ComponentTutorial) and [Tutorial II: Splunk App](https://splunkui.splunk.com/Create/AppTutorial), which will provide a thorough overview of how to use Splunk libraries in your own project. Much of the content related to initializing and setting up the app will be directly from those tutorials, and you will find more detailed information about how these packages work over there. Nevertheless, the intended audience for this tutorial are developers looking to get started with introducing Splunk Dashboards in their own Splunk Apps.

In this tutorial we will...

-   Create a Splunk App using the `splunk-create` app generator
-   Install dependencies for all necessary packages (will require some waiting while commands run)
-   Create a dashboard using out-of-the-box functionality from Splunk
-   Test our dashboard
-   Add a custom table utilizing Splunk UI and Splunk Visualization packages
-   View our table within our dashboard by creating a custom preset

## Prerequisites

-   node version 14.18.0
-   yarn version 1.2 or higher
-   A comprehensive code editor you are comfortable using
-   A local Splunk Enterprise Instance

The more experience one has with Javascript, React and JSX, the easier it is to understand the content, however this tutorial is not meant to cover the details regarding those development tools. If you would like to skip the tutorial and just interact with the final result of this tutorial, you can do so by cloning the project's [GitHub Repository](https://github.com/splunk/dashboardTutorial1).

## Setup and App Generation

If you have seen the Splunk UI Tutorials before, then you may be familiar with the `@splunk/create` package. This package initializes a project for a new Splunk app as well as a React component. The React component portion is what we will use to create our custom visualization, and the package automatically links the required dependencies between the component and the Splunk App. If you have already installed the package then you can skip this step.

To get started open a terminal in a directory where you feel comfortable creating this app in (for example, your desktop or user home directory). In that directory, we will create a new directory called `dashboardTutorial1` and execute the command to create our repository:

```bash
$ mkdir dashboardTutorial1
$ cd dashboardTutorial1
$ npx @splunk/create
```

You should see a selection menu with two options. Select the option that states `A monorepo with a React Splunk app with a React component`. Name the component `customTable`, the repository `dashboardTutorial1` and the app `tableDashboard`.

<img src="tutorial1/terminal.png" alt="Terminal Output From Running Command" style={{width: "100%", maxWidth: "1080px"}} />

For more details on the Splunk UI create package, see **Additional Reading**.

# Creating a Custom Dashboard

## Overview

Now let's jump into creating a custom dashboard. If you have interacted with the latest Splunk Dashboards before, you may have seen that one of the included visualizations is a table. With this table, you can visualize data and include a sparkline to see the data overtime. To start simple, this tutorial will have you create your own table with Splunk UI and include in that table a sparkline with custom options that are not available with the built-in table visualization, such as adjusting the height of the sparkline, the stroke width and more. We can see an interactive version of this capability in [Splunk UI documentation for sparklines](https://splunkui.splunk.com/Packages/react-sparkline/Line). Essentially, the code provided in the Splunk UI documentation is what we need, but we will be adjusting some of that within our dashboard.

The best way to do the rest of this tutorial is to use an a code editor of your choice. The screenshots in this tutorial will show the use of VSCode, which provides the ability to open terminals and view the file structure of your project.

## Dashboard Setup

The following set of steps will help you get accustomed to the file structure required in Splunk apps to create dashboards. Find the folder 1dashboardTutorial11 on your machine, which is where we created our repository. Drag and drop this folder into a new window of VSCode (or your equivalent code editor). You should be able to see the entire file structure and a workspace to edit files.

1.  Create a new folder in the `packages/table-dashboard/src/main/webapp/pages` directory

1.  Name the folder `dashboard`

1.  Create three new files in this folder, `definition.json`, `index.jsx` and `DashboardExample.jsx`

This folder is essentially our dashboard. Any components required that can be considered the "source" of the dashboard would exist in this folder.


Speaking of the dashboard, we provided a starter dashboard below that shows a regular Splunk table, a few charts and a rectangle place holder. The rectangle will then become our new table that we will create in this tutorial. Copy and paste the following `Starter Definition` into `definition.json` in your project. Splunk Dashboard Framework uses JSON as the way to define what is on the dashboard. The JSON is separated into a few main sections, which include **visualizations, datasources, defaults, inputs and layouts**. This allows dashboard authors to define dashboard objects by type, and have different objects work together, in some cases have one object like a datasource apply to multiple charts. This is contrary to Classic Dashboards in Splunk, which used XML that defined each row of the dashboard and the panels in that row as separate objects. This notion of contained panels being their own element of information presented to the user is less emphasized in the new dashboard framework. Now, dashboards are treated more holistically, with more flexibility of how components work with each other.

#### definition.json

```json
{
    "visualizations": {
        "viz_HTax1jMU": {
            "type": "splunk.table",
            "dataSources": {
                "primary": "ds_test"
            },
            "title": "Default Table from Splunk Visualizations",
            "description": "Static Data for User Logins"
        },
        "viz_GdqnufJw": {
            "type": "splunk.rectangle",
            "options": {
            }
        },
        "viz_QOgtt0Bp": {
            "type": "splunk.markdown",
            "options": {
                "markdown": "## Adding Custom Components to Dashboards "
            }
        },
        "viz_aZS6Z1Gu": {
            "type": "splunk.markdown",
            "options": {
                "markdown": "This dashboard displays both a regular Splunk Table Visualization on the left, and a table made by using a custom Splunk UI component on the right added to the dashboard by making a custom visualization."
            }
        },
        "viz_6hGmfpvq": {
            "type": "splunk.markdown",
            "options": {
                "markdown": "**Custom visualization using Splunk UI and Visualizations Library**\n\nStatic Data for User Logins\n\n"
            }
        }
    },
    "dataSources": {
        "ds_test": {
            "type": "ds.test",
            "options": {
                "data": {
                    "fields": [
                        {
                            "name": "User"
                        },
                        {
                            "name": "Total Logins"
                        },
                        {
                            "name": "Logins Last Week"
                        }
                    ],
                    "columns": [
                        [
                            "userA",
                            "userB",
                            "userC",
                            "userD"
                        ],
                        [
                            "10",
                            "20",
                            "30",
                            "40"
                        ],
                        [
                            [
                                "##__SPARKLINE__##",
                                "1",
                                "0",
                                "0",
                                "2",
                                "3",
                                "4",
                                "0"
                            ],
                            [
                                "##__SPARKLINE__##",
                                "0",
                                "4",
                                "2",
                                "5",
                                "3",
                                "6",
                                "0"
                            ],
                            [
                                "##__SPARKLINE__##",
                                "5",
                                "2",
                                "5",
                                "4",
                                "6",
                                "2",
                                "6"
                            ],
                            [
                                "##__SPARKLINE__##",
                                "7",
                                "5",
                                "8",
                                "6",
                                "6",
                                "8",
                                "10"
                            ]
                        ]
                    ]
                }
            }
        }
    },
    "defaults": {},
    "inputs": {},
    "layout": {
        "type": "absolute",
        "options": {
            "display": "auto-scale",
            "width": 1440,
            "height": 1024,
            "backgroundColor": "#000000"
        },
        "structure": [
            {
                "item": "viz_HTax1jMU",
                "type": "block",
                "position": {
                    "x": 30,
                    "y": 140,
                    "w": 630,
                    "h": 330
                }
            },
            {
                "item": "viz_GdqnufJw",
                "type": "block",
                "position": {
                    "x": 720,
                    "y": 190,
                    "w": 630,
                    "h": 270
                }
            },
            {
                "item": "viz_QOgtt0Bp",
                "type": "block",
                "position": {
                    "x": 20,
                    "y": 0,
                    "w": 630,
                    "h": 90
                }
            },
            {
                "item": "viz_aZS6Z1Gu",
                "type": "block",
                "position": {
                    "x": 20,
                    "y": 70,
                    "w": 1380,
                    "h": 40
                }
            },
            {
                "item": "viz_6hGmfpvq",
                "type": "block",
                "position": {
                    "x": 720,
                    "y": 120,
                    "w": 1380,
                    "h": 70
                }
            }
        ],
        "globalInputs": []
    },
    "description": "",
    "title": "Custom Components Dashboard"
}


```

The last piece of the actual dashboard is to write the JavaScript that will actually "show" our dashboard. This is done in a JSX file. The [JSX extension](https://reactjs.org/docs/introducing-jsx.html) is used with React, which allows developers to describe how a UI should look by using JavaScript. In our JSX file, there are a few key components that are essential to dashboards: **Dashboard Core, Dashboard Context and Dashboard Preset**. Dashboard Core is the base level package that renders a dashboard provided in a JSON definition. Without Dashboard Core, our dashboard will not render at all. Dashboard Context is a package that contains a set of additional components that will assist in rendering our dashboard. Dashboard Preset describes the set of dashboard components that we want to use in our particular dashboard, such as the visualizations and inputs. Though you may initially start with a built-in preset, such as the **EnterpriseViewOnlyPreset**, this tutorial will also show how to adjust a preset to contain custom components. In this starter code for `DashboardExample.jsx`, we use these packages to create our dashboard in the layout section. We provide dashboard core with the props it requires, which includes the definition of our dashboard and the preset we want to use. This is then wrapped in both Dashboard Context and Splunk Theme providers. More information on how these components work together can be found in our documentation in the **Additional Reading** section.

#### DashboardExample.jsx

```jsx
import React from 'react';

import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterpriseViewOnlyPreset from '@splunk/dashboard-presets/EnterpriseViewOnlyPreset';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';
import definition from './definition.json';

const themeToVariant = {
    enterprise: { colorScheme: 'light', family: 'enterprise' },
    enterpriseDark: { colorScheme: 'dark', family: 'enterprise' },
    prisma: { colorScheme: 'dark', family: 'prisma' },
};

// use DashboardCore to render a simple dashboard
// NOTICE: If you are on Dashboard Core versions LOWER than 25.X.X, preset will be a prop for <DashboardCore> instead of 
// <DashboardContextProvider>

const DashboardExample = () => {
    return (
        <SplunkThemeProvider {...themeToVariant.prisma}>
            <DashboardContextProvider preset={EnterpriseViewOnlyPreset}>
                <DashboardCore
                    width="100%"
                    height="100%"
                    definition={definition}
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;

```

Although we make our dashboard in `DashboardExample.jsx`, the file necessary to actually make it function properly is `index.jsx`. It can be considered a recommended best practice to isolate working components when developing the dashboard. Even though we developed in `DashboardExample.jsx` we can reference it within `index.jsx` so that the dashboard can render what we developed. This can be done by simply adding the following code to `index.jsx`.

#### index.jsx

```jsx
import React from 'react';
import layout from '@splunk/react-page';
import DashboardExample from './DashboardExample';

layout(<DashboardExample />, {
    pageTitle: 'Table',
    hideFooter: true,
    layout: 'fixed',
});

```

Since we created a new folder meant for a new dashboard page, we have to make sure our app can navigate to it. If the previous set of steps can be considered "creating" the dashboard, this next set of steps will handle "viewing" the dashboard.

1.  Create a new page in `src/main/resources/splunk/default/data/ui/views`

1.  For this project, you can duplicate the `start.xml` view that is already provided and rename the file to `dashboard.xml`

1.  Replace the word "Start" with "Table Dashboard" in the XML file itself, between the `<label>` tags (It is important to note that the name of the xml view must be the same as the name of the folder you created in the previous set of steps)

1.  Go to `src/main/resources/splunk/default/data/ui/nav/default.xml` in the nav folder

1.  Once that is done you can add the following to the default.xml file, under the start view: `<view name="dashboard"/>`


## Test Run

Now that we have the code in place, let's do a test run before we dive into the "custom" portion of this tutorial. Open a new terminal window in VSCode (or use a regular terminal window). We will run a set of commands that will install new dependencies for dashboard related packages, install dependencies that are generated from the splunk-create package and build our project.

```bash
$ cd dashboardTutorial1/packages/table-dashboard # (if not in the app root already)
$ yarn add @splunk/dashboard-core @splunk/dashboard-presets @splunk/dashboard-context @splunk/visualization-context
$ cd ../.. # going back to project root
$ yarn install #to install all other dependencies
$ yarn run build
```

This will make sure that all our dependencies are installed and that our React component and Splunk app can work together. Next we must symlink our output directory to our Splunk application directory, so that our local Splunk instance can load this app. Note that this above requires `$SPLUNK_HOME` to be set to the installation directory of the local Splunk installation you want to use. If this is **not done already**, then for a local, non-production instance, this can easily be done by running:

```bash
$ export SPLUNK_HOME=<your_directory>
```

Note that for most users, the local Splunk instance will be located in `/Applications/Splunk`. To get everything linked:

```bash
$ cd packages/table-dashboard
$ yarn run link:app
```

Now let's compile the app in watch mode:

```bash
$ yarn run start
```

If your Splunk instance is already running, you will have to restart it to pick up the new app view. Once it is restarted, you should be able to access the new app from the Splunk Enterprise Web interface. Assuming that the Splunk instance is listening on the default port, you should be able to see it at [http://localhost:8000/en-US/app/table-dashboard/dashboard](http://localhost:8000/en-US/app/table-dashboard/dashboard). This page should look familiar, everything should be the same as a regular Splunk Enterprise experience but you should be seeing the starter definition of the dashboard that is provided in the tutorial. If everything looks good we can move on.

### Common Issues

-   "Nothing works, not even the app is appearing in my application menu"
    -   Double check that you symlinked the application directory correctly, you can check in `package.json` of the app directory whether or not the application directory shows up correctly, under the `scripts` object, look for `link:app`
-   "I can see the app, but nothing loads"
    -   Check to see that you saved all your files after inserting the provided code
-   Error 404, page not found
    -   Check to see that you correctly created your view in the `src/main/resources/splunk/default/data/ui` directory. Remember you need to both create the view itself and then add the view in the `default.xml` file.


## Adding a Custom Component

Up to now, everything we have done has been out-of-the-box dashboard functionality, because everything in our definition thus far is what is normally included in our `EnterpriseViewOnlyPreset`. Let's add something that doesn't come in this preset or any provided preset for that matter, which is a completely custom table that we are going to design. In our final dashboard it will be easy to see the difference in what we made with what is provided in the preset by default.

### Adding the Component Code

If you remember, the `splunk-create` package created two things for us, a React component and a Splunk app. The setup we did has also very conveniently set up our app such that the dependencies of the React component are included in the app. We can now adjust the already generated component by replacing the code that is in the component's JSX file by default.

1.  Navigate to `dashboardTutorial1/packages/custom-table/src/CustomTable.jsx`

1.  Replace the existing code in the file with the following:

#### CustomTable.jsx

```jsx
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

```

Let's look in the code a little bit, here are some important things to point out:

-   We start by importing both the `Table` and `Line` component from the Splunk React UI library. Both of these are default components that come with their own level of customization, which we then utilize in this code
-   The function `handleRequestMoveRow` allows us to drag and swap rows, a functionality not included in regular dashboard tables
-   The `return()` method returns a table that is wrapped in the `SplunkThemeProvider`, this allows us to control the theme of this component independent of the theme of the dashboard.
-   The data used in this table comes from the same datasource that is already in our dashboard, marked as `primary`
-   In the third `Table.cell` tag, we use the `Line` component. We pull the line components parameters from the dashboard definition shown later
-   Lastly, we make sure that our component extends the base `propTypes` and `defaultProps` from the SplunkVisualization base component.

### Adding the Custom Visualization in our Dashboard

The last step needed is to make sure our dashboard can use this new custom visualization.

-   Firstly, go to the dashboard `definition.json` and replace our placeholder rectangle with our custom visualization, as shown in the following code snippet. Feel free to adjust any of these options to your liking.

#### definition.json (final)

```json
...
"viz_GdqnufJw": {
    "type": "splunk.CustomTable",
    "options": {
        "showTooltip": true,
        "showEndDot": true,
        "endDotCount": 0,
        "endDotRadius": 3,
        "endDotFillColor": "white",
        "endDotStroke": "black",
        "endDotStrokeWidth": 2,
        "fillColor": "#f7912c",
        "fillOpacity": "0.2",
        "height": 50,
        "isArea": true,
        "cursorStroke": "#f7912c",
        "cursorStrokeWidth": 3,
        "cursorStrokeLinecap": "square",
        "cursorStrokeDasharray": "1,5",
        "lineColor": "#6cb8ca",
        "lineStrokeWidth": 4,
        "lineLength": 10,
        "width": 240
    },
    "dataSources": {
        "primary": "ds_test"
    }
}
...
```

Our definition now includes our new visualization! It should work now right? Not exactly. Remember that for our dashboard definition to work properly with this new visualization, we need to include it in the dashboard **preset**. Since we are now using something not out-of-the-box, we need to define a new preset and add the visualization to this preset, and then make sure **dashboard core** renders this new preset. All what was described is reflected with the following code change to the dashboard's `DashboardExample.jsx` file.

Replace the existing code in `DashboardExample.jsx` with the code in the following snippet `DashboardExample.jsx` (**final**)

#### DashboardExample.jsx (final)

```jsx
import React from 'react';

import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import EnterpriseViewOnlyPreset from '@splunk/dashboard-presets/EnterpriseViewOnlyPreset';
import SplunkThemeProvider from '@splunk/themes/SplunkThemeProvider';

import CustomTable from '@splunk/custom-table';
import definition from './definition.json';

const themeToVariant = {
    enterprise: { colorScheme: 'light', family: 'enterprise' },
    enterpriseDark: { colorScheme: 'dark', family: 'enterprise' },
    prisma: { colorScheme: 'dark', family: 'prisma' },
};

// use DashboardCore to render a simple dashboard
const customPreset = {
    ...EnterpriseViewOnlyPreset,
    visualizations: {
        ...EnterpriseViewOnlyPreset.visualizations,
        'splunk.CustomTable': CustomTable,
    },
};
// NOTICE: If you are on Dashboard Core versions LOWER than 25.X.X, preset will be a prop for <DashboardCore> instead of 
// <DashboardContextProvider>
const DashboardExample = () => {
    return (
        <SplunkThemeProvider {...themeToVariant.prisma}>
            <DashboardContextProvider preset={customPreset}>
                <DashboardCore
                    width="100%"
                    height="100%"
                    definition={definition}
                />
            </DashboardContextProvider>
        </SplunkThemeProvider>
    );
};

export default DashboardExample;

```
Once you replace the code (make sure you read the comments!), we should be good to go. Navigate to `dashboardTutorial1` in your terminal, then run:

```bash
$ yarn run build
$ cd packages
$ yarn run start
```

Then restart the Splunk Instance, and you should see the dashboard load as expected, you may need to do a hard refresh on your browser window (cmd+shift+R for Mac).

Notice that before we did the commands in the application directory, but now we are doing so in the package directory, because we need to build and start both the application _and_ the React component.

### Common Issues

-   "I still see a rectangle instead of the table"
    -   Double check that you changed and saved the change to the definition and did a hard refresh.
-   "I get an undefined error where the table should be" - Check to see that you are using the `customPreset` and not the original `EnterpriseViewOnlyPreset`
-   Double check that the syntax matches in the definition of the `customPreset` and in the `definition.json` file. For example, having `splunk.CustomTable` in the preset but `splunk.customTable` in the definition would result in error.

## Review

Congratulations! You now have a Splunk App which contains a dashboard that has a custom component.

To recap what we did in this tutorial...

-   Used the `@splunk/create` package to generate an app containing a React component and Splunk app
-   Installed and added all packages required to render and customize our dashboard
-   Used a JSON definition and React file to create a dashboard
-   Linked our app to a local Splunk instance to view in Splunk Enterprise
-   Created a custom table with Splunk UI as a custom visualization
-   Added the custom visualization as part of a custom preset as well as our dashboard JSON
-   Ran our dashboard with our custom, interactive table!
-   If you want to continue learning about custom capabilities with Splunk Dashboards, check out Tutorial 2 and then Tutorial 3, where we show how to expand on what we covered here to bigger use cases including click events and 3rd party components.

## Additional Reading

[Splunk UI Create Package](https://splunkui.splunk.com/Packages/create/Overview)

[Splunk Dashboard Packages](https://splunkui.splunk.com/Packages/dashboard-docs-public/?path=%2FIntroduction)
