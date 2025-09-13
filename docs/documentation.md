# API Documentation

## Routes and Endpoints

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