// const chalk =  require('chalk') --- this method to use a package is not working in the 5 and above versions so 
import chalk from "chalk"
/// importing chalk package  
function greet() {
    console.log("this is the main js hello to you ")
    // use the '' single qoutes 
    console.log(chalk.green('hello'))
    // using the chalk rbg() 
    console.log(chalk.rgb(115, 173, 231)('Linux :)'))

    console.log(chalk.red('Your script is Running....') + 'I am Using the', chalk.rgb(192, 36, 109)('chalk package'))
}

greet()