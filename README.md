# Holidaze Project

## Project Overview

Holidaze is a modern front-end web application designed for vacation booking. Users can browse venues, check availability, and make bookings, while venue managers can easily manage their listings.

## Product Showcase

![Holidaze UI](https://github.com/user-attachments/assets/4b4bbe1a-c03b-4746-8934-ead1ae4d41b3)

This image gives a glimpse into the Holidaze vacation booking app's user interface, featuring a modern, clean, and mobile-first design. The application leverages Tailwind CSS for responsiveness and intuitive layouts, providing an optimal booking experience on all devices.

## Features

### User Features

- View a list of venues
- Search for a specific venue
- View venue details by ID
- View available dates in a calendar
- User registration (student emails only)
- Create and view bookings
- User login and logout
- Update user avatar

### Venue Manager Features

- Register as a Venue Manager (student emails only)
- Create a Venue
- Update a Venue they manage
- Delete a Venue they manage
- View bookings for a Venue they manage

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Swiper
- React Toastify
- React Spinners
- Vite
- Vitest
- Playwright
- ESLint

## Folder Structure

```
├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── config/
    │   ├── data/
    │   ├── hooks/
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages/
    ├── test/
        └── components/
        └── e2e
        └── unit
    ├── vite.config.js
    ├── vitest.config.js
    └── vitest.setup.js
```

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/MohammedAbi/project-exam-2.git
   cd project-exam-2-holidaze
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```env
   VITE_API_BASE_URL=<your-api-url>
   VITE_API_KEY=<your-api-key>
   ```

4. Start the development server:

   ```bash
   npm run start
   ```

5. Run tests:

   ```bash
   npm run test
   ```

6. Build for production:

   ```bash
   npm run build
   ```

7. Preview production build:

   ```bash
   npm run preview
   ```

## Testing

This project includes **unit & integration tests** (Vitest + React Testing Library) and **end-to-end tests** (Playwright).

### Unit & Integration Testing

- Run all unit & integration tests:

  ```bash
  npm run test
  ```

- Run unit & integration tests in UI mode:

  ```bash
  npm run test:ui
  ```

### E2E Registration Testing

For end-to-end testing of user registration, a new unique user must be created each time.  
In the file `test/e2e/RegisterForm.spec.js`, update the test user values by incrementing the number in the username and email fields:

```js
// Fill required fields
await page.fill('input[name="name"]', "E2etestuser13");
await page.fill('input[name="email"]', "E2etestuser13@stud.noroff.no");
```

➡️ Each run should increase the numeric suffix (`14`, `15`, etc.) to avoid conflicts with already registered users.

- Run e2e tests in headed mode:

  ```bash
  npm run test:e2e:headed
  ```

- View Playwright test report:
  ```bash
  npm run test:e2e:report
  ```

## API Details

- Base URL: `import.meta.env.VITE_API_BASE_URL`
- Endpoints:

  - **Bookings**: `/holidaze/bookings`
  - **Venues**: `/holidaze/venues`
  - **Profiles**: `/holidaze/profiles`

## Test Users

- **Test User (Venue Manager)**

  - Email: [leona3@stud.noroff.no](mailto:leona3@stud.noroff.no)
  - Password: abc123123

- **Venue Manager Test Users**

  - Register using a student email (stud.noroff.no)

## Links

- Repository: [https://github.com/MohammedAbi/project-exam-2](https://github.com/MohammedAbi/project-exam-2)
- Live site: [https://noroff-project-exame-2-holidaze.netlify.app/](https://noroff-project-exame-2-holidaze.netlify.app/)
- Figma / Style Guide: [https://www.figma.com/design/RPzLQtbbyNjD7I6fIt6v8c/Holidaze?t=Am8AsaieDXfe7tbG-1](https://www.figma.com/design/RPzLQtbbyNjD7I6fIt6v8c/Holidaze?t=Am8AsaieDXfe7tbG-1)
- Kanban Board: [https://github.com/users/MohammedAbi/projects/12](https://github.com/users/MohammedAbi/projects/12)
