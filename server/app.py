import json
from flask import Flask, request, jsonify
import mysql.connector as cont
import random
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

con = cont.connect(host="localhost", user="root", password="Archit@123")
cur = con.cursor()
cur.execute("use todoapp")
con.commit()

@app.route("/")
def home():
    return "Hey there!"

@app.route("/todo", methods=["POST"])
def todo():
    try:
        data = request.data.decode("utf-8")
        task_data = json.loads(data)
        todo = task_data.get("todo")

        cur.execute("INSERT INTO todo (task) VALUES (%s)", (todo,))
        con.commit()

        cur.execute("SELECT id, task FROM todo")
        todos = cur.fetchall()
        taskList = [{"id": task[0], "task": task[1]} for task in todos]

        return jsonify(taskList)
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/delete",methods=["POST"])
def deletetodo():
    try:
        cur.execute("truncate table todo")
        con.commit()
        cur.execute("SELECT task FROM todo")
        todos = cur.fetchall()
        taskList = [task[0] for task in todos]

        return jsonify(taskList)
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route("/delete/todo/<int:todo_id>", methods=["DELETE"])
def delete_single_todo(todo_id):
    try:
        cur.execute("DELETE FROM todo WHERE id = %s", (todo_id,))
        con.commit()

        cur.execute("SELECT id, task FROM todo")
        todos = cur.fetchall()
        taskList = [{"id": task[0], "task": task[1]} for task in todos]

        return jsonify(taskList)
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=8080)
