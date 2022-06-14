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

Auth Routes:

"/api/auth/signup"
    Purpose: Users can create an account
    Request Mehtod: POST
    Request Payload: body.username: String
                     body.email: valid Email address
                     body.password: String
                     body.roles (optional): Array of Numbers: "1" = "moderator", "2" = "admin", "3" = "user" (when omitted, role will be assigned to "user")
    Response: Confirmation or Error Message

"/api/auth/signin"
    Purpose: Users can login in order to post calls, enter groups, post messages etc
    Request Method: POST
    Request Payload: body.username: String
                     body.password: String
    Response: User Object (JSON): id: String
                                  username: String
                                  email: String     
                                  roles: [String]
                                  accessToken: JSON Web Token

User Routes:

"/api/users/:id"
    Purpose: Request information about specific user 
    Request Method: GET
    Request Payload: User ID via req.params.id
    Response: User Object (JSON): id: String
                                  username: String
                                  email: String     
                                  location: String
                                  bio: String

"/api/users/groups/:id"
    Purpose: Request array of groups a specific user belongs to
    Request Method: GET
    Request Payload: User ID via req.params.id
    Response: Array usergroups: [
            Group Object (JSON): groupId: String
                                 title: String
                                 location: String
                                 description: String
                                 image: String
        ]

"/api/users/calls/:id"
    Purpose: Request array of calls a specific user has emitted
    Request Method: GET
    Request Payload: User ID via req.params.id
    Response: Array usercalls: [
            Call Object (JSON):  callId: String
                                 title: String
        ]

"/api/users/messages/:id"
    Purpose: Request array of messages of a specific user identified via id in req.params. This information 
            can only be requested by the user himself while logged in
    Request Method: GET
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
    Response: Array of Message Objects (JSON)

"/api/users/mod"
    Purpose: Request content reserved for logged in moderators 
    Request Method: GET
    Request Payload: valid JSON Web Token via req.headers["x-access-token"]
    Response: Not yet specified content/data

"/api/users/admin"
    Purpose: Request content reserved for logged in administrators 
    Request Method: GET
    Request Payload: valid JSON Web Token via req.headers["x-access-token"]
    Response: Not yet specified content/data

Group Routes:

"/api/groups"
    Purpose: Request an array of all group objects
    Request Method: GET
    Request Payload: None
    Response: Array of User Objects (JSON)

"/api/groups/:id"
    Purpose: Request specific group object
    Request Method: GET
    Request Payload: Group ID via req.params.id
    Response: Group Object (JSON)

"/api/groups/users/:id"
    Purpose: Request an array of user objects of all members of a specific group
    Request Method: GET
    Request Payload: Group ID via req.params.id
    Response: Array of User Objects (JSON)
    
"/api/groups/calls/:id"
    Purpose: Request an array of call objects associated with a specific group
    Request Method: GET
    Request Payload: Group ID via req.params.id
    Response: Array of Call Objects (JSON)

"/api/groups/messages/:id"
    Purpose: Request an array of message objects posted in a specific group
    Request Method: GET
    Request Payload: Group ID via req.params.id
    Response: Array of Message Objects (JSON)
  
"/api/groups/:id"
    Purpose: Create new group, only possible when logged in
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.title: String 
                     req.body.location (optional): String
                     req.body.description (optional): String
                     req.body.image (optional): String
    Response: Group Object (JSON)

"/api/groups/:id"
    Purpose: Update group, only possible when logged in and user is member
    Request Method: PUT
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.title: String 
                     req.body.location (optional): String
                     req.body.description (optional): String
                     req.body.image (optional): String
    Response: Group Object (JSON)

"/api/groups/enter/:id"
    Purpose: Enter group, only possible when logged in 
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.groupId: String 
    Response: Confirmation or Error Message

"/api/groups/leave/:id"
    Purpose: Leave group, only possible when logged in and member of group (if the last member leaves, the group
             is deleted)
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.groupId: String 
    Response: Confirmation or Error Message


Call Routes:



Message Routes:


Issue Routes:


Skill Routes:
