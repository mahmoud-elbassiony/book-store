# Book-Store
Objective:
The objective of this project is to create a web-based application that utilizes the Google Books API to showcase a catalog of software development books.
The application will provide a user-friendly interface for searching and viewing details of specific books related to software development.

Project Details:
1. Main Page:
The main page of the application serves as the landing page for users.
It features a search bar where users can input specific keywords related to software development.
It displays a list of relevant software development books using the following Google Books API:
https://www.googleapis.com/books/v1/volumes?q=software+development
2. Search Functionality:
Users can initiate a search by entering specific keywords into the search bar.
The application will make an API request to the Google Books API using the provided search query.
The list of books displayed on the main page will be dynamically updated based on the search results.
3. Viewing Book Details:
Each book listed on the main page includes a "View Details" button.
When a user clicks on the "View Details" button for a specific book, they will be redirected to a dedicated book details page.
The book details page will fetch and display comprehensive information about the selected book.
The book details page will utilize the Google Books API to retrieve these details.
4. Cart Functionality:
Easch Book includes a "Add To cart" button.
When a user clicks on the "Add To cart" button the cart icon in the navbar will show an increase in count.
When the user clicks on the cart icon, they will be redirected to the cart page which includes the items they added and the count of each item.
On the cart page the user can increase and decrease the count and can also remove the item from the cart.

Technologies: HTML, CSS, JavaScript

Demo Link: https://book-store-95.vercel.app/

Contact:
Email: mahmoud.elbassiouny95@gmail.com
LinkedIn: https://www.linkedin.com/in/mahmoud-elbassiouny/
