import { useEffect, useState } from 'react';
import './App.css'

// export default App
import { Toaster } from "@/components/ui/toaster"


// my custom components
import DataTable from './data-table'
import { ListItem, columns } from './columns'
import EnterTodo from './components/enterTodo';

//get all todo items

async function getData(): Promise<ListItem[]> {

  try {
    const response = await fetch("http://localhost:5001/todos");
    const jsonData = await response.json();
    return jsonData;

  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);
    console.log(message);
    return [];
  }
}


export default function App() {
  const [body, setBody] = useState([{}])

  const update = async () => {
    setBody(await getData());
  }

  useEffect(() => {
    (async () => {
      update();
    })()
  }, [])


  return (
    <div className='p-4'>
      <div className="w-full max-w-sm items-center mx-auto my-2 text-center space-y-2">
        <h1 className='text-xl'><b>To-do List</b></h1>
        <EnterTodo update={update}></EnterTodo>
        <DataTable columns={columns} data={body} update={update}></DataTable>
        <Toaster />
      </div>
    </div>
  )
}

