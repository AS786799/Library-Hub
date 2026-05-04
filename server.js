const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const booksschema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  publisherYear: Number   
});

const Book = mongoose.model("Book", booksschema);

app.post('/books', async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publisherYear: Number(req.body.publisherYear) 
    });

    await newBook.save();
    res.json(newBook);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// READ
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//  UPDATE
app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        publisherYear: Number(req.body.publisherYear) 
      },
      { new: true }
    );

    res.json(updatedBook);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//  DELETE
app.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// server
app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});