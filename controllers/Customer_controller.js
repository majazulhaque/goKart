const Customer = require("../models/Customer");

// Creating a Customer
module.exports.createCustomer = async (req, res) => {
  try {
    const { name, email, address, phoneNumber } = req.body;

    // Create a new customer
    const customer = await Customer.create({
      name,
      email,
      address,
      phoneNumber,
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting Customer using customer Id
module.exports.getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Find the customer by ID
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Customer Detail using Customer ID
module.exports.updateCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const newCustomerData = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
    };

    // Find the customer by ID and update the fields
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      newCustomerData,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Customer using customer ID
module.exports.deleteCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Find the customer by ID and delete it
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Customer (LOGIN)
module.exports.getAllCustomers = async (req, res) => {
  try {
    // Retrieve all customers from the database
    const customers = await Customer.find();

    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
