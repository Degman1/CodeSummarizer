import supabaseClient from '@supabase/supabase-js';
import express from "express";

const app = express();

const supabase = supabaseClient.createClient("https://klymzdwfxffmowgxmeij.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseW16ZHdmeGZmbW93Z3htZWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4NTU2MTYsImV4cCI6MjAyNzQzMTYxNn0.BrofIOnCRFFfrINR3nqNq15I62_meXXAODilxlXSsA0");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/status", (request, response) => {
  response.send({
    "Status": "Running"
  });
});

app.post('/add_user', async (req, res) => {
  console.log(req.query);
  const {error} = await supabase
      .from('Users')
      .insert({
          username: req.query.username,
          password: req.query.password,
          is_admin: req.query.is_admin === '1'
      })
  if (error) {
      res.send(error);
  } else {
    res.send("User Successfully Created");
  }
});

app.delete('/remove_user', async (req, res) => {
  const {error} = await supabase
      .from('Users')
      .delete()
      .eq('username', req.query.username)
  if (error) {
      res.send(error);
  } else {
    res.send("User Successfully Deleted");
  }
});

