# API Documentation

## Base URL

```
<Your glitch deployed url>
```

## Authentication

### Login

**Endpoint:**

```
POST /login

```

**Request Body:**

```json
{
  "username": "admin",
  "password": "password123"
}

```

**Response:**

- Success (200):

```json
{
  "success": true,
  "token": "random_generated_token"
}

```

- Failure (401):

```json
{
  "success": false,
  "message": "Invalid credentials"
}

```

---

---

### **Books API**

### `GET /books`

- **Description**: Retrieves a list of books with optional sorting, filtering, and pagination.
- **Query Parameters**:
    - `sort` (optional, string): Sorting criteria.
        - `name_asc`: Sort by book name in ascending order.
        - `price_asc`: Sort by price in ascending order.
        - `price_desc`: Sort by price in descending order.
    - `category` (optional, string): Filters books by category (case-insensitive).
    - `page` (optional, integer): Page number for pagination.
    - `limit` (optional, integer): Number of books per page.
- **Response**:
    - **Success**:
        - Status: `200 OK`
        - Body:
            
            ```json
            
            {
              "totalBooks": 12,
              "totalPages": 2,
              "currentPage": 1,
              "books": [
                {
                  "id": 1,
                  "name": "The Great Gatsby",
                  "category": "Fiction",
                  "price": 299,
                  "author": "F. Scott Fitzgerald",
                  "publishingYear": 1925,
                  "coverImage": "https://dummyimage.com/150x200/ff6347/ffffff&text=The+Great+Gatsby",
                  "description": "A novel about the American dream, set in the Jazz Age of the 1920s."
                },
                ... more books
              ]
            }
            
            ```
            

### `GET /books/:id`

- **Description**: Retrieves a single book by its `id`.
- **URL Parameters**:
    - `id` (integer): The unique ID of the book.
- **Response**:
    - **Success**:
        - Status: `200 OK`
        - Body:
            
            ```json
            {
              "id": 1,
              "name": "The Great Gatsby",
              "category": "Fiction",
              "price": 299,
              "author": "F. Scott Fitzgerald",
              "publishingYear": 1925,
              "coverImage": "https://dummyimage.com/150x200/ff6347/ffffff&text=The+Great+Gatsby",
              "description": "A novel about the American dream, set in the Jazz Age of the 1920s."
            }
            
            ```
            
    - **Failure**:
        - Status: `404 Not Found`
        - Body:
            
            ```json
            
            {
              "message": "Book not found"
            }
            
            ```
            

### `POST /books`

- **Description**: Adds a new book to the collection.
- **Request Body**:
    - `name` (string): Name of the book.
    - `category` (string): Category of the book.
    - `price` (integer): Price of the book.
    - `author` (string): Author of the book.
    - `publishingYear` (integer): Year the book was published.
    - `coverImage` (string): URL for the book's cover image.
    - `description` (string): Description of the book.
- **Response**:
    - **Success**:
        - Status: `201 Created`
        - Body:
            
            ```json
            
            {
              "id": 13,
              "name": "New Book",
              "category": "Fiction",
              "price": 450,
              "author": "New Author",
              "publishingYear": 2023,
              "coverImage": "https://dummyimage.com/150x200/008000/ffffff&text=New+Book",
              "description": "A new book description."
            }
            
            ```
            

### `PUT /books/:id`

- **Description**: Updates an existing book by its `id`.
- **URL Parameters**:
    - `id` (integer): The unique ID of the book.
- **Request Body**:
    - Any field from the book (e.g., `name`, `category`, `price`, `author`, etc.).
- **Response**:
    - **Success**:
        - Status: `200 OK`
        - Body:
            
            ```json
            
            {
              "id": 1,
              "name": "Updated Book Name",
              "category": "Fiction",
              "price": 399,
              "author": "Updated Author",
              "publishingYear": 2025,
              "coverImage": "https://dummyimage.com/150x200/ff6347/ffffff&text=Updated+Book",
              "description": "Updated description."
            }
            
            ```
            
    - **Failure**:
        - Status: `404 Not Found`
        - Body:
            
            ```json
            
            {
              "message": "Book not found"
            }
            
            ```
            

### `DELETE /books/:id`

- **Description**: Deletes a book by its `id`.
- **URL Parameters**:
    - `id` (integer): The unique ID of the book.
- **Response**:
    - **Success**:
        - Status: `200 OK`
        - Body:
            
            ```json
            
            {
              "message": "Book deleted successfully"
            }
            
            ```
