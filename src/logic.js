export function is_val_in_row(row, val) {
  for (let cellVal of Object.values(row))
    if (cellVal && cellVal.toString().toLowerCase().indexOf(val) > -1)
      return true;
  return false;
}

export function transform_data_to_rows(columns) {
  return (row) =>
    row.reduce((acc, val, idx) => {
      acc[columns[idx]] = val;
      return acc;
    }, {});
}

export function get_rows(data) {
  return data.data.map(transform_data_to_rows(data.columns));
}
