// jshint esversion: 6

// Import required modules
const express = require("express");  // Web framework for Node.js
const bodyParser = require("body-parser");  // Middleware to parse incoming request bodies
const request = require("request");  // HTTP request library
const https = require("https");  // Built-in HTTPS module for making requests

// Load environment variables from the .env file
const dotenv = require("dotenv").config();

// Extract Mailchimp API key, server prefix, and list ID from environment variables
const apiKey = process.env.MAILCHIMP_API_KEY;  // Mailchimp API key
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;  // Prefix for Mailchimp server
const listId = process.env.MAILCHIMP_LIST_ID;  // Mailchimp list ID for subscribers
const anyString = process.env.MAILCHIMP_ANY_STRING;  // This is used for basic authentication

// Create an Express application
const app = express();

// Middleware to parse URL-encoded bodies (e.g., form submissions)
app.use(bodyParser.urlencoded({extended: true}));
// Serve static files (like images, CSS, and JS) from the "public" directory
app.use(express.static("public"));

// Handle GET request to the root URL ("/") and serve the signup page
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");  // Send the signup.html file as the response
});

// Handle POST request to the root URL ("/") for submitting the form data
app.post("/", function(req, res){
    
    // Extract user input from the form submission
    const firtsName = req.body.fName;  // First name from the form
    const lastName = req.body.lName;   // Last name from the form
    const email = req.body.e_mail;     // Email address from the form

    // Create the data object to send to Mailchimp API
    const data = {
        members: [
            {
                email_address: email,  // Subscriber's email
                status: "subscribed",  // Status to indicate the subscription
                merge_fields: {  // Merge fields for first and last name
                    FNAME: firtsName,
                    LNAME: lastName
                }
            }
        ]
    }

    // Convert the data object to JSON format
    const jsonData = JSON.stringify(data);
    
    // Construct the URL for Mailchimp API with the list ID
    const url = "https://"+serverPrefix+".api.mailchimp.com/3.0/lists/"+listId;

    // Options for the request, including authentication
    const options = {
        method: "POST",  // HTTP method for the request
        auth: anyString+":"+apiKey  // Basic authentication using API key
    }

    // Create the HTTPS request to Mailchimp API
    const request = https.request(url, options, function(response){
        console.log(response.statusCode);  // Log the status code of the response
        
        // If the status code is 200 (success), show the success page
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");  // Send the success.html file
        } else {
            res.sendFile(__dirname + "/failure.html");  // Otherwise, send the failure.html file
        }

        // Log the response data (JSON from Mailchimp)
        response.on("data", function(data){
            console.log(JSON.parse(data));  // Parse and log the response
        });
    });

    // Send the JSON data in the request body
    request.write(jsonData);
    // End the request
    request.end();
});

// Handle POST request for failure page (redirects to the home page)
app.post("/failure", function(req, res){
    res.redirect("/");  // Redirect to the root URL (signup page)
})

// Start the server and listen on port 3000 (or environment-defined port)
app.listen(process.env.PORT || 3000, function(){
    console.log("The server is running on port 3000!");  // Log when the server starts
});
