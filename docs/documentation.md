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
- **Response (204 No Content):** No output.

`DELETE /api/users/delete-all-users`

- **Request:** No body required.
- **Response (204 No Content):** No output.

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
- **Response (204 No Content):** No output.

`DELETE /api/projects/delete-all-projects`

**Request:** No body required.
**Response (204 No Content):** No output.

`GET /api/projects/get-project/{id}`

- **Request:** No body required.
- **Response (200 Ok):** Ouputs the `project` JSON object.

`GET /api/projects/get-all-projects`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of projects.

`PUT /api/projects/update-project/{id}`

- **Request Body:** A JSON object with the fields you want to update.
- **Response (204 Ok):** No output.

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
- **Response (204 No Content):** No output.

`DELETE /api/invites/delete-all-invites`

- **Request:** No body required.
- **Response (204 No Content):** No output.

`PATCH /api/invites/:id`

- **Request:** No body required.
- **Response (200 Ok):** Outputs the message, `Responded to the invite!` and the invite JSON object. The `status` field is required.

`GET /api/invites/sent-invites`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of sent invites.

`GET /api/invites/received-invites`

- **Request:** No body required.
- **Response (200 Ok):** Outputs an array of received invites.

## 3. Required Headers

All authenticated routes require a valid JSON Web Token (JWT) in the `Authorization` header.

- **Header Name:** `Authorization`.
- **Value Format:** `Bearer <your-jwt-token>`.

## 4. Common Error Messages

### User

- **Response (400 Bad Request):** `Passwords don't match`.
- **Response (404 Not Found):** `User not found!`.
- **Response (401 Unauthorized):** `Incorrect password!`.

### Project

- **Response (404 Not Found):** `Project not found!`.
- **Response (401 Unauthorized):** `You are not authorised to delete this project!`.
- **Response (401 Unauthorized):** `You are not authorised to edit this project!`.
- **Response (404 Not Found):** `User not found.`.
- **Response (403 Forbidden):** `Repository is private. Commits cannot be fetched.`.

### Invite

- **Response (404 Not Found):** `Project not found!`.
- **Response (401 Unauthorized):** `You don't own this project.`.
- **Response (404 Not Found):** `User to invite not found!`.
- **Response (400 Bad Request):** `The user owns the project or is already a collaborator!`.
- **Response (409 Conflict):** `Invite for this user already sent!`.
- **Response (404 Not Found):** `Invite not found!`.
- **Response (401 Unauthorized):** `Not authorised to respond to this invite!`.
- **Response (400 Bad Request):** `Invalid status. Status must be 'accepted' or 'rejected'`.
- **Response (404 Not Found):** `The project associated with this invite is not found!`.
