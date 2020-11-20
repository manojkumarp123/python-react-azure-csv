import React, { useEffect, useState, useCallback } from "react";
import { SERVER_BASE_PATH } from "./constants";
import { evalResponce } from "./utils";
import DataGrid from "react-data-grid";
import "react-data-grid/dist/react-data-grid.css";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { AutoSizer } from "react-virtualized";
import Info from "./Info";
import Search from "./Search";
import { is_val_in_row, get_rows } from "./logic";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  titleBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 64,
    padding: 8,
  },
  actionItems: {
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "row-reverse",
    display: "flex",
    flex: 1,
  },
}));

function App() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState(null);
  const classes = useStyles();

  const callApi = useCallback((url, options = {}) => {
    options = Object.assign({}, options, {
      headers: { "Content-Type": "application/json" },
    });
    setIsLoading(true);
    setError(null);

    fetch(url, options)
      .then(evalResponce)
      .then((data) => {
        let columns = data.columns.map((name, idx) =>
          Object.assign(
            {
              key: name,
              name: name,
              editable: true,
              resizable: true,
            },
            idx === 0 ? { frozen: true } : { width: 250 }
          )
        );
        const deleteAction = {
          key: "Action",
          name: "",
          frozen: true,
          formatter: ({ rowIdx }) => {
            const handleDelete = (rowIdx) => {
              callApi(`${SERVER_BASE_PATH}/api/brocker-office/${rowIdx}`, {
                method: "DELETE",
              });
            };
            return (
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(rowIdx)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            );
          },
        };
        columns = [deleteAction].concat(columns);

        const rows = get_rows(data);

        setIsLoading(false);
        setColumns(columns);
        setRows(rows);
        setData(data);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e);
      });
  }, []);

  useEffect(() => {
    callApi(`${SERVER_BASE_PATH}/api/brocker-office`);
  }, [callApi]);

  const handleEdit = ({ action, fromRow, toRow, updated }) => {
    if (action === "CELL_UPDATE" && fromRow === toRow) {
      const row = data.columns.map((colName) => {
        return colName in updated ? updated[colName] : rows[fromRow][colName];
      });
      callApi(`${SERVER_BASE_PATH}/api/brocker-office/${fromRow}`, {
        method: "PUT",
        body: JSON.stringify(row),
      });
    }
  };

  // const handleAddNew = () => {
  //   callApi(`${SERVER_BASE_PATH}/api/brocker-office`, {
  //     method: "POST",
  //     body: JSON.stringify(Array(data.columns.length).fill("")),
  //   });
  // };

  const handleUpload = () => {
    callApi(`${SERVER_BASE_PATH}/api/brocker-office/azure`, {
      method: "PUT",
    });
  };

  const handleClear = () => {
    callApi(`${SERVER_BASE_PATH}/api/brocker-office/local`, {
      method: "DELETE",
    });
  };

  const actionItems = (
    <div className={classes.actionItems}>
      {/* <Button variant="contained" onClick={handleAddNew}>
        Add New Office
      </Button> */}
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Refresh
      </Button>
      <Info />
      <Search
        onSearch={(val) => {
          const initialRows = get_rows(data);
          const filteredRows = val
            ? initialRows.filter((row) => is_val_in_row(row, val))
            : initialRows;
          setRows(filteredRows);
        }}
        count={rows.length}
      />
    </div>
  );

  const header = (
    <div className={classes.titleBar}>
      <h1>Office Access</h1>
      {actionItems}
    </div>
  );

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div>
        <h1>Error</h1>
        <h2>{error.message}</h2>
      </div>
    );
  return (
    <div className={classes.root}>
      {header}
      <AutoSizer>
        {({ width, height }) => (
          <div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <DataGrid
              columns={columns}
              rows={rows}
              width={width - 16}
              height={height - 100}
              rowHeight={40}
              onRowsUpdate={handleEdit}
              emptyRowsRenderer={EmptyRowsRenderer}
            />
          </div>
        )}
      </AutoSizer>
    </div>
  );
}

function EmptyRowsRenderer() {
  return <div style={{ textAlign: "center" }}>Nothing to show</div>;
}

export default App;
