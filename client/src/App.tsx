import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import './App.css'

// export default App
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"


// my custom components
import TodoBox from './components/todoBox'
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
    const _body = await getData();
    setBody(_body)
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
        <DataTable columns={columns} data={body}></DataTable>
        <Toaster />
      </div>
    </div>
  )
}

