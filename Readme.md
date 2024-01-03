website live at https://tahsin-streams-jwfmrgfltq-as.a.run.app

1. Express in the backend for video processing service video being converted to 360p with Ffmpeg and NextJS in the front end. Both are being served from the google cloud run(two separate services).

2. Firebase cloud functions as APIs, firebase auth for user authentication and goole sign in and Firestore used for storing video metadata and user data.

3. Authenticaed users can upload videos that go to google cloud storage bucket and any one who visits the site can view all the uploaded videos.

4. Pub Sub used to notify the video processing app to start whenever new videos are uploaded to the cloud bucket.
