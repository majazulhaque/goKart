// REPL IMPLEMENTATIONS
const Customer = require("../models/Customer");

async function addCustomer(args) {
  try {
    const [name, email, address, phoneNumber] = args;

    // Create a new customer
    const customer = await Customer.create({
      name,
      email,
      address,
      phoneNumber,
    });

    return { message: "Customer Created Successfully", customer };
  } catch (error) {
    return { error: "Error while creating customer", message: error.message };
  }
}
async function updateCustomer(args) {
  try {
    const [customerId, name, email, address, phoneNumber] = args;
    const newCustomerData = {
      name,
      email,
      address,
      phoneNumber,
    };

    // Find the customer by ID and update the fields
    const customer = await Customer.findByIdAndUpdate(
      customerId,
      newCustomerData,
      { new: true, runValidators: true, useFindAndModify: false }
    );
    if (!customer) {
      return "Customer not found";
    }
    return { message: "Update Customer Successfully", customer };
  } catch (error) {
    return { error: "Error while updating customer", message: error.message };
  }
}
async function getCustomer(args) {
  try {
    const [customerId] = args;

    // Find the customer by ID
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return "Customer not found";
    }

    return { message: "Customer fetch Successfully", customer };
  } catch (error) {
    return { error: "Error while fetching customer", message: error.message };
  }
}
async function deleteCustomer(args) {
  try {
    const [customerId] = args;

    // Find the customer by ID and delete it
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return "Customer not found";
    }

    return { message: "Customer deleted successfully", customer };
  } catch (error) {
    return { error: "Error while deleting customer", message: error.message };
  }
}

async function listCustomer() {
  try {
    // Retrieve all customers from the database
    const customers = await Customer.find();

    return { message: "Listed Customer Successfully", customers };
  } catch (error) {
    return { error: "Error while listing customer", message: error.message };
  }
}

module.exports = {
  addCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
  listCustomer,
};
