# MedCare Online Pharmacy - Frontend

## Introduction
This project is the frontend for MedCare, a modern, intuitive, and fully-responsive e-commerce platform designed for an online pharmacy. The primary goal is to provide users with easy access to medicines and healthcare products, featuring advanced search, real-time order tracking, secure prescription uploads, and personalized recommendations. It aims to solve the need for a convenient and trustworthy digital healthcare experience.

## Project Type
Frontend

## Deployed App
Frontend: [https://medcareorg.netlify.app/](https://medcareorg.netlify.app/)
Backend: N/A (This repository contains the frontend application which interacts with a separate backend API.)
Database: N/A

## Directory Structure
As this is a frontend project (built with Vite/React), a typical simplified structure would be:

medcare-frontend/├── public/                # Static assets├── src/│   ├── assets/            # Images, fonts, etc.│   ├── components/        # Reusable UI components (e.g., shadcn-ui based, custom)│   │   └── ui/            # Base UI elements from shadcn-ui│   ├── contexts/          # React Context API for state management (if used)│   ├── hooks/             # Custom React hooks│   ├── layouts/           # Layout components (e.g., MainLayout, AuthLayout)│   ├── pages/             # Page-level components (e.g., HomePage, ProductPage, CartPage)│   ├── services/          # API call functions, utility services│   ├── styles/            # Global styles, Tailwind base/components/utilities│   ├── utils/             # Utility functions│   ├── App.tsx            # Main application component│   └── main.tsx           # Entry point of the application├── .env                   # Environment variables (if any, gitignored)├── .eslintrc.cjs          # ESLint configuration├── .gitignore             # Git ignore file├── index.html             # Main HTML file for Vite├── package.json           # Project dependencies and scripts├── postcss.config.js      # PostCSS configuration (for Tailwind)├── README.md              # This file├── tailwind.config.js     # Tailwind CSS configuration├── tsconfig.json          # TypeScript configuration├── tsconfig.node.json     # TypeScript configuration for Node└── vite.config.ts         # Vite configuration
## Video Walkthrough of the project
*[Placeholder: Link to a 1-3 minute video walkthrough showcasing the application's features and user interface.]*

## Video Walkthrough of the codebase
*[Placeholder: Link to a 1-5 minute video walkthrough explaining the frontend codebase structure, key components, and logic.]*

## Features
-   **Searchable Medicine Catalog:** Real-time search with suggestions and advanced filters (category, brand, price, availability).
-   **Responsive and Interactive UI/UX:** Fluid layouts using CSS Grid/Flexbox, interactive product cards with hover effects.
-   **Prescription Uploads:** Secure drag-and-drop interface with file validation, progress indicators, and image preview.
-   **Personalized Medicine Recommendations:** AI-driven suggestions displayed in dynamic carousels or grids with lazy loading.
-   **Order Management:** Visual order tracking system with real-time status updates and in-app notifications.
-   **Interactive Shopping Cart:** Modal or side-panel cart with dynamic item modification and immediate feedback.
-   **Multi-Step Checkout Process:** Guided checkout with progress indicators and step-by-step validation.
-   **User Accounts & Medical History:** Management of health profiles, prescription history, and purchase history.
-   **Detailed Medicine Information Pages:** Comprehensive product details with tabbed layouts for easy navigation.
-   **Live Chat Integration:** Widget for customer queries on product pages.
-   **Progressive Web App (PWA) Capabilities:** Potential for offline access by caching essential data.
-   **Dynamic Price Alerts & Discounts:** Subscription to price alerts and visually highlighted discounted products.

## Design Decisions or Assumptions
-   **Technology Choices:**
    -   **React with Vite:** Chosen for its performance, strong ecosystem, and component-based architecture, with Vite providing a fast development experience.
    -   **TypeScript:** Used for static typing to improve code quality, maintainability, and reduce runtime errors.
    -   **Tailwind CSS:** Selected for utility-first styling, enabling rapid UI development and easy customization.
    -   **shadcn-ui:** Leveraged for its accessible, unstyled component primitives that can be easily customized with Tailwind CSS, providing a solid foundation for UI elements.
-   **User Experience (UX):**
    -   Focus on a clean, intuitive, and accessible user interface to build trust and ensure ease of use, especially given the healthcare context.
    -   Emphasis on responsiveness to provide a seamless experience across mobile, tablet, and desktop devices.
-   **API Interaction:** The frontend is designed to consume a separate backend API for all data operations (fetching medicines, user authentication, order processing, etc.). This README focuses solely on the frontend.
-   **State Management:** For complex state interactions, a dedicated state management library (e.g., Zustand, Jotai, or Redux Toolkit) would be integrated. For simpler cases, React Context API and hooks might suffice.

## Installation & Getting Started
To set up and run this project locally, please follow these steps. Ensure you have Node.js (v18 or later recommended) and npm installed.

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_GIT_URL>
    ```
    *(Replace `<YOUR_REPOSITORY_GIT_URL>` with the actual Git URL of this repository)*

2.  **Navigate to the project directory:**
    ```bash
    cd medcare-frontend 
    ```
    *(Or your specific project directory name)*

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, typically on `http://localhost:5173`.

## Usage
Once the development server is running:
1.  Open your web browser and navigate to the local URL provided (e.g., `http://localhost:5173`).
2.  Explore the application's features: browse the medicine catalog, use search and filters, add items to the cart, and simulate the checkout process.
3.  For features requiring authentication (like viewing order history or managing a health profile), you would typically need to register and log in (assuming backend integration for authentication is in place).

*(Screenshots can be added here to illustrate key parts of the application interface)*

## Credentials
For publicly accessible features like browsing products, no credentials are required.
For user-specific features such as viewing order history, managing prescriptions, or accessing a health profile, users would need to register an account and log in.
*(Placeholder: If specific demo user credentials are available for reviewers, list them here, e.g., `user: demo@example.com`, `password: demopassword123`)*

## APIs Used
This frontend application interacts with a custom backend API (not detailed in this repository) for functionalities including:
-   Fetching medicine catalog data.
-   User authentication and profile management.
-   Prescription handling.
-   Order processing and history.
-   Personalized recommendations.

No third-party APIs are directly integrated into the frontend for core data, but libraries for features like live chat might connect to their respective services.

## API Endpoints
This section is N/A for a frontend-only README. The frontend consumes endpoints provided by a separate backend service. Examples of consumed endpoints might include:
-   `GET /api/medicines`
-   `GET /api/medicines/:id`
-   `POST /api/auth/login`
-   `POST /api/orders`
-   `GET /api/users/me/profile`

Refer to the backend API documentation for a detailed list of its endpoints.

## Technology Stack
-   **Vite:** A fast frontend build tool and development server.
-   **React (v18+):** A JavaScript library for building user interfaces.
-   **TypeScript:** A superset of JavaScript that adds static typing.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **shadcn-ui:** A collection of re-usable UI components built with Radix UI and Tailwind CSS.
-   **React Router DOM:** For client-side routing and navigation.
-   **Axios (or Fetch API):** For making HTTP requests to the backend API.
-   **(Potential State Management):** Zustand, Jotai, Redux Toolkit, or React Context API for managing application state.
-   **ESLint & Prettier:** For code linting and formatting.

