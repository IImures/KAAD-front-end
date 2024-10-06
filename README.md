# KancelariaAdwokacka

This is a project created for a Law Firm, made in order to help the firm advertise their services, publish posts, and easily manage client requests.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Configuration](#configuration)

## Features

Blog Posting: Client can write and publish posts to share legal insights and updates.
Client Management: A system for handling and organizing client and requests.
Advertising: Display the firm’s services to attract potential clients.
Role-Based Authentication: Access based on user roles (Admin, Lawyer, Writer).

## Technology Stack
### Frontend
- Framework: Angular
  - Languages: TypeScript, HTML, CSS
- Libraries:
  - RxJS for reactive data handling
  - Angular Router for page navigation
### Backend 
  Backend is located in separate repository: [KAAD-backend](https://github.com/IImures/KAAD-back-end)

## Installation
  1. **Clone Repository**:
     ```sh
       git clone https://github.com/IImures/KAAD-front-end.git
       cd KAAD-front-end
     ```
  2. **Install dependencies**
      ```sh
        npm install
      ```
  3. **Start Angular server**
      ```sh
        ng serve
      ```
## Configuration
You can configure different environment variables that will change depending on project state(production or not) in `src/environments` folder
