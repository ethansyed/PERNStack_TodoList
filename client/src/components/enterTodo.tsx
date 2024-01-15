import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type props = {
    update: Function
}

export default function EnterTodo(properties: props) {

    const [description, setDescription] = useState("");
    const { toast } = useToast();

    const submitItem = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const body = { description }
            const response = await fetch("http://localhost:5001/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            toast({
                title: "Success! Item added to to-do list!",
                description: "Request Successful",
            })
            properties.update();
            console.log(response);
        } catch (err) {
            let message;
            if (err instanceof Error) message = err.message;
            else message = String(err);
            console.log(message);
        }
    }

    return (
        <form className='flex space-x-2 mt-8' onSubmit={submitItem}>
            <Input type="text" placeholder="Todo Item" onChange={e => setDescription(e.target.value)} />
            <Button type="submit">Add</Button>
        </form>
    )
}