
# Hacker News Clone - Login & Registration

This project is a simple web application that allows users to register, log in, and view search results from Hacker News using React and localStorage for state persistence. The project also implements basic routing with `react-router-dom` for navigating between pages.

## Features

- **Registration**: Users can register with a username and password.
- **Login**: Registered users can log in with their username and password.
- **Search Hacker News**: Users can search for articles from Hacker News using the Algolia API.
- **Filtered Search**: Users can filter the search for articles from Hacker News using the Algolia API.
- **Home Page**: After logging in, users are redirected to a home page where they can view their username.
- **LocalStorage**: Authentication data is stored in `localStorage` to persist login state.
- **React Router**: The app uses `react-router-dom` for page navigation.

## Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React hooks (`useState`, `useEffect`)
- **Routing**: `react-router-dom`
- **Storage**: `localStorage` for authentication persistence

## Demo

[Link of Website Deployed on Vercel](https://hackers-news-clone.vercel.app/)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/saksham0712/hackers-news-clone.git
cd hacker-news-clone
```

### 2. Install dependencies

Make sure you have `Node.js` installed. If not, you can download it from [here](https://nodejs.org/).

Once you have Node.js installed, run:

```bash
npm install
```

### 3. Start the development server

After installing the dependencies, start the development server with:

```bash
npm start
```

This will start the app on `http://localhost:3000`.

---

## Usage

### Register a New User

1. Navigate to the login page (if not already there).
2. Enter a username and password.
3. Click **Register** to store the user credentials in `localStorage`.

### Login

1. If the user is already registered, you can log in by entering the username and password.
2. Click **Login** to authenticate and be redirected to the Home Page.

### Search Hacker News

1. On the Home page, you can search for Hacker News articles.
2. The search results will be displayed below the search bar.

---

## File Structure

```
/hacker-news-clone
  ├── /src
      ├── /components
          ├── LoginRegister.js    # Handles user registration and login
          ├── Home.js             # Displays home page after login
          ├── Search.js           # Handles the search bar
          ├── ResultItem.js       # Displays individual search results
      ├── App.js                  # Main app component with routing
      ├── index.js                # Entry point for the app
  ├── /public
      ├── index.html              # Root HTML file
  ├── /node_modules               # Project dependencies
  ├── package.json                # Project metadata and dependencies
  ├── tailwind.config.js          # Tailwind CSS configuration
  ├── postcss.config.js           # PostCSS configuration
  ├── README.md                   # This file
```

---

## Key Components

### 1. `LoginRegister.js`

This component allows users to register and log in. It uses `localStorage` to store user credentials and check if the user is logged in.

### 2. `Home.js`

This page is shown to logged-in users and displays a welcome message along with the user's username. It also includes a logout button to clear the session.

### 3. `Search.js`

This component provides the search functionality to query Hacker News articles using the Algolia API. It allows users to search articles and displays results in a list.

### 4. `ResultItem.js`

This component displays individual results from the Hacker News API, including the article title, author, points, and comments.

---

## LocalStorage Authentication

The app uses `localStorage` for simple authentication, storing usernames and passwords. The key actions are:

- **Registration**: A new user is saved in `localStorage`.
- **Login**: On successful login, the username is stored in `localStorage` to track the session.
- **Logout**: When the user logs out, their session is cleared from `localStorage`.

---

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


---

## Acknowledgments

- **Hacker News API**: The application uses the [Hacker News API](https://hn.algolia.com/api/v1/search) for retrieving search results.
- **Tailwind CSS**: For styling the app efficiently.
- **React Router**: For handling navigation between different pages.

---

### Notes:

- Update the `Demo` link with a live demo if you plan to deploy the app (e.g., via GitHub Pages, Netlify, or Vercel).
- Make sure to replace `your-username` in the clone URL with your actual GitHub username.

