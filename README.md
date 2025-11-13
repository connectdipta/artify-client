# Artify - A Creative Artwork Showcase

Welcome to the client-side repository for **Artify**, a stunningly modern and responsive platform for artists and art lovers. Artify is a "digital gallery" where creators can showcase their work, and enthusiasts can explore, discover, and collect the art they love.

This application is built with a "modern-first" approach, emphasizing a clean, "eye-catchy" user interface, seamless navigation, and dynamic, animated content to create an engaging user experience.

- **Live Site URL:** `https://artify-d5f89.web.app/`
- **Server-Side Repository:** `[https://github.com/connectdipta/artify-server]`

## Core Features (In-Depth)

This platform provides a full-stack art gallery experience. The 5 key features are:

1.  **Secure & Seamless User Authentication**
    * Provides a full authentication system (Register, Login, Google Sign-In) powered by **Firebase**.
    * User state is persistent, meaning a logged-in user will not be logged out on page reload.
    * All sensitive routes (like `Add Artwork`, `My Gallery`, `My Favorites`) are **privately protected** and will redirect unauthenticated users to the login page.
    * The Navbar intelligently updates to show the user's profile picture (with a hover-menu) or "Login/Register" buttons.

2.  **Full Artwork Management (CRUD)**
    * **Create:** Artists can upload their work via a secure `Add Artwork` form. The server automatically associates the art with their user ID.
    * **Read:** All artworks are displayed on the `Explore` page, and artist-specific art is shown on the `My Gallery` page.
    * **Update:** Artists can edit the details of their *own* submissions via a dedicated `Update Artwork` page.
    * **Delete:** Artists have the sole permission to delete their art from their `My Gallery`, with a confirmation prompt using SweetAlert2.

3.  **Dynamic Discovery & Exploration**
    * The main `Explore Artworks` page is a public hub for all "Public" visibility art.
    * **Search:** Features a powerful search bar that queries the database for artworks matching either the **title** or the **artist's name**.
    * **Filter:** Includes a "Filter By Category" dropdown (a **Challenge Requirement**) that works *in combination* with the search bar to refine results.

4.  **Deep User Engagement System**
    * **Like System:** Any user can "Like" an artwork from the details page. This is tracked in the database and uses `localStorage` to prevent a user from "Liking" the same piece twice.
    * **Favorites Collection:** Logged-in users can add any artwork to their "Favorites." This is a private, persistent collection, accessible only on their `My Favorites` page, which populates data using a MongoDB aggregation pipeline.

5.  **"Eye-Catchy" & Animated Modern UI/UX**
    * **Persistent Dark/Light Mode:** A theme toggle in the navbar saves the user's preference to `localStorage`, so their choice is remembered on their next visit.
    * **Vanta.js Animated Banner:** The home page features a stunning, generative "Clouds" animation from Vanta.js, providing a unique first impression.
    * **Dynamic Text:** The `React Simple Typewriter` library is used on the hero banner to animate the titles and descriptions, drawing the user's attention.
    * **Scroll Animations:** `React Awesome Reveal` is used throughout the home page to fade and slide in sections as the user scrolls, making the page feel alive and responsive.
    * **Modal Viewer:** On the `View Details` page, users can click a "maximize" icon to view the artwork in a full-screen, high-resolution modal.

## Technology Stack

### Core
* **React:** The fundamental UI library.
* **React Router:** For all client-side routing and private route management.
* **Vite:** For a blazing-fast development server and build process.

### Styling
* **Tailwind CSS:** A utility-first CSS framework for all styling.
* **DaisyUI:** A Tailwind component library for beautiful, pre-built components (like cards, navbars, and modals).

### Animations
* **Vanta.js:** Used for the generative WebGL animated hero banner.
* **React Simple Typewriter:** Used to create the "typing" effect on the hero.
* **React Awesome Reveal:** Used for all "on-scroll" fade and slide animations.
* **React-fast-marquee:** Used for the "Testimonials" section on the home page.
* **Swiper.js:** (Used in a previous version for the image slider, now replaced by Vanta.js).

### State & Authentication
* **Firebase:** For complete user authentication (Email/Password & Google OAuth).
* **React Hooks:** ( `useState`, `useEffect`, `useContext`, `useRef`) for all state management.

### Data Fetching & Notifications
* **Axios:** For all API requests to the server.
* **SweetAlert2:** For all error, success, and confirmation popups (replaces default `alert()`).

### Utilities
* **React Hook Form:** For managing the `Add Artwork` and `Update Artwork` forms.
* **React Icons:** For the entire icon library.

## Local Setup & Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/artify-client.git](https://github.com/your-username/artify-client.git)
    cd artify-client
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory. You must add your Firebase project configuration keys here, as well as the URL for your server (which is `http://localhost:3000` if you are running it locally).

    ```.env
    # Your local server URL
    VITE_API_URL="http://localhost:3000"

    # Your Firebase App Config (from your Firebase project settings)
    VITE_FIREBASE_API_KEY="AIza..."
    VITE_FIREBASE_AUTH_DOMAIN="artify-d5f89.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="artify-d5f89"
    VITE_FIREBASE_STORAGE_BUCKET="artify-d5f89.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="..."
    VITE_FIREBASE_APP_ID="1:..."
    ```

4.  **Run the application:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
