# Video-Server

To learn backend developement and to dig deep into node.js ,express.js ,mongodb and all that
good stuff, worked on a video server which allows you to signIn , make an account , upload videos,generate thumbnails, 
and also view them playing in the dashboard.

<h1>Steps which were followed</h1>

<h2>1.SignUp, SignIn and connecting it to database</h2>

<h3>->Node.Js, Express.Js</h3> As the backend pillars<br>
<h3>-> MongoDb</h3> Database for creating a local storage through mongoose.<br>
<h3>->Postman</h3> For testing the URL's<br>
<h3>->Bcrypt</h3> Is a npm package which is used to store the password in a encrypted form and also used to decrypt the password.<br>
<h3>->Morgan</h3> Is a Node.Js middleware which handles requests and errors<br>
<h3>->Body-Parser</h3> For parsing the requests in to  middlewares before you actually handle it<br>
<h3>->Nodemon</h3> For restarting the server everytime<br>


<h2>2.Token Generation</h2>

<h3>->JsonWebToken</h3> For generating tokens<br>

<h2>3.Video upload and Thumbnail generation</h2>

<h3>->React-Toastify</h3> For getting the upload status of the video and notifications.<br>
<h3>->React-Strap</h3> For getting all the bootsrap classes automatically.<br>
<h3>->FFMPEG</h3> For generating the thumbnails of uploaded videos.<br>
<h3>->Axios</h3> For sending GET,POST requests to the server side.<br>
<h3>->Bootstrap</h3> For styling purpose.<br>
<h3>->React-Router-Dom</h3> For creating routes at client side.<br>
<h3>->Multer</h3> A middleware used for uploading files.<br>
