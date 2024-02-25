import { useEffect } from 'react';
import { ListItem, columns } from "../columns"
import DataTable from '../data-table'

async function getData(): Promise<ListItem[]> {

    try {
        const response = await fetch("http://localhost:5001/todos");
        const jsonData = await response.json();
        console.log(response);
        return jsonData;

    } catch (err) {
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(err);
        console.log(message);
        return [];
    }
}

async function TodoBox() {

    const data = await getData();

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );

}

export default TodoBox;