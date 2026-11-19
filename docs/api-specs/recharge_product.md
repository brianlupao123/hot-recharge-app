---
agentTools:
  projectIndex: https://hot-api-v3.readme.io/llms.txt
---

# Recharge Product

This is how to recharge an account with the different products available with HOT Recharge.

# Overview

This method allows you to make recharges for any of the HOT Recharge products. Please note that for the Data Bundles product, you need to provide a ProductCode , check below to see how to get ProductCode.

# Recharge Request Model

For a successful recharge you need to provide the following information: AgentReference , ProductId , Target, Amount. Although not required you can also provide the following additional information: Customer SMS, RechargeOptions.

| Field name      | Type                     | Description                                                                                                                                            |
| :-------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AgentReference  | string                   | Reference provided by client that can be used to query the transaction later.                                                                          |
| ProductId       | int                      | Hot Recharge Product Id                                                                                                                                |
| Target          | string                   | The target of a recharge, this can be a mobile number, meter or account number. Requirements of each product differ and are specified in product meta. |
| Amount          | double                   | The value of the recharge.                                                                                                                             |
| CustomerSMS     | string                   | Custom SMS to be use in the customer notification SMS.                                                                                                 |
| RechargeOptions | List of Recharge Options | Recharge Option for recharge if required by the product.                                                                                               |

> 🚧 Agent References
>
> Retailers, Aggregators and multiple site users are advised to insert meaningful agent references to help with reporting and reconciliation. The example below demonstrates an easily identifiable format and reference sample.
>
> Format Sample: DivisionID-ShopID-TillNumber-TellerID-SalesInvoice/ReceiptNumber-LineNumber
>
> Sample Reference: HRE-CBD01-01-KUDA01-100001-01

<br />

## Getting a ProductId

