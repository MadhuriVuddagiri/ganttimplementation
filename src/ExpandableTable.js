import React, { useState } from "react";
import {
  createTable,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import data from "./projectsheet.json";

const table = createTable();
const defaultData = [...data.slice(0, 5)];
const defaultColumns = [
  
      table.createDataColumn("ScheduleHealth", {
        id: "Schedule Health",
        header: (props) => (
          <>
            <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
              {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
            </button>
            Schedule Health
          </>
        ),

        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              // backgroundColor: COLORS[row.depth],
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            {row.getCanExpand() ? (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? "👇" : "👉"}
              </button>
            ) : (
              "🔵"
            )}{" "}
            {getValue()}
          </div>
        ),
      }),
      table.createDataColumn("TaskName", {
        id: "Task Name",
      }),
      table.createDataColumn("Status", {
        id: "Status",
      }),

  table.createDataColumn("AssignedTo", {
    id: "Assigned To",
  }),
 
      table.createDataColumn("StartDate", {
        id: "Start Date",
      }),
      table.createDataColumn("End Date", {
        id: "End Date",
      }),
      table.createDataColumn("% Complete", {
        id: "% Complete",
      }),
      table.createDataColumn("Duration", {
        id: "Duration",
     }),
      table.createDataColumn("Predecessors", {
        id: "Predecessors",
      }),
      table.createDataColumn("Target Start Date", {
        id: "Target Start Date",
      }),
      table.createDataColumn("Target End Date", {
        id: "Target End Date",
       // cell: (props) => new Date(props.getValue()).toDateString(),
      }),
      table.createDataColumn("Schedule Delta (%)", {
        id: "Schedule Delta (%)",
      }),
      table.createDataColumn("Schedule Delta (Working Days)", {
        id: "Schedule Delta (Working Days)",
      }),
    ];
  

const ExpandableTable = (subrows) => {
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([...defaultColumns]);
  const [expanded, setExpanded] = useState({});
  const instance = useReactTable(table, {
    data,
    columns,
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => subrows.get(row.id),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  console.log(instance.getRowModel());
  return (
    <div>
      <table border={1}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`depth-${row.depth}`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default ExpandableTable;
