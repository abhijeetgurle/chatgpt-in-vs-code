// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

import axios from "axios";

let chatgptResponse: any;

async function chatgpt() {
  const completionResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello world" }],
    },
    {
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
    }
  );

  chatgptResponse = completionResponse;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "chatgptinvscode" is now active!'
  );
  chatgpt();

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "chatgptinvscode.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      axios
        .post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello world" }],
          },
          {
            headers: {
              Authorization:
                "Bearer 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",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(
            "res: ",
            JSON.stringify(res.data.choices[0].message.content)
          );
          vscode.window.showInformationMessage(
            res.data.choices[0].message.content
          );
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
