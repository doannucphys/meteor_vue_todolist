@ -0,0 +1,2 @@
# meteor_vue_todolist
Demo of reactive todo list using Meteorjs + Vuejs + mongodb<br/>
Alert when deadline come up. If page is not open, when user open, show alert if deadline is in current and previous day.

1. Install meteorjs:<br/>
    on MacOS: curl https://install.meteor.com/ | sh <br/>
    or using Chocolatey in window<br/>
    (see guide on https://www.meteor.com/install)<br/>

2. create data:<br/>
    run script createTasksCollection.js in order to create tasks collections in mongodb data base, go to folder private/db_script and run:<br/>
        mongo  createTasksCollection.js<br/>
    the tasks collection will be created on local mongodb database: 127.0.0.1:27017/demo<br/>

3. start code Meteor + vuejs, run:<br/>
    meteor reset<br/>
    meteor npm i<br/>
    meteor npm run start<br/>

4. go to localhost:3000 to display web.

5. Deploy: <br/>
    - you need to create database on host<br/>
    - Using meteor deploy to deploy code to galaxy (see guide on meteor.com)<br/>
    - or, build code to nodejs code then deploy it on AWS<br/>

Attention!, the code with meteorjs is quite heavy, so, it run quickly on MacBook Pro, but on macbook Air it's litle bit slow, 
and on Window, very very slow (new things are not design for old machine! ).

enjoy!

Doan Quang Tuyen.


Screen capture of demo:
-----------------------------

Layout:

<img src="./docs/screencapture/layout.png" width="400">

Add new task:

<img src="./docs/screencapture/add.png" width="400">

Edit: 

<img src="./docs/screencapture/edit.png" width="400">

Show deadline in real time: 

<img src="./docs/screencapture/deadline.png" width="400">
