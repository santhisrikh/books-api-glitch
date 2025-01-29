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
  { 
    id: 1, 
    name: "The Great Gatsby", 
    category: "Fiction", 
    price: 299, 
    author: "F. Scott Fitzgerald", 
    publishingYear: 1925, 
    coverImage: "https://dummyimage.com/150x200/ff6347/ffffff&text=The+Great+Gatsby", // Background color: Tomato, Text color: White
    description: "A novel about the American dream, set in the Jazz Age of the 1920s."
  },
  { 
    id: 2, 
    name: "Atomic Habits", 
    category: "Self-Help", 
    price: 399, 
    author: "James Clear", 
    publishingYear: 2018, 
    coverImage: "https://dummyimage.com/150x200/4682b4/ffffff&text=Atomic+Habits", // Background color: SteelBlue, Text color: White
    description: "A guide to building good habits and breaking bad ones using proven techniques."
  },
  { 
    id: 3, 
    name: "The Alchemist", 
    category: "Fiction", 
    price: 349, 
    author: "Paulo Coelho", 
    publishingYear: 1988, 
    coverImage: "https://dummyimage.com/150x200/32cd32/ffffff&text=The+Alchemist", // Background color: LimeGreen, Text color: White
    description: "A philosophical novel about following one's dreams, inspired by the author's journey."
  },
  { 
    id: 4, 
    name: "Deep Work", 
    category: "Productivity", 
    price: 499, 
    author: "Cal Newport", 
    publishingYear: 2016, 
    coverImage: "https://dummyimage.com/150x200/ff4500/ffffff&text=Deep+Work", // Background color: OrangeRed, Text color: White
    description: "An exploration of the benefits of focused, undistracted work in an increasingly distracted world."
  },
  { 
    id: 5, 
    name: "The Pragmatic Programmer", 
    category: "Technology", 
    price: 599, 
    author: "Andrew Hunt, David Thomas", 
    publishingYear: 1999, 
    coverImage: "https://dummyimage.com/150x200/00008b/ffffff&text=The+Pragmatic+Programmer", // Background color: DarkBlue, Text color: White
    description: "A comprehensive guide to becoming a more efficient, effective, and pragmatic software developer."
  },
  { 
    id: 6, 
    name: "Clean Code", 
    category: "Technology", 
    price: 799, 
    author: "Robert C. Martin", 
    publishingYear: 2008, 
    coverImage: "https://dummyimage.com/150x200/008b8b/ffffff&text=Clean+Code", // Background color: DarkCyan, Text color: White
    description: "A must-read for developers who want to write clean, maintainable, and understandable code."
  },
  { 
    id: 7, 
    name: "Sapiens", 
    category: "History", 
    price: 699, 
    author: "Yuval Noah Harari", 
    publishingYear: 2011, 
    coverImage: "https://dummyimage.com/150x200/dda0dd/ffffff&text=Sapiens", // Background color: Plum, Text color: White
    description: "A compelling history of humankind, exploring the rise of Homo sapiens and our impact on the planet."
  },
  { 
    id: 8, 
    name: "Rich Dad Poor Dad", 
    category: "Finance", 
    price: 349, 
    author: "Robert T. Kiyosaki", 
    publishingYear: 1997, 
    coverImage: "https://dummyimage.com/150x200/ff1493/ffffff&text=Rich+Dad+Poor+Dad", // Background color: DeepPink, Text color: White
    description: "A personal finance book that contrasts the mindset of the rich and the poor, teaching financial literacy."
  },
  { 
    id: 9, 
    name: "1984", 
    category: "Fiction", 
    price: 399, 
    author: "George Orwell", 
    publishingYear: 1949, 
    coverImage: "https://dummyimage.com/150x200/8a2be2/ffffff&text=1984", // Background color: BlueViolet, Text color: White
    description: "A dystopian novel about a totalitarian regime that uses surveillance and manipulation to control its citizens."
  },
  { 
    id: 10, 
    name: "Zero to One", 
    category: "Business", 
    price: 499, 
    author: "Peter Thiel", 
    publishingYear: 2014, 
    coverImage: "https://dummyimage.com/150x200/ffb6c1/ffffff&text=Zero+to+One", // Background color: LightPink, Text color: White
    description: "A book about building companies that create new things, focusing on innovation and startup success."
  },
  { 
    id: 11, 
    name: "Hooked", 
    category: "Psychology", 
    price: 299, 
    author: "Nir Eyal", 
    publishingYear: 2014, 
    coverImage: "https://dummyimage.com/150x200/008000/ffffff&text=Hooked", // Background color: Green, Text color: White
    description: "A guide to creating habit-forming products using behavioral psychology and product design."
  },
  { 
    id: 12, 
    name: "The Lean Startup", 
    category: "Business", 
    price: 450, 
    author: "Eric Ries", 
    publishingYear: 2011, 
    coverImage: "https://dummyimage.com/150x200/8b0000/ffffff&text=The+Lean+Startup", // Background color: DarkRed, Text color: White
    description: "A methodology for developing businesses and products through validated learning, experimentation, and innovation."
  }
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
