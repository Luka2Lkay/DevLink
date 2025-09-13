# API Documentation

## 1. Routes and Endpoints

### User

- `http://localhost:3000/api/users/signin`
- `http://localhost:3000/api/users/signup`
- `http://localhost:3000/api/users/delete-user/:id`
- `http://localhost:3000/api/users/delete-all-users`
- `http://localhost:3000/api/users/get-all-users`
- `http://localhost:3000/api/users/get-user/:id`

### Project

- `http://localhost:3000/api/projects/add-project`
- `http://localhost:3000/api/projects/delete-project/:id`
- `http://localhost:3000/api/projects/delete-all-projects`
- `http://localhost:3000/api/projects/get-project/:id`
- `http://localhost:3000/api/projects/get-all-projects`
- `http://localhost:3000/api/projects/update-project/:id`
- `http://localhost:3000/api/projects/projects-by-user/:id`
- `http://localhost:3000/api/projects/commits/:id`

### Invite

- `http://localhost:3000/api/invites/send-invite/:id`
- `http://localhost:3000/api/invites/delete-invite/:id`
- `http://localhost:3000/api/invites/delete-all-invites`
- `http://localhost:3000/api/invites/:id`
- `http://localhost:3000/api/invites/sent-invites`
- `http://localhost:3000/api/invites/received-invites`

## 2. Expected Inputs and Outputs

### User

`POST /api/users/signin`

- **Request Body:** A JSON object representing the registered user. The `email` and `password` fields are required.
- **Response (200 Ok):** Outputs a JWT token.

`POST /api/users/signup`

- **Request Body:** A JSON object representing the new user. The `name`, `email`, `password`, `confirmPassword`, and `githubUsername` are required.
- **Response (201 Created):** Outputs the message, `Registered sucessfully!`.

`DELETE /api/users/delete-user/{id}`

- **Request:** No body required.
- **Response (204 No Content):** Outputs the message, `The user is successfully deleted!`.

`DELETE /api/users/delete-all-users`

- **Request:** No body required.
- **Response (204 No Content):** Outputs the message, `Successfully deleted all users!`

`GET /api/users/get-all-users`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of users.

`GET /api/users/get-user/{id}`

- **Request:** No body required.
- **Response (200 Ok):** Ouputs the `user` JSON object.

### Project

`POST /api/projects/add-project`

- **Request Body:** A JSON object representing the new project. The `title`, `description`, `githubRepoUrl`, and `owner` fields are required.
- **Response (201 Created):** Outputs the message, `Project successfully created!` and the `project` JSON object.

`DELETE /api/projects/delete-project/{id}`

- **Request:** No body required.
- **Response (204 No Content):** Outputs the message, `Project successfully deleted!`.

`DELETE /api/projects/delete-all-projects`

**Request:** No body required.
**Response (204 No Content):** Outputs the message, `Successfully deleted all projects!`.

`GET /api/projects/get-project/{id}`

- **Request:** No body required.
- **Response (200 Ok):** Ouputs the `project` JSON object.

`GET /api/projects/get-all-projects`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of projects.

`PUT /api/projects/update-project/{id}`

- **Request Body:** A JSON object with the fields you want to update.
- **Response (204 Ok):** Outputs the message, `successfully updated!`.

`GET /api/projects/projects-by-user/{id}`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of the user projects.

`GET /api/projects/commits/{id}`

- **Request:** No body required.
- **Response (200 OK):** Outputs an array of project commits.

### Invite

`POST /api/invites/send-invite/{id}`

- **Request Body:** A JSON object representing the new invite. The `toUser` field is required.
- **Response (201 Created):** Outputs the message, `Invite sent!` and the new invite JSON object.

`DELETE /api/invites/delete-invite/{id}`

- **Request:** No body required.
- **Response (204 No Content):** Outputs the message, `Invite deleted!`.

`DELETE /api/invites/delete-all-invites`

- **Request:** No body required.
- **Response (204 No Content):** Outputs the message, `Successlly deleted all invites!`.

`PATCH /api/invites/:id`

- **Request:** No body required.
- **Response (200 Ok):** Outputs the message, `Responded to the invite!` and the invite JSON object. The `status` field is required.

`GET /api/invites/sent-invites`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of sent invites.

`GET /api/invites/received-invites`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of received invites.