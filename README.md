# MediCare+

**Your Health, Delivered with Care.**

MediCare+ is a responsive online pharmacy website built as a Web Development mini project. Customers can browse and search medicines, filter by category and price, manage a cart, and upload prescriptions. An admin dashboard lets a pharmacy manage its medicine inventory.

The project is front-end only. It uses HTML, CSS and JavaScript, and simulates back-end behaviour (cart, inventory) with the browser's local storage.

![Home page](screenshots/01-home.png)

## Features

**For customers**
- Browse medicines by category: Tablets, Syrups, Vitamins, Personal Care, Devices, Baby Care
- Search medicines and filter by category, price range and in-stock availability
- Sort products and view featured items
- Cart with quantity controls, order summary and delivery charge calculation
- Upload a prescription for medicines that need a doctor's approval
- Login and sign up pages
- Contact page with a message form
- Dark mode and notifications
- Responsive layout

**For the admin**
- Dashboard showing total products, categories, items in stock and low stock
- Add a new medicine (name, category, price, description, stock, prescription required or not)
- Inventory table with search, edit and delete

## Screenshots

| Medicine Store | Upload Prescription |
|---|---|
| ![Medicine Store](screenshots/04-medicine-store.png) | ![Upload Prescription](screenshots/05-upload-prescription.png) |

| Admin Dashboard | Cart |
|---|---|
| ![Admin Dashboard](screenshots/06-admin-dashboard.png) | ![Cart](screenshots/08-cart.png) |

| Featured Products | Login / Sign Up |
|---|---|
| ![Featured Products](screenshots/03-featured-products.png) | ![Login](screenshots/09-login-signup.png) |

| Contact | Shop by Category |
|---|---|
| ![Contact](screenshots/07-contact.png) | ![Categories](screenshots/02-shop-by-category.png) |

## Tech Stack

| Technology | Used for |
|---|---|
| HTML5 | Page structure: Home, Medicines, Prescription, Admin, Cart, Contact, Login |
| CSS3 | Layout, responsive design, animations, dark mode |
| JavaScript | Product rendering, cart logic, search and filters, form validation, notifications, local storage |

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/priyanshjain04/MediCare-Plus.git
   ```
2. Open the project folder and open `index.html` in your browser. No installation or server is needed.

## Limitations

This is a learning project, so some things are simulated:
- There is no real server or database. Data such as the cart and inventory is stored in the browser's local storage.
- Login, prescription upload and checkout demonstrate the interface and flow, and are not connected to a real backend or payment system.

## Possible Improvements

- Connect a real backend and database (for example Node.js with MongoDB or Firebase)
- Add secure authentication
- Add order history and real payment integration
- Deploy the site using GitHub Pages or Netlify

## Team

This was a group project by:

- Aman Singh
- Divya Patidar
- Himanshu Mishra
- Priyansh Jain

### My contribution (Priyansh Jain)

<!-- TODO: Replace this section with what YOU personally built, for example:
     the cart page, the search and filter logic, the admin dashboard, the dark mode, etc.
     Keep it specific and honest. -->

## Project Report

The full project report is available in the [docs](docs/MediCare-Plus-Project-Report.docx) folder.
