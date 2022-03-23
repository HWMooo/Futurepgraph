===================  ABOUT   ===================

Futuregraph is an app that allows users to write a post with a title, username and a body.

On submission of a post it will be stored within a database, the username will be stored as a cookie and all posts from that user will be shown below the post box.

When leaving and returning the username will be saved so posts can still be seen by the original poster.

===================HOW TO RUN===================

in the root directory (Futuregraph):

run - bash _scripts/startDev.sh  

open index.html from client folder or use live server. (currently having issue with localhost:8080 however you may test if you want.)

you may test with a custom username and post the page will refresh on submit to display the post, if you wish to see example posts try to enter into the username field 'Saitama' or 'Mooman ryder'.

to stop run - bash _scripts/stop.sh, bash _scripts/teardown.sh 

===================MORE TO ADD==================

[] - fix localhost:8080.
[] - add testing.
[] - I overlooked the client redirect to a show path. need to redo functionality.
[] - add more functionality such as a show all users button.
[] - Have another input where you can put your username without submitting another post. You dont actually have to submit another post but the username input being in the same place as the other inputs is confusing.