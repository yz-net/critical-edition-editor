import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the current timestamp
const timestamp = new Date().toISOString();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the output JSON file
const outputPath = join(__dirname, "../src/configs/timestamp.json");

// Write the timestamp to the JSON file
const jsonContent = JSON.stringify({ timestamp }, null, 2);
fs.writeFileSync(outputPath, jsonContent, "utf8");

console.log(`Timestamp written to ${outputPath}`);
