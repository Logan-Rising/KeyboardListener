const readline = require('readline');
const fs = require('fs');
const args = process.argv;
let save = false;

// User wants to save the key presses into the Keypress_Output.txt file
if (args[2] === "-save") {
    save = true;

    // Clear file if it exists
    if (fs.existsSync('./Keypress_Output.txt')) {
        fs.writeFile('./Keypress_Output.txt', '', function(){});
    }
} else {
    console.log("Outputting key presses. Run with '-save' to record key presses in 'Keypress_Output.txt'.");
}

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

// Listen for key press
process.stdin.on("keypress", (str, key) => {
    console.log(key); // Log key pressed

    // If save arg, then write to the output file
    if (save) {
        fs.appendFile("./Keypress_Output.txt", key.name, err => {
            if (err) {/* Error Ocurred */}
        });
    }

    // Exit program if 'Esc' is pressed
    if (key.name === "escape") {
        process.exit(1);
    }
});
