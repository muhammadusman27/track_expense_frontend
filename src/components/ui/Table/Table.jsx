import "./table.css";
import { FaEdit } from "react-icons/fa";

const Table = ({ columns, data, edit_fun }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => {
            return <th key={col["key"]}>{col["label"]}</th>;
          })}
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {columns.map((col) => {
                return <td key={`col_${row.id}_${col.key}`}>{row[col.key]}</td>;
              })}
              <td>
                <FaEdit onClick={() => edit_fun(row)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
