# ConnectLearn : E-Learning Website

<br/>

## Introduction (❁´◡`❁):

This is full-fledged E-Learning Website with all the basic things which any other website would used to have like signup and login page, profile updation page, Main page showing list of all courses, our website's testimonials, at the last contact us things. I have also made this mobile responsive so that mobile users can also get an experience of this application.

> **_Note:_** Please note that till the time you are using it might be possible that the backend or frontend url might not work since I am on the free tier which is provided only for limited time and limited use.

Although there are still much things left out in this for me to work upon which I will surely add (specially in the admin point of view) like, adding or deleting courses or users that are curretly enrolled and much more.

 <!-- Now without wasting more time give it a short using the below provided demo link and then share your experience in this [post](https://www.linkedin.com/posts/priyanshu-baran_chatapplication-realtimechat-socketio-activity-7078430944554065920-BhLM?utm_source=share&utm_medium=member_desktop). -->

---

## Demo 👀

<!-- You can view the demo of this website by following [this link](https://main.d1fwnnaavf7968.amplifyapp.com/). You can also go and watch out this demonstration video [here](https://clipchamp.com/watch/B3gtuU7A1nO).<br> -->

For hosting, I have used one of the popular aws service **AWS Amplify** to host the frontend and [Render](https://dashboard.render.com/) to host the backend.

> **_Note:_** You can also go with amplify for backend as well but this is something which I am still working on, so let me know if anyone knows about this to get my job done.

---

## ✅ Steps to start with:

### Firstly ensure that you are ready with these things:

- Node installed in your system (check it by running either `node -v` or `npm -v` in your terminal)
- URI String for MongoDB Atlas connection from [here](https://cloud.mongodb.com/v2/63c0084fb7eec9687474067f#/clusters/detail/Cluster-1/connect?clusterId=Cluster-1)
- [AWS](https://aws.amazon.com/console/) Account

### After that:

1. Now clone this repo and navigate to the cloned folder.
   > git clone https://github.com/priyanshu-baran/E-Learning_Website.git && cd E-Learning_Website
2. Open that cloned folder in VS Code and before moving further, simply open two terminals one with `frontend` folder and other with `backend` folder.
3. Install all the dependencies needed for this project by running this command (in both terminals seperately).
   > npm install
4. Then do the required changes needed before running it, like replacing all the stuffs that you have, with mine one. For this you can simply create one `.env` file inside the backend folder and aws-exports.js in frontend folder. And add all that stuffs right inside it with appropriate name.
   > **_Note:_** I have already defined these terms so be-careful so that you use that names only or else change in all places wherever it is used according to your wish.
5. Now create your own aws cognito user pools and setup the build settings according to your requirements by leaving almost all other fields as default one. Now after successfull creation of user pool, head on to its settings and search for userpoolID and webclientID and save it somewhere in your project since we will use it inside our `frontend/src/App.js` file.
   <!-- > **_Note:_** If you want to use your firebase project to connect then you have to change the `initializeApp` object declared in the frontend/src/index.js file with your own. Or else keep it like that only and let me see who are actually using this application 👀 (Just for fun...😜😜😝). -->
6. Now, since all setup part is done so let's move ahead by running this command, again in both the terminals seperately.
   > npm start
7. If both of your terminals runs smoothly without showing any error, then congrats 🥳🎉 you are in good state, else re-config your setup and try again 🤕🫣.

---

## Contributing 📝

If you would like to contribute to this repo `'E-Learning_Website'` then, please fork the repository and submit a pull request with your changes. Contributions are welcome and encouraged!

---

## Like this project? 🤩

If you are feeling generous, buy me a coffee...!!! ☕<br/>

<a href="https://www.buymeacoffee.com/priyanshubaran" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

---

### Happy Coding...!! 👨🏽‍💻👨🏽‍💻
