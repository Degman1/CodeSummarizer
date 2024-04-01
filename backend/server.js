/**
 * Backend Server to serve the REST API endpoints for the CodeSummarizer web application
 */

import supabaseClient from '@supabase/supabase-js';
import express, { request } from "express";
import * as Summarizer from './summarizer.js';

const app = express();

const supabase = supabaseClient.createClient("https://klymzdwfxffmowgxmeij.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseW16ZHdmeGZmbW93Z3htZWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4NTU2MTYsImV4cCI6MjAyNzQzMTYxNn0.BrofIOnCRFFfrINR3nqNq15I62_meXXAODilxlXSsA0");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * Tests the status of the backend server
 * @return JSON { status: String }
 */
app.get("/status", (request, response) => {
  response.send({
    "Status": "Running"
  });
});

/**
 * Add a new user
 * @param username: String
 * @param password: String
 * @param admin: 'TRUE' || 'FALSE'
 * @return Success or error message
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
 * @param username: String
 * @return Success or error message
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
 * @param username: String
 * @return JSON {
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
 * @return JSON [{
 *   username: String,
 *   creation_date: Date String,
 *   admin: Boolean
 * }]
 */
app.get('/all_user_information', async (req, res) => {
  const {data, error} = await supabase
    .from('Users')
    .select('username, creation_date, admin');
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});

/**
 * Get all the summary requests for a given user
 * @param username: String
 * @return JSON [{ 
 *   request_id: Int,
 *   creation_date: Date String,
 *   prompt: String,
 *   username: String,
 *   programming_language: String
 * }]
 */
app.get('/get_user_requests', async (req, res) => {
  const {data, error} = await supabase
    .from('Requests')
    .select('request_id, creation_date, prompt, username, programming_language')
    .eq("username", req.query.username);
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});

/**
 * Get all the responses for a user's given request
 * @param request_id: Int
 * @return JSON [{
 *   response_id: Int,
 *   request_id: Int,
 *   text: String,
 *   catagory: String,
 *   rating: Int,
 *   creation_date: Date String
 * }]
 */
app.get('/get_responses', async (req, res) => {
  const {data, error} = await supabase
    .from('Responses')
    .select('response_id, request_id, text, catagory, rating, creation_date')
    .eq("request_id", req.query.request_id);
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});

/**
 * Submit a request for a new summary
 * @param username: String
 * @param prompt: String
 * @param programming_language: String
 * @return JSON [{
 *   request_id: Int,
 *   response_id: Int,
 *   text: String,
 *   catagory: String
 * }]
 */
app.get('/submit_request', async (req, res) => {
  // Log the request
  const {data, error} = await supabase
    .from('Requests')
    .insert({
      prompt: req.query.prompt,
      username: req.query.username,
      programming_language: req.query.programming_language,
    })
    .select();

  if (error) {
    res.send(error);
    return;
  }

  const request_data = () => data[0];

  if (data.length > 0 && data[0].request_id != undefined) {
    // Get the list of responses and their respective catagories
    let responses = Summarizer.getSummaries(req.query.prompt, req.query.programming_language);

    // Add the request id to each response object
    responses.forEach(response => {
      response["request_id"] = request_data().request_id;
    });

    // Log the responses
    const {data, error} = await supabase
      .from('Responses')
      .insert(responses)
      .select();

    if (error) {
      res.send(error);
      return;
    }

    // Return the response information
    res.send({
      request: request_data(),
      responses: data
    });
  } else {
    res.send("Failed to log request");
  }
});

/**
 * Submit a rating for a summary response
 * @param response_id: Int,
 * @param rating: Int
 * @return Success or error message
 */
app.post('/rate_response', async (req, res) => {

  // TODO send the ratings to ChatGPT?

  const {error} = await supabase
    .from('Responses')
    .update({'rating': req.query.rating})
    .eq("response_id", req.query.response_id);
  if (error) {
    res.send(error);
  } else {
    res.send("Rating Succeded");
  }
});

/**
 * Get the summary, catagory, and rating statistics for a given user
 * @param username: String
 * @return JSON TBD
 */
app.get('/user_statistics', async (req, res) => {

});

/**
 * Get the summary, catagory, and rating statistics for all users combined
 * @return JSON TBD
 */
app.get('/combined_statistics', async (req, res) => {

});
