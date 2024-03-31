import supabaseClient from '@supabase/supabase-js';
import express from "express";

const app = express();

const supabase = supabaseClient.createClient("https://klymzdwfxffmowgxmeij.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseW16ZHdmeGZmbW93Z3htZWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4NTU2MTYsImV4cCI6MjAyNzQzMTYxNn0.BrofIOnCRFFfrINR3nqNq15I62_meXXAODilxlXSsA0");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * Tests the status of the backend server
 * Parameters: None
 * Returns: JSON {
 *   status: String
 * }
 */
app.get("/status", (request, response) => {
  response.send({
    "Status": "Running"
  });
});

/**
 * Add a new user
 * Query Parameters: 
 * 1. username: String
 * 2. password: String
 * 3. admin: 'TRUE' || 'FALSE'
 * Returns: Success or error message
 */
app.post('/add_user', async (req, res) => {
  const {error} = await supabase
      .from('Users')
      .insert({
        username: req.query.username,
        password: req.query.password,
        admin: req.query.admin
      });
  if (error) {
      res.send(error);
  } else {
    res.send("User Successfully Created");
  }
});

/**
 * Removes a user
 * Query Parameters:
 * 1. username: String
 * Returns: Success or error message
 */
app.delete('/remove_user', async (req, res) => {
  const {error} = await supabase
      .from('Users')
      .delete()
      .eq('username', req.query.username);
  if (error) {
      res.send(error);
  } else {
    res.send("User Successfully Deleted");
  }
});

/**
 * Get account information on a given user
 * Query Parameters:
 * 1. username: String
 * Returns: JSON {
 *   username: String,
 *   creation_date: Date String,
 *   admin: Boolean
 * }
 */
app.get('/user_information', async (req, res) => {
  const {data, error} = await supabase
    .from('Users')
    .select('username, creation_date, admin')
    .eq('username', req.query.username);
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});

/**
 * Get account information for all users
 * TODO Security measures?
 * Query Parameters: None
 * Returns: JSON [{
 *   username: String,
 *   creation_date: Date String,
 *   admin: Boolean
 * }]
 */
app.get('/all_user_information', async (req, res) => {
  const {data, error} = await supabase
    .from('Users')
    .select('username, creation_date, admin')
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});

/**
 * Get all the summary requests for a given user
 * Query Parameters:
 * 1. username: String
 * Returns: JSON [{ 
 *   request_id: Int,
 *   creation_date: Date String,
 *   prompt: String,
 *   username: String,
 *   programming_language: String
 * }]
 */
app.get('/get_user_requests', async (req, res) => {

});

/**
 * Get all the responses for a user's given request
 * Query Parameters:
 * 1. request_id: Int
 * Returns: JSON [{
 *   response_id: Int,
 *   request_id: Int,
 *   text: String,
 *   catagory: String,
 *   rating: Int,
 *   creation_date: Date String
 * }]
 */
app.get('/get_responses', async (req, res) => {

});

/**
 * Submit a request for a new summary
 * Query Parameters:
 * 1. username: String
 * 2. prompt: String
 * 3. programming_language: String
 * Returns: JSON [{
 *   request_id: Int,
 *   response_id: Int,
 *   text: String,
 *   catagory: String
 * }]
 */
app.get('/submit_request', async (req, res) => {

});

/**
 * Submit a rating for a summary response
 * Query Parameters:
 * 1. response_id: Int,
 * 2. rating: Int
 * Returns: Success or error message
 */
app.post('/rate_response', async (req, res) => {

});

/**
 * Get the summary, catagory, and rating statistics for a given user
 * Query Parameters:
 * 2. username: String
 * Returns: JSON TBD
 */
app.get('/user_statistics', async (req, res) => {

});

/**
 * Get the summary, catagory, and rating statistics for all users combined
 */
app.get('/combined_statistics', async (req, res) => {

})
