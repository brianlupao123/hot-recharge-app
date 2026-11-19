---
agentTools:
  projectIndex: https://hot-api-v3.readme.io/llms.txt
---

# Check Previous Transaction

How to get the result of previous transaction

# Overview

Description

This endpoint is for checking a transaction that was previously processed. The agent reference is the agent reference used for the transaction in question. This end point will return details of the transaction and its current status.

# Response Model

| Field          | Parameter Type | Description                                       |
| :------------- | :------------- | :------------------------------------------------ |
| AgentReference | string         | Agent Reference of the transaction being querried |
| rawData        | string         | Transaction Information                           |

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
    "/query/transaction/{AgentReference}": {
      "get": {
        "summary": "Check Previous Transaction",
        "description": "How to get the result of previous transaction",
        "operationId": "check-previous-transaction",
        "parameters": [
          {
            "name": "AgentReference",
            "in": "path",
            "description": "Reference provided by the client as part of their transaction",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"transactionReference\": \"123434567890039373667\",\n  \"rawData\": \"{Raw response from the original transaction}”\n}\n"
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
                    "value": "{\n  \"errors\": [\n    {\n      \"name\": \"AgentReference\",\n      \"message\": \"No transaction found for 12\"\n    }\n  ]\n}\n\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string",
                            "example": "AgentReference"
                          },
                          "message": {
                            "type": "string",
                            "example": "No transaction found for 12"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true,
  "_id": "64ff0a6b709108106bf830b1:650025392116bb004d58e182"
}
```