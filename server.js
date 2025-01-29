const express = require("express");
const crypto = require("crypto");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const users = [
  { username: "admin", password: "password123" },
  { username: "user", password: "user123" },
];

let books = [
  { id: 1, name: "The Great Gatsby", category: "Fiction", price: 299 },
  { id: 2, name: "Atomic Habits", category: "Self-Help", price: 399 },
  { id: 3, name: "The Alchemist", category: "Fiction", price: 349 },
  { id: 4, name: "Deep Work", category: "Productivity", price: 499 },
  { id: 5, name: "The Pragmatic Programmer", category: "Technology", price: 599 },
  { id: 6, name: "Clean Code", category: "Technology", price: 799 },
  { id: 7, name: "Sapiens", category: "History", price: 699 },
  { id: 8, name: "Rich Dad Poor Dad", category: "Finance", price: 349 },
  { id: 9, name: "1984", category: "Fiction", price: 399 },
  { id: 10, name: "Zero to One", category: "Business", price: 499 },
  { id: 11, name: "Hooked", category: "Psychology", price: 299 },
  { id: 12, name: "The Lean Startup", category: "Business", price: 450 }
];

// Generate a random token
const generateToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = generateToken();
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get books with sorting, filtering, and pagination
app.get("/books", (req, res) => {
  let result = [...books];

  // Sorting
  if (req.query.sort) {
    if (req.query.sort === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (req.query.sort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (req.query.sort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }
  }

  // Filtering
  if (req.query.category) {
    result = result.filter(book => book.category.toLowerCase() === req.query.category.toLowerCase());
  }

  // Pagination
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  
  if (!page || !limit) {
    return res.json({ totalBooks: result.length, books: result });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedResult = result.slice(startIndex, endIndex);

  res.json({
    totalBooks: result.length,
    totalPages: Math.ceil(result.length / limit),
    currentPage: page,
    books: paginatedResult
  });
});


// Get a single book
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// Add a book
app.post("/books", (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
