import { useState, useCallback } from 'react';
import axios from 'axios';

interface Props {
  resource: string;
  datatable_route_name: string;
  id_name?: string;
}

export type useDatatableReturnType = {
  rows: any[];
  loading: boolean;
  getRows: (params?: Record<string, any>) => void;
  updateSingleRow: (row_id: number) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRows: React.Dispatch<React.SetStateAction<any>>;
};

export default function useDatatable({ resource, datatable_route_name, id_name = 'id' }: Props): useDatatableReturnType {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getRows = useCallback((params = {}) => {
    setLoading(true);
    setRows([]);

    axios
      .get(datatable_route_name, { params: { ...params } })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateSingleRow = useCallback((row_id: number | string) => {
    setRows((old_rows): Record<string, any>[] => {
      const existing_index = old_rows.findIndex((row) => row[id_name] === row_id);
      if (existing_index === -1) return old_rows;

      const filtered_rows = old_rows.filter((row) => row[id_name] !== row_id);

      axios
        .get(`${resource}/view/${row_id}`)
        .then((response) => {
          if (!response.data) {
            setRows(
              filtered_rows.map((row, index) => ({
                ...row,
                id: index + 1,
              }))
            );
          } else {
            const updated_row = {
              ...response.data,
              id: old_rows[existing_index].id,
            };
            const new_rows = [...filtered_rows];
            new_rows.splice(existing_index, 0, updated_row);
            setRows(new_rows);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      return filtered_rows.map((row, index) => ({
        ...row,
        id: index + 1,
      }));
    });
  }, [resource, id_name]);

  return {
    rows,
    loading,
    getRows,
    updateSingleRow,
    setLoading,
    setRows,
  };
}
