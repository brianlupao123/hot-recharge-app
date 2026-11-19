---
agentTools:
  projectIndex: https://hot-api-v3.readme.io/llms.txt
---

# Login

How to get a JWT Token from API

# Overview

Correct credentials i.e., AccessCode and password will need to be supplied in order to get a bearer token. A bearer token and a refresh token is returned upon successful login. The bearer token will only be active for a period of time after which it will expire. Store the refresh token to use in the refresh process after you receive an expired token message.  Or login again to get a new token.

# Authentication Request

| Field      | Type   | Description                                                                                    |
| :--------- | :----- | :--------------------------------------------------------------------------------------------- |
| AccessCode | string | Username used to log in to Hot Recharge account. This can be an email address or phone number. |
| Password   | string | Password for logging in to Hot Recharge account                                                |

```json Valid Auth Request
{
  "AccessCode": "0772000000",
  "Password": "John-is-good-boy@0123"
}
```
```json Invalid Auth Request
{
  "AccessCode": "0775464462444",
  "Password": "0"
}
```

# Authentication Response Model

| Field        | Type   | Description                                           |
| :----------- | :----- | :---------------------------------------------------- |
| token        | string | JWT Token for use in header for requests to endpoints |
| refreshToken | string | Refresh Token for use in refreshing token             |

```json Successful Auth Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGhvdC5jby56dyIsImp0aSI6IjFkNjI2YjkwLTJjZjctNGQyMC04NzllLTczODg1ZGQ0ZDliYSIsImVtYWlsIjoidGVzdEBob3QuY28uenciLCJpZCI6IjEyMzQ1NiIsIkFjY291bnRJZCI6IjEyMzQ1NiIsIm5iZiI6MTY5NDUwNDc0NywiZXhwIjoxNjk0NTA1MDQ3LCJpYXQiOjE2OTQ1MDQ3NDd9.7x0bZu8Q_Kxlvou_4TzXaiProbAnv2sYL1uwKxfGoWE",
    "refreshToken": "GbJKHE7zww6Ng9vsbzmuo6G19k6aL+UxVox+ITeQz7E="
}
```
```json Failed Auth Response
{
  "errors": [
    "User/password combination is wrong."
  ]
}
```

> 🚧 Have you tried it?
>
> Don't forget to copy your token after trying it, you will need it later.

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Hot API v3",
    "version": "3.0"
  },
  "servers": [
    {
      "url": "https://ssl.hot.co.zw/api/v3/"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "oauth2",
        "flows": {
          "clientCredentials": {
            "tokenUrl": "https://example.com/oauth2/token",
            "scopes": {}
          }
        }
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/identity/login": {
      "post": {
        "summary": "Login",
        "description": "How to get a JWT Token from API",
        "operationId": "login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "AccessCode",
                  "Password"
                ],
                "properties": {
                  "AccessCode": {
                    "type": "string",
                    "description": "Email or phone number that is used to"
                  },
                  "Password": {
                    "type": "string",
                    "description": "Password for the AccessCode to log in to Hot Recharge"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGhvdC5jby56dyIsImp0aSI6IjFkNjI2YjkwLTJjZjctNGQyMC04NzllLTczODg1ZGQ0ZDliYSIsImVtYWlsIjoidGVzdEBob3QuY28uenciLCJpZCI6IjEyMzQ1NiIsIkFjY291bnRJZCI6IjEyMzQ1NiIsIm5iZiI6MTY5NDUwNDc0NywiZXhwIjoxNjk0NTA1MDQ3LCJpYXQiOjE2OTQ1MDQ3NDd9.7x0bZu8Q_Kxlvou_4TzXaiProbAnv2sYL1uwKxfGoWE\",\n    \"refreshToken\": \"GbJKHE7zww6Ng9vsbzmuo6G19k6aL+UxVox+ITeQz7E=\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string",
                      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGhvdC5jby56dyIsImp0aSI6IjFkNjI2YjkwLTJjZjctNGQyMC04NzllLTczODg1ZGQ0ZDliYSIsImVtYWlsIjoidGVzdEBob3QuY28uenciLCJpZCI6IjEyMzQ1NiIsIkFjY291bnRJZCI6IjEyMzQ1NiIsIm5iZiI6MTY5NDUwNDc0NywiZXhwIjoxNjk0NTA1MDQ3LCJpYXQiOjE2OTQ1MDQ3NDd9.7x0bZu8Q_Kxlvou_4TzXaiProbAnv2sYL1uwKxfGoWE"
                    },
                    "refreshToken": {
                      "type": "string",
                      "example": "GbJKHE7zww6Ng9vsbzmuo6G19k6aL+UxVox+ITeQz7E="
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"User/password combination is wrong.\"\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "User/password combination is wrong."
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true,
  "_id": "64ff0a6b709108106bf830b1:64ff0d88db6f630950f3cf32"
}
```