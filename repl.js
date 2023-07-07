const readline = require("readline");
const { processCommand } = require("./commandProcessor");
const fs = require("fs");

async function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const commandLogFilePath = "command-log.txt";
  const commandLogStream = fs.createWriteStream(commandLogFilePath, { flags: "a" });
  let commandBuffer = [];

  console.log("Welcome to the Product Inventory Management System.");

  rl.setPrompt("Enter a command: ");
  rl.prompt();

  rl.on("line", async (input) => {
    const commands = input.trim().split(";");

    for (const command of commands) {
      // Add the command to the buffer
      commandBuffer.push(command.trim());
      const result = await processCommand(command.trim());
      console.log(result);
    }

    // Check if the buffer has reached the batch size of 2 or more
    if (commandBuffer.length >= 2) {
      // Asynchronously stream the batch of commands to the command log file
      await streamCommandBatch(commandBuffer);

      // Remove the streamed commands from the buffer
      commandBuffer.splice(0, 2);
    }

    rl.prompt();
  });

  rl.on("close", async () => {
    // Stream any remaining commands in the buffer to the command log file
    if (commandBuffer.length > 0) {
      await streamCommandBatch(commandBuffer);
    }

    console.log("Exiting the Product Inventory Management System.");
    process.exit(0);
  });

  async function streamCommandBatch(commands) {
    const commandBatch = commands.slice(0, 2).join("\n");
    commandLogStream.write(commandBatch + "\n");
  }
}

module.exports = { startREPL };
