define({ "api": [
  {
    "type": "get",
    "url": "/api/contracts",
    "title": "Get Current Contracts",
    "name": "GetContracts",
    "group": "Contacts",
    "description": "<p>Get current contracts for this user. This route requires an id</p>",
    "version": "0.0.0",
    "filename": "./routes/api/contracts.js",
    "groupTitle": "Contacts"
  },
  {
    "type": "get",
    "url": "/api/",
    "title": "Get API Status",
    "name": "GetStatus",
    "group": "Index",
    "description": "<p>Get the current status of the database</p>",
    "version": "0.0.0",
    "filename": "./routes/api/index.js",
    "groupTitle": "Index"
  },
  {
    "type": "get",
    "url": "/api/test",
    "title": "Get test route",
    "name": "GetTest",
    "group": "Test",
    "description": "<p>Send a test get request</p>",
    "version": "0.0.0",
    "filename": "./routes/api/test.js",
    "groupTitle": "Test"
  },
  {
    "type": "post",
    "url": "/api/test",
    "title": "Post test route",
    "name": "PostTest",
    "group": "Test",
    "description": "<p>Send a post request to this test route</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Whatever you want to send, this is a test route</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/test.js",
    "groupTitle": "Test"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Create User",
    "name": "CreateUser",
    "group": "Users",
    "description": "<p>Create a User</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get Specific User",
    "name": "GetUser",
    "group": "Users",
    "description": "<p>Get a single User by providing the id</p>",
    "examples": [
      {
        "title": "Example Usage:",
        "content": "http://barleynet.herokuapp.com/api/user/8eb2301ff3265",
        "type": "json"
      }
    ],
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get User List",
    "name": "GetUsers",
    "group": "Users",
    "description": "<p>Get the list of all users</p>",
    "version": "0.0.0",
    "filename": "./routes/api/users.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/doc/main.js",
    "group": "_home_jj_Desktop_budlab_hackathon_public_doc_main_js",
    "groupTitle": "_home_jj_Desktop_budlab_hackathon_public_doc_main_js",
    "name": ""
  }
] });
