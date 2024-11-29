#! /usr/bin/env node

import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import chalk from "chalk";
import boxen from "boxen";
import figlet from "figlet";
import { translate } from "@vitalets/google-translate-api";

const usage = chalk.blue(
  "\nUsage: translator-cli -l <language>  -s <sentence> \n" +
    boxen(
      chalk.green("\n" + "Translates a sentence to specific language" + "\n"),
      { padding: 1, borderColor: "yellow", dimBorder: true }
    ) +
    "\n"
);
yargs(hideBin(process.argv))
  .usage(usage)
  .option("l", {
    alias: "language",
    describe: "Translate to language",
    type: "string",
    demandOption: true,
  })
  .option("s", {
    alias: "sentence",
    describe: "Sentence to be translated",
    type: "string",
    demandOption: true,
  })
  .help(true).argv;

//process.argv->['node','/path/to/script.js','arg1','arg2']

const argv = yargs(process.argv.slice(2)).argv;

if (typeof argv?.language !== "string" && typeof argv?.l !== "string") {
  console.log(
    chalk.yellow(
      figlet.textSync("translator-cli", { horizontalLayout: "full" })
    ) +
      "\n" +
      chalk.bgRed("Missing argument :(")
  );
  //   yargs.showHelp(); -> error TypeError: yargs.showHelp is not a function
  //   return; -> error SyntaxError: Illegal return statement
} else if (typeof argv.sentence == "string" && typeof argv.s == "string") {
  //   yargs.showHelp();
  //   return;
} else {
  const language = argv.l || argv.language;
  const sentence = argv.s || argv.sentence;

  translate(sentence, { to: language?.toLowerCase() })
    .then((res) => {
      console.log(
        "\n" +
          boxen(
            chalk.yellow(
              `${res.raw.src}: ` +
                sentence +
                "\n\n" +
                `${language}: ${res.text}`
            ),
            {
              padding: 1,
              borderColor: "green",
              dimBorder: true,
            }
          ) +
          "\n"
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
