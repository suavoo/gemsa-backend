Gemsa-Backend API

This is a node.js and express.js Backend API for an application where users can find likeminded people for social, civic or political projects. I use MySQL as the database and Sequelize as the ORM.

Users:
Users will be able to register with a username, valid email address and password. Once registered, login is possible via username and password. On their profiles, users can specify their location and tell others about themselves and what they are interested in in a bio as well as through adding issues they would like to address and the skills they will bring to a project. 

Groups:
Users can form, enter and leave groups. These groups will have a title, location and short description as well as a list of the issues it plans to address.

Calls: 
Users can emit calls for other users to join their cause or project which will be visible to other users depending on location and issues. Calls can also specify skills that are needed for the project as well as contact information and a time. Calls can also be associated with a group by providing the group id as "group: groupId" in the request body.

Comments: 
Users can post comments in response to calls and in groups they are members of. Comments posted to calls will be visible to the user who emitted that call or, if it is associated with a group, to all members of that group. Comments posted in groups will be visible to all members of that group.

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

"/api/users/comments/:id"
    Purpose: Request array of comments of a specific user identified via id in req.params. This information 
            can only be requested by the user himself while logged in
    Request Method: GET
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
    Response: Array of Comment Objects (JSON)

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

"/api/groups/comments/:id"
    Purpose: Request an array of comment objects posted in a specific group
    Request Method: GET
    Request Payload: Group ID via req.params.id
    Response: Array of Comment Objects (JSON)
  
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

"/api/calls"
    Purpose: Request an array of all call objects
    Request Method: GET
    Request Payload: None
    Response: Array of Call Objects (JSON)

"/api/calls/:id"
    Purpose: Request one specific call object identified via ID in req.params
    Request Method: GET
    Request Payload: Call ID via req.params.id
    Response: Call Object (JSON)

"/api/calls/comments/:id"
    Purpose: Request array of comment objects posted to specific call
    Request Method: GET
    Request Payload: Call ID via req.params.id
    Response: Array of Comment Objects (JSON)

"/api/calls/:id"
    Purpose: Create call when user is logged in. If a Goup ID is provided via req.body.group, call will be associated 
             with this group
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.title: String
                     req.body.location (optional): String
                     req.body.time (optional): String
                     req.body.contactinfo (optional): String
                     req.body.description (optional): String
                     req.body.group (optional): String
                     req.body.image (optional): String
    Response: Confirmation or Error message
      
"/api/calls/:id"
    Purpose: Update call when user is logged in and created the call
    Request Method: PUT
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.callId: String
                     req.body.title: String
                     req.body.location (optional): String
                     req.body.time (optional): String
                     req.body.contactinfo (optional): String
                     req.body.description (optional): String
                     req.body.group (optional): String
                     req.body.image (optional): String
    Response: Confirmation or Error message
    
"/api/calls/:id"
    Purpose: Delete call when user is logged in and created the call
    Request Method: DELETE
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.callId: String
    Response: Confirmation or Error message

Comment Routes:

"/api/comments/:id"
    Purpose: Create comment when logged in. Can be posted to Group or Call by providing the ID via req.body.otherId
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.otherId (optional): String
                     req.body.text: String
    Response: Confirmation or Error message

"/api/comments/:id"
    Purpose: Delete message when logged in and user has created the message
    Request Method: DELETE
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.body.commentId: String
    Response: Confirmation or Error message

Skill Routes:

"/api/skills"
    Purpose: Request array of all skill objects
    Request Method: GET
    Request Payload: None
    Response: Array of Skill Objects (JSON)
      
"/api/skills/:id"
    Purposse: Request one specific skill object
    Request Method: GET
    Request Payload: Skill ID via req.params
    Response: Skill Object (JSON)
    
"/api/skills/of/:id",
    Purpose: Request array of skill objects of specific user or call
    Request Method: GET
    Request Payload: User or Call ID via req.params
    Response: Array of Skill Objects (JSON)

"/api/skills/:id"
    Purpose: Create new skill when logged in. When Call ID is provided via optional req.body.target, skill will 
             be added to Call, if omitted, it will be added to user
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.target (optional): String
                     req.body.name: String
    Response: Confirmation or Error message

"/api/skills/add/:id"
    Purpose: Add existing skill to User or Call when logged in. When Call ID is provided via optional req.body.target, 
             skill will be added to Call, if omitted, it will be added to user
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.target (optional): String
                     req.body.skillId: String
    Response: Confirmation or Error message

"/api/skills/remove/:id"
    Purpose: Remove existing skill from User or Call when logged in. When Call ID is provided via optional 
             req.body.target, skill will be removed from Call, if omitted, it will be removed from user
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.target (optional): String
                     req.body.skillId: String
    Response: Confirmation or Error message

Issue Routes:

"/api/issues"
    Purpose: Request array of all issue objects
    Request Method: GET
    Request Payload: None
    Response: Array of Issue Objects (JSON)

"/api/issues/:id"
    Purpose: Request specific issue object
    Request Method: GET
    Request Payload: Issue ID via req.params
    Response: Issue Object (JSON)

"/api/issues/of/:id"
    Purpose: Request array of issue objects of specific user, group or call
    Request Method: GET
    Request Payload: User, Group or Call ID via req.params
    Response: Array of Issue Objects (JSON)

"/api/issues/:id"
    Purpose: Create new skill when logged in. When Call or Group ID is provided via optional req.body.target, issue 
             will be added to Call or Group respectively, if omitted, it will be added to user
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.target (optional): String
                     req.body.name: String
    Response: Confirmation or Error message

"/api/issues/add/:id"
    Purpose: Add existing issue to User, Group or Call when logged in. When Call ID is provided via optional 
             req.body.target, issue will be added to Call or Group respectively, if omitted, it will be added to user
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.target (optional): String
                     req.body.issueId: String
    Response: Confirmation or Error message

"/api/issues/remove/:id"
    Purpose: Remove existing issue from User, Group or Call when logged in. When Call ID is provided via optional 
             req.body.target, issue will be removed from Call, if omitted, it will be removed from user
    Request Method: POST
    Request Payload: User ID via req.params.id
                     valid JSON Web Token of same user via req.headers["x-access-token"]
                     req.params.id: String
                     req.body.target (optional): String
                     req.body.issueId: String
    Response: Confirmation or Error message