const NewBook = require("./models/books.model");
//const BookCart = require("./models/bookCart.model");
const Cart = require("./models/cart.model");
const WishList = require("./models/wishlist.model");
const Address = require("./models/address.model");
const OrderHistory = require("./models/orders.model");
const { initialisation } = require("./db/db.connect");

initialisation();

const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  openSuccssStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send(`Express Server started`));

// Post Books.
app.post("/newBook", async (req, res) => {
  const bookToAdd = req.body;

  try {
    const addedBook = new NewBook(bookToAdd);
    const savedNewBook = await addedBook.save();

    if (savedNewBook) {
      res.status(201).json(bookToAdd);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Books.
app.get("/newBooks", async (req, res) => {
  try {
    const allBooks = await NewBook.find();

    if (allBooks) {
      res.status(201).json(allBooks);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get books by category
app.get("/newBooks/:newBookCategory", async (req, res) => {
  try {
    const newBookByCategory = await NewBook.find({
      category: req.params.newBookCategory,
    });

    if (newBookByCategory) {
      res.status(201).json(newBookByCategory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get by categoryId
app.get("/newBooks/newBookCategory/:categoryId", async (req, res) => {
  try {
    const singleBookByCategory = await NewBook.find({
      _id: req.params.categoryId,
    });

    if (singleBookByCategory) {
      res.status(201).json(singleBookByCategory);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Book.
app.post(`/newBooks/:bookId`, async (req, res) => {
  const bookToUpdate = req.body;
  const bookId = req.params.bookId;

  try {
    const newBook = await NewBook.findByIdAndUpdate(bookId, bookToUpdate, {
      new: true,
    });

    if (!newBook) {
      res.status(401).json({ error: "Book not found" });
    }

    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Book.
app.delete(`/newBooks/newBook/:bookId`, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const deletedBook = await NewBook.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({ error: "Book not found" });
    }

    res.status(201).json(deletedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post book in cart
app.post(`/newBooksCart`, async (req, res) => {
  const addBook = req.body;

  try {
    const addedBook = new Cart(addBook);
    const savedBook = await addedBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update book in cart
app.post(`/newBooksCart/updateBook/:bookId`, async (req, res) => {
  const bookToUpdate = req.body;
  const bookId = req.params.bookId;

  try {
    const updatedBook = await Cart.findByIdAndUpdate(bookId, bookToUpdate, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({ message: "Book item not found" });
    }

    res.status(201).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete book in cart.
app.delete(`/newBooksCart/:bookId`, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const deletedBook = await Cart.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
    }

    res.status(201).json(deletedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get books from cart
app.get("/newBooksCart", async (req, res) => {
  try {
    const allCartBooks = await Cart.find();
    res.status(201).json(allCartBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post book in wishlist
app.post(`/newWishListBooks`, async (req, res) => {
  const bookToAdd = req.body;

  try {
    const addedWishlist = new WishList(bookToAdd);
    const savedWishList = await addedWishlist.save();

    res.status(201).json(savedWishList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete book from wishlist
app.delete(`/newWishListBooks/:bookId`, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const removedWishlist = await WishList.findByIdAndDelete(bookId);

    if (removedWishlist) {
      res.status(201).json(removedWishlist);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get book from wishlist
app.get(`/newWishListBooks`, async (req, res) => {
  try {
    const booksWishList = await WishList.find();

    res.status(201).json(booksWishList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post book order to order history.
app.post("/ordersHistory", async (req, res) => {
  const orderPlaced = req.body;

  try {
    const newOrders = new OrderHistory(orderPlaced);
    const savedOrder = await newOrders.save();

    if (!savedOrder) {
      res.status(404).json({ error: "order not saved" });
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// get order history.
app.get("/ordersHistory", async (req, res) => {
  try {
    const allOrders = await OrderHistory.find();

    if (!allOrders) res.status(404).json({ error: "can't find orders" });

    res.status(200).json(allOrders);
  } catch (error) {
    console.log(error);
  }
});

// delete order history
app.delete("/deleteOrder/:orderId", async (req, res) => {
  const userId = req.params.orderId;

  try {
    const deletedOrder = await OrderHistory.findByIdAndDelete(userId);

    if (!deletedOrder)
      res.status(404).json({ error: "Order cannot get delete" });

    res.status(200).json(deletedOrder);
  } catch (error) {
    console.log(error);
  }
});

// get address, for exiting user
app.get(`/get/delivery/address`, async (req, res) => {
  try {
    const bookAddress = await Address.find();
    res.status(201).json(bookAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
});

// post new address
app.post(`/add/delivery/address`, async (req, res) => {
  const addressdata = req.body;

  try {
    const newBookAddress = new Address(addressdata);
    const savedAddress = await newBookAddress.save();

    res.status(201).json(savedAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update address for exiting user.
app.post(`/update/delivery/address/:bookId`, async (req, res) => {
  const updatedBookAddress = req.body;
  const bookAddressId = req.params.bookId;
  try {
    const newBookAddress = await Address.findByIdAndUpdate(
      bookAddressId,
      updatedBookAddress,
      { new: true }
    );

    if (!newBookAddress) res.status(404).json({ error: "Book not found" });

    res.status(200).json(newBookAddress);
  } catch (error) {
    console.log(error);
    res.status(201).json({ error: "Internal server error" });
  }
});

// delete address
app.delete(`/delete/delivery/address/:bookId`, async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const deletedAddress = await Address.findByIdAndDelete(bookId);
    res.status(201).json(deletedAddress);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running at port", PORT));
