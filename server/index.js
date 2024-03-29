import express from "express";
import cors from "cors";
import compression from 'compression'
import pool from "./db.js";

const app = express();

//middleware
app.use(cors());
app.use(compression());
//req.body
app.use(express.json());

//Routes//

// Main application

// Create todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body
        const todo = await pool.query("INSERT INTO todo (description) VALUES($1)", [description]);
        res.json(todo);

    } catch (err) {
        console.error(err.message);
    }
})


// Get ALL todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Get single todo
app.get("/todos/:id", async (req, res) => {
    try {
        //Should probably check id type here
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json(updateTodo);
    } catch (err) {
        console.error(err.message);
    }
})

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1", [id]);
        res.json("id " + id + " was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

// Delete multiple todos
app.delete("/todos", async (req, res) => {
    try {
        const { ids } = req.body;
        ids.forEach(async id => {
            const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id =$1", [id]);
        });
        res.json("ids " + ids + " were deleted")
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5001, () => {
    console.log("server start on https://localhost:5001");
})