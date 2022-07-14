# MERN STACK

# for run locally this project you may run

npm i


# This will install all dependencies related on the project,

# afterwards, go to your [localhost:3001] 


After installed dependencies as indicated in README.md, execute with NPM START script. When mounting the app, just head to localhost:3001 and task list will appear.
You can simply add, edit, remove or edit tasks on list.
All passwords saved into database are encripted with bcrypt.


On Browser
__________________
http://localhost:3001/api/task
retrieves the all tasks list in JSON format.

http://localhost:3001/post?title=(taskTitle)
for searching by exact match on task title. Case sensitive.

http://localhost:3001/api/task/:id 
will retrieve the task under the mentioned ID on the JSON file.
______________________


For POSTMAN
http://localhost:3001/api/login - 
Delete task - if we don't provide token on header and try http://localhost:3001/api/tasks will throw a 403 error because we did not provided any authorized token on header for that operation. For getting the token, 1st  we must go into localhost://localhost:3001/api/login and get the Token. After that, we can set the header with the provided token by JWT and use DELETE method on Postman. 

to add a new user, go in http://localhost:3001/api/register and insert the username, email, password and roles. If role is not defined, will auto-asign as a user profile by default.
____________________



API Schemas:

Task Schemas
title: { type: String, required: true },
  description: { type: String, required: true }

All fields are required for post a task, otherwise you will receive an error message.

New Users Schemas

As i mentioned before, all fields are required but the role, that will be setted by default as user unless you declare it as ADMIN or MODERATOR. Neither username or email can be used in two different users.
    Fields are Username, email, password. All of these are required. Role, in case not declared will be user by default.





