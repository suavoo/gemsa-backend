Gemsa-Backend API

This is a node.js and express.js Backend API for an application where users can find likeminded people for social, civic or political projects. 

Users:
Users will be able to register with a username, valid email address and password. Once registered, login is possible via username and password. On their profiles, users can specify their location and tell others about themselves and what they are interested in in a bio as well as through adding issues they would like to address and the skills they will bring to a project. 

Groups:
Users can form, enter and leave groups. These groups will have a title, location and short description as well as a list of the issues it plans to address.

Calls: 
Users can emit calls for other users to join their cause or project which will be visible to other users depending on location and issues. Calls can also specify skills that are needed for the project as well as contact information and a time. Calls can also be associated with a group by providing the group id as "group: groupId" in the request body.

Messages: 
Users can post messages in response to calls and in groups they are members of. Messages posted to calls will be visible to the user who emitted that call or, if it is associated with a group, to all members of that group. Messages posted in groups will be visible to all members of that group.

Issues & Skills:
Users can tag their profiles, calls and groups with issues they want their project to address and their profiles and calls with skills they can provide or that they need for a project.