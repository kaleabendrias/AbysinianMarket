# Abyssinian Market

Abyssinian Market is an e-commerce platform designed to connect buyers and sellers, focusing on Ethiopian traditional clothing, accessories, and more. This application provides a convenient way for users to browse, purchase, and sell authentic Ethiopian products online.

## Features

- **User Authentication**: Secure user authentication using JWT (JSON Web Tokens) and OAuth with Google.
- **Product Listings**: Browse a wide range of Ethiopian traditional clothing, accessories, and other products.
- **Secure Checkout**: Secure payment processing with Chapa payment gateway integration.
- **Seller Dashboard**: Sellers can manage their product listings, view orders, and track sales.
- **Contact Us**: Users can reach out to the platform administrators for inquiries and support.
- **Responsive Design**: Fully responsive design for optimal viewing on various devices.

## Technologies Used

- **Frontend**:
  - React.js
  - Framer Motion (for animations)
  - Axios (for HTTP requests)
  - React Router (for client-side routing)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ORM)
  - Cloudinary (for image storage)
- **Authentication**:
  - Passport.js (for Google OAuth)
  - JWT (JSON Web Tokens)
- **Payment Gateway**:
  - Chapa
- **Deployment**:
  - Vercel (for frontend)
  - Render (for backend)
- **Other Tools**:
  - Git & GitHub (for version control)
  - VS Code (as the primary code editor)
  - Postman (for API testing)
  - ESLint & Prettier (for code formatting and linting)

## Getting Started

**Frontend Installation:**

1. Open your terminal.
2. Navigate to the `front` directory of the Abyssinian Market app using the `cd` command:
   ```
   cd front
   ```
3. Once you are inside the `frontend` directory, install the dependencies using npm:
   ```
   npm install
   ```
4. run the server,

```
npm run dev
```

**Backend Installation**:

1. Open another terminal window or tab.
2. Navigate to the `back` directory of the Abyssinian Market app using the `cd` command:
   ```
   cd back
   ```
3. Once you are inside the `backend` directory, install the dependencies using npm:
   ```
   npm install
   ```
4. run the server,

```
nodemon index.js
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
