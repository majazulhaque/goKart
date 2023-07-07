const readline = require("readline");
const { processCommand } = require("./commandProcessor");
const fs = require("fs");

async function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Welcome to the Product Inventory Management System.");

  rl.setPrompt("Enter a command: ");
  rl.prompt();

  rl.on("line", async (input) => {
    const command = input.trim();
    const result = await processCommand(command);

    console.log(result);

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Exiting the Product Inventory Management System.");
    process.exit(0);
  });
}

module.exports = {startREPL};