To get a ProductId for the product you want to recharge, navigate to the Available Products page by clicking this link [Available Products](https://hot-api-v3.readme.io/reference/available-products). Copy the productId of the specific product you want, that is the value you enter in the ProductId field.

## Getting a ProductCode

To get a ProductCode for the Data Bundles product, navigate to the Check Available Stock page by clicking this link [Check Available Stock](https://hot-api-v3.readme.io/reference/check-stock)

# Reserved Recharge

## Overview

This allows for retailers to send a two stage recharge request where the initial request only reserves the recharge and the second stage will complete the recharge. This is useful in situations where the payment processor have additional steps to complete or recharge needs to be delayed for a period but letting the customer know that a transaction is pending on their behalf.

## Reservation Recharge Options

| Recharge Option              | Type | Description                                                                                                                       |
| :--------------------------- | :--- | :-------------------------------------------------------------------------------------------------------------------------------- |
| MakeReservation              | bool | The field is used to mark that the recharge request is a reserved transaction.                                                    |
| SendReservationSMSToCustomer | bool | Optional field to indicate that a message to the customer to let them know that a transaction to recharge them has been reserved. |

## Response & Completion of Transaction

The response is for a reserved transaction is the same as a normal recharge request. Please take not of the Agent Reference used for the request as it will be required in the 2nd stage to complete or cancel the reservation. [Complete Transaction](https://hot-api-v3.readme.io/reference/complete-reserved-recharge)

# Custom SMS Template

The Hot recharge API allows for you to send a custom SMS to the customers that you recharge. The custom SMS field allows for you to use the below tags as placeholders in your message. The API will fill in the correct value in the message to the customer. Below is a list of the standard tags that can be used in any message but in the meta data of each product additional tags are available that are specific to each product.

| TAG              | Format  | Description                                                           |
| :--------------- | :------ | :-------------------------------------------------------------------- |
| %AMOUNT%         | $XXX.XX | The value of the transaction                                          |
| %INITIALBALANCE% | $XXX.XX | End users initial balance for before transaction                      |
| %BALANCE%        | $XXX.XX | End users final balance for after transaction                         |
| %COMPANYNAME%    | string  | Company name set on the website [www.hot.co.zw](http://www.hot.co.zw) |
| %ACCESSNAME%     | string  | User's name defined on website for the sender                         |

# Examples

## Requests

Below are samples of different types of custom Recharge Requests.

```json Airtime Request
{
    "agentReference": "{{AgentReference}}",
    "productId": 100,
    "target": "0772929223",
    "amount": 10
}
```
```json Data Recharge Request
{
    "agentReference": "{{AgentReference}}",
    "productId": 16,
    "target": "0772929223",
    "amount": 284,
    "RechargeOptions": [
    {
      "Name": "ProductCode",
      "ParameterType": "string",
      "Value": "DDB20"
    }
  ]
}
```
```json ZESA Request
{
    "agentReference": "{{AgentReference}}",
    "productId": 24,
    "target": "{{MeterNumber}}",
    "amount": 100000,
    "RechargeOptions": [
    {
      "Name": "NotifyNumber",
      "ParameterType": "string",
      "Value": "0772929223"
    }
  ]
}
```

## Example Requests with Custom SMS

```json Airtime Purchase
{
    "agentReference": "{{AgentReference}}",
    "productId": 7,
    "target": "0772397464",
    "amount": 10,
    "CustomsSMS":"%COMPANYNAME% topped up your account with $%AMOUNT%. Your new balance is $%BALANCE%."
}
```
```Text ZESA Token Purchase
{
    "agentReference": "{{AgentReference}}",
    "productId": 24,
    "target": "{{MeterNumber}}",
    "amount": 100000,
    "CustomsSMS":"A ZETDC token was purchased for %ACOUNTNAME% (%METERNUMBER%) valued %AMOUNT% that resulted in %KWH% units."
    "RechargeOptions": [
    {
      "Name": "NotifyNumber",
      "ParameterType": "string",
      "Value": "0772929223"
    }
  ]
}
```

## Example Request with Reserved Transaction

```json Reserved Recharge Request
{
   "agentReference": "{{AgentReference}}",
    "productId": 100,
    "target": "0772929223",
    "amount": 10,
    "RechargeOptions": [
    {
      "Name": "MakeReservation",
      "ParameterType": "bool",
      "Value": "true"
    }
  ]
}
```
```json Reserved with Customer SMS
{
   "agentReference": "{{AgentReference}}",
    "productId": 100,
    "target": "0772929223",
    "amount": 10,
    "RechargeOptions": [
    {
      "Name": "MakeReservation",
      "ParameterType": "bool",
      "Value": "true"
    },
    {
      "Name":"SendReservationSMSToCustomer",
      "ParameterType": "bool",
      "Value": "true"
    }
  ]
}
```

<br />

## Responses

```json Successful Airtime
{
    "successful": true,
    "rechargeId": 182255554,
    "amount": 10,
    "discount": 0,
    "balance": {
        "accountTypeId": 1,
        "name": "ZiG",
        "balance": 8985.73
    },
    "message": "Recharge to 0716047102 of $10.23 was successful. The initial balance was $32,451.22 final balance is $32,461.45",
    "rechargeData": {
        "InitialBalance": "32451.219236",
        "FinalBalance": "32461.449236"
    }
}
```
```json Successful Data
{
    "successful": true,
    "rechargeId": 182362390,
    "amount": 284,
    "discount": 0,
    "balance": {
        "accountTypeId": 1,
        "name": "ZiG",
        "balance": 8067.23
    },
    "message": "OK",
    "rechargeData": {}
}
```
```json Failed Recharge
{
    "successful": false,
    "rechargeId": 182362358,
    "amount": 10,
    "discount": 0,
    "balance": {
        "accountTypeId": 1,
        "name": "ZiG",
        "balance": 8351.23
    },
    "message": "Mobile Number not a prepaid subscriber",
    "rechargeData": {}
}
```

## Errors

```json Missing Recharge Option Response
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
        "ProductId": [
            "ProductId is currently not supported. ProductID 0"
        ]
    }
}
```
```json Invalid Product Code
{
    "errors": [
        {
            "name": "Product",
            "message": "\"Invalid Product Code\" DDB2"
        }
    ]
}
```

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
    "/products/recharge": {
      "post": {
        "summary": "Recharge Product",
        "description": "This is how to recharge an account with the different products available with HOT Recharge.",
        "operationId": "recharge-product",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "AgentReference",
                  "ProductId",
                  "Target",
                  "Amount"
                ],
                "properties": {
                  "AgentReference": {
                    "type": "string",
                    "description": "Reference provided by client that can be use to query the transaction later",
                    "default": "{{GUID}}"
                  },
                  "ProductId": {
                    "type": "integer",
                    "description": "Hot Recharge Product Id",
                    "default": 100,
                    "format": "int32"
                  },
                  "Target": {
                    "type": "string",
                    "description": "The target of a recharge, this can be a mobile number, meter or account number. Requirements of each product differ and are specified in product meta.",
                    "default": "0772929223"
                  },
                  "Amount": {
                    "type": "number",
                    "description": "The value of the recharge",
                    "default": 0.1,
                    "format": "double"
                  },
                  "CustomerSMS": {
                    "type": "string",
                    "description": "Custom SMS to be use in the customer notification sms"
                  },
                  "RechargeOptions": {
                    "type": "array",
                    "description": "Recharge Option for recharge if required by the product",
                    "items": {
                      "properties": {
                        "Name": {
                          "type": "string",
                          "description": "Name of the field of the recharge option"
                        },
                        "ParameterType": {
                          "type": "string",
                          "description": "Data Type of value of recharge option"
                        },
                        "Value": {
                          "type": "string",
                          "description": "The Value of the recharge option"
                        }
                      },
                      "type": "object"
                    }
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
                    "value": "{\n    \"successful\": true,\n    \"rechargeId\": 182255554,\n    \"amount\": 10,\n    \"discount\": 0,\n    \"balance\": {\n        \"accountTypeId\": 1,\n        \"name\": \"ZWL\",\n        \"balance\": 8985.73\n    },\n    \"message\": \"Recharge to 0716047102 of $10.23 was successful. The initial balance was $32,451.22 final balance is $32,461.45\",\n    \"rechargeData\": {\n        \"InitialBalance\": \"32451.22\",\n        \"FinalBalance\": \"32461.45\"\n    }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "successful": {
                      "type": "boolean",
                      "example": true,
                      "default": true
                    },
                    "rechargeId": {
                      "type": "integer",
                      "example": 182255554,
                      "default": 0
                    },
                    "amount": {
                      "type": "integer",
                      "example": 10,
                      "default": 0
                    },
                    "discount": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "balance": {
                      "type": "object",
                      "properties": {
                        "accountTypeId": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "name": {
                          "type": "string",
                          "example": "ZWL"
                        },
                        "balance": {
                          "type": "number",
                          "example": 8985.73,
                          "default": 0
                        }
                      }
                    },
                    "message": {
                      "type": "string",
                      "example": "Recharge to 0716047102 of $10.23 was successful. The initial balance was $32,451.22 final balance is $32,461.45"
                    },
                    "rechargeData": {
                      "type": "object",
                      "properties": {
                        "InitialBalance": {
                          "type": "string",
                          "example": "32451.22"
                        },
                        "FinalBalance": {
                          "type": "string",
                          "example": "32461.45"
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
                    "value": "{\n    \"type\": \"https://tools.ietf.org/html/rfc7231#section-6.5.1\",\n    \"title\": \"One or more validation errors occurred.\",\n    \"status\": 400,\n    \"errors\": {\n        \"ProductId\": [\n            \"ProductId is currently not supported. ProductID 0\"\n        ]\n    }\n}"
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
                            "example": "ProductId is currently not supported. ProductID 0"
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
  "_id": "64ff0a6b709108106bf830b1:64ff5921e786430044bb83c7"
}
```