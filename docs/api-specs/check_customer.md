---
agentTools:
  projectIndex: https://hot-api-v3.readme.io/llms.txt
---

# Check Customer

Method for checking Customer details.

# Overview

This is the end point for checking account details. The account number depends on the product. e.g., If product is Zesa the account number will be the meter number.

# Response Model

[block:parameters]
{
  "data": {
    "h-0": "Field",
    "h-1": "Parameter Type",
    "h-2": "Description",
    "0-0": "EndUser",
    "0-1": "string",
    "0-2": "AccountNumber",
    "1-0": "Details",
    "1-1": "Array of keypair values  \nE.g., “parameter”:” value”",
    "1-2": "AdditionalProp1: string  \nAdditionalProp2: string  \nAdditionalProp3: string"
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]

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
    "/query/customer/{ProductId}/{AccountNumber}": {
      "get": {
        "summary": "Check Customer",
        "description": "Method for checking Customer details.",
        "operationId": "check-customer",
        "parameters": [
          {
            "name": "ProductId",
            "in": "path",
            "description": "Id of product",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "AccountNumber",
            "in": "path",
            "description": "Account number for the customer for the product e.g., If product is Zesa, AccountNumber will be the meter number",
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
                    "value": "{\n  \"enduser\": \"3\",\n  \"details\": {\n    \"AccountName\": \"Moyo, Kuda\",\n    \"CurrentBalance\": \"100.20\",\n    \"Currency\": \"USD\"\n  }\n}\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "enduser": {
                      "type": "string",
                      "example": "3"
                    },
                    "details": {
                      "type": "object",
                      "properties": {
                        "AccountName": {
                          "type": "string",
                          "example": "Moyo, Kuda"
                        },
                        "CurrentBalance": {
                          "type": "string",
                          "example": "100.20"
                        },
                        "Currency": {
                          "type": "string",
                          "example": "USD"
                        }
                      }
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
                    "value": "{\n  \"type\": \"https://tools.ietf.org/html/rfc7231#section-6.5.1\",\n  \"title\": \"One or more validation errors occurred.\",\n  \"status\": 400,\n  \"errors\": {\n    \"ProductId\": [\n      \"ProductId is currently not supported. ProductID 6\"\n    ]\n  }\n}\n"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "type": {
                      "type": "string",
                      "example": "https://tools.ietf.org/html/rfc7231#section-6.5.1"
                    },
                    "title": {
                      "type": "string",
                      "example": "One or more validation errors occurred."
                    },
                    "status": {
                      "type": "integer",
                      "example": 400,
                      "default": 0
                    },
                    "errors": {
                      "type": "object",
                      "properties": {
                        "ProductId": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "ProductId is currently not supported. ProductID 6"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "text/plain": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"errors\": [\n        {\n            \"name\": \"Account Query\",\n            \"message\": \"Subscriber 2426605782 does not exist.\"\n        }\n    ]\n}"
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
                            "example": "Account Query"
                          },
                          "message": {
                            "type": "string",
                            "example": "Subscriber 2426605782 does not exist."
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
  "_id": "64ff0a6b709108106bf830b1:650033609034830359008fd8"
}
```