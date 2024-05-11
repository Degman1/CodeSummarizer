/**
 * Backend Server to serve the REST API endpoints for the CodeSummarizer web application
 */

import supabaseClient from '@supabase/supabase-js';
import express, { request } from "express";
import cors from 'cors';

import * as Summarizer from './summarizer.js';

const app = express();

const supabase = supabaseClient.createClient();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

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
 * @param admin: 'TRUE' || 'FALSE'
 * @return Success or error message
 */
app.post('/add_user', async (req, res) => {
  const { error } = await supabase
    .from('Users')
    .insert({
      username: req.query.username,
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
  const { error } = await supabase
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
 * @param username: String
 * @return JSON {
 *   username: String,
 *   creation_date: Date String,
 *   admin: Boolean
 * }
 */
app.get('/user_information', async (req, res) => {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
 *   title: String,
 *   description: String
 * }]
 */
app.get('/get_user_requests', async (req, res) => {
  const { data, error } = await supabase
    .from('Requests')
    .select('request_id, creation_date, prompt, username, programming_language, title, description')
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
 *   category: String,
 *   rating: Int,
 *   creation_date: Date String
 * }]
 */
app.get('/get_responses', async (req, res) => {
  const { data, error } = await supabase
    .from('Responses')
    .select('response_id, request_id, text, category, rating, creation_date')
    .eq("request_id", req.query.request_id);
  if (error) {
    res.send(error);
  } else {
    res.send(data);
  }
});


import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage to handle the file as a buffer

/**
 * Submit a request for a new summary
 * @param username: String
 * @param prompt: String
 * @param programming_language: String
 * @param title: String
 * @param description: String
 * @return JSON [{
 *   request_id: Int,
 *   response_id: Int,
 *   text: String,
 *   category: String
 * }]
 */
app.post('/submit_request', upload.single('prompt'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Convert buffer to string
  const fileContents = req.file.buffer.toString('utf8');
  const { username, programming_language, title, description } = req.body;
  // console.log(fileContents)
  // console.log(username, programming_language, title, description)

  const { data, error } = await supabase
    .from('Requests')
    .insert({
      prompt: fileContents, // Store the file contents as a string
      username: username,
      programming_language: programming_language,
      title: title,
      description: description,
    }).select();

  if (error) {
    res.send(error);
  }

  const request_data = data;

  const request_id = data[0].request_id;

  if (fileContents.length > 0) { // && fileContents[0].request_id != undefined) {
    // Get the list of responses and their respective catagories
    // TODO: Make the programming language part work
    const responses = await Summarizer.getSummaries(fileContents, programming_language);

    // Add the request id to each response object
    responses.forEach(response => {
      response["request_id"] = request_id;
    });

    // Log the responses
    const { data, error } = await supabase
      .from("Responses")
      .insert(responses)
      .select();

    if (error) {
      res.send(error);
      return;
    }

    // Return the response information
    res.send({
      request: request_data,
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
  const { response_id, rating } = req.body;

  const { error } = await supabase
    .from('Responses')
    .update({ 'rating': rating })
    .eq("response_id", response_id);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.json({ message: "Rating Succeeded" });
  }
});


/**
 * Get the summary, category, and rating statistics for a given user
 * @param username: String
 * @return JSON {
 *   programming_language_counts: {
 *     language_name: usage_count...
 *   }, topic_average_scores: {
 *     topic_name: topic_count...
 *   }
 * }
 */
app.get('/user_statistics', async (req, res) => {

  const languages = await supabase
    .from('Requests')
    .select('programming_language');

  if (languages.error) {
    res.send(languages.error);
  }

  const topics = await supabase
    .from('Responses')
    .select('category, rating');

  const language_counter = {};

  if (languages.data != null) {
    languages.data.forEach(ele => {
      if (language_counter[ele.programming_language]) {
        language_counter[ele.programming_language] += 1;
      } else {
        language_counter[ele.programming_language] = 1;
      }
    });
  }

  const topics_counter = {};

  if (topics.data != null) {
    topics.data.forEach(ele => {
      if (topics_counter[ele.category]) {
        topics_counter[ele.category] += 1;
      } else {
        topics_counter[ele.category] = 1;
      }
    });
  }

  const topics_average_score = {};

  if (topics.data != null) {
    topics.data.forEach(ele => {
      if (topics_average_score[ele.category]) {
        topics_average_score[ele.category] += ele.rating;
      } else {
        topics_average_score[ele.category] = ele.rating;
      }
    });
  }

  for (const [key, value] of Object.entries(topics_average_score)) {
    topics_average_score[key] = value / topics_counter[key];
  }

  if (languages.error) {
    res.send(languages.error);
  } else if (topics.error) {
    res.send(topics.error);
  } else {
    res.send({
      programming_language_counts: language_counter,
      topics_counts: topics_counter,
      topic_average_scores: topics_average_score,
    });
  }
});

/**
 * Get the summary, category, and rating statistics for all users combined
 * @return JSON TBD
 */
app.get('/combined_statistics', async (req, res) => {

});
