---
agentTools:
  projectIndex: https://hot-api-v3.readme.io/llms.txt
---

# Available Products

Get a list of Products available on the API, to find Bundles see Check available Stock using a ProductId from below

# Overview

This method allows for one to query the API for the list of available products in the Hot Recharge system. The ProductId parameter can be provided to filter displayed product options. The API returns a list of all products when ProductId is not provided in the path or ProductId is "0".

```json Sample Available Product Response
{
    "products": [
        {
            "productId": 100,
            "name": "Airtime USD",
            "accountTypeId": 3,
            "requiredOptions": [],
            "metaData": {
                "TargetInfo": "The Target is the Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "300",
                "TargetType": "Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "UndefinedCellular",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 101,
            "name": "Econet USD Airtime",
            "accountTypeId": 3,
            "requiredOptions": [],
            "metaData": {
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "300",
                "TargetType": "Econet Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 102,
            "name": "NetOne USD Airtime",
            "accountTypeId": 3,
            "requiredOptions": [],
            "metaData": {
                "AccountQuery": "Can query end user account balances",
                "TargetInfo": "The Target is the Netone Mobile Number to recharge",
                "RechargeType": "Partial Pinless",
                "MinimumRecharge": "0.50",
                "MaxRecharge": "300",
                "TargetType": "Netone Mobile Number",
                "StockQuery": "Can query available denominations",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "NetOne",
                "NetworkPrefix": "71"
            }
        },
        {
            "productId": 103,
            "name": "Telecel USD Airtime",
            "accountTypeId": 3,
            "requiredOptions": [],
            "metaData": {
                "AccountQuery": "Can query end user account balances",
                "TargetInfo": "The Target is the Telecel Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "300",
                "TargetType": "Telecel Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "Telecel",
                "NetworkPrefix": "73",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 110,
            "name": "Airtime ZiG",
            "accountTypeId": 1,
            "requiredOptions": [],
            "metaData": {
                "TargetInfo": "The Target is the Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "200000",
                "TargetType": "Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "ZiG",
                "Network": "UndefinedCellular",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 111,
            "name": "Econet USD Data&Bundles",
            "accountTypeId": 3,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Pinless",
                "StockQuery": "Can query available data bundles",
                "TargetType": "Econet Mobile Number",
                "Currency": "USD",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 3,
            "name": "Econet USD  ",
            "accountTypeId": 3,
            "requiredOptions": [],
            "metaData": {
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "300",
                "StockQuery": "Can query available data bundles",
                "TargetType": "Econet Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 4,
            "name": "Econet Sasai",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Data",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Econet Mobile Number",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 6,
            "name": "Telecel Airtime",
            "accountTypeId": 1,
            "requiredOptions": [],
            "metaData": {
                "TargetInfo": "The Target is the Telecel Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "200000",
                "TargetType": "Telecel Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "ZiG",
                "Network": "Telecel",
                "NetworkPrefix": "73",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 7,
            "name": "Econet Airtime",
            "accountTypeId": 1,
            "requiredOptions": [],
            "metaData": {
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "200000",
                "AccountQuery": "Can query end user account balances",
                "TargetType": "Econet Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 11,
            "name": "Telecel USD",
            "accountTypeId": 3,
            "requiredOptions": [],
            "metaData": {
                "AccountQuery": "Can query end user account balances",
                "TargetInfo": "The Target is the Telecel Mobile Number to recharge",
                "RechargeType": "Pinless",
                "MinimumRecharge": "0.10",
                "MaxRecharge": "300",
                "TargetType": "Telecel Mobile Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "Telecel",
                "NetworkPrefix": "73",
                "RechargeTypeInformation": "Airtime"
            }
        },
        {
            "productId": 15,
            "name": "Nyaradzo",
            "accountTypeId": 2,
            "requiredOptions": [
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "AccountQuery": "Can query Nyaradzo account details",
                "TargetInfo": "The Target is the Policy Number for payment",
                "RechargeType": "Utility",
                "MinimumRecharge": "10",
                "MaxRecharge": "10000000",
                "Description": "This product is for Nyaradzo and to pay Funeral policy subscriptions",
                "TargetType": "Nyaradzo Policy Number",
                "RechargeAmountIncrement": "0.01",
                "Currency": "ZiG",
                "Network": "Nyaradzo",
                "RechargeTypeInformation": "Utilities & Account Payments"
            }
        },
        {
            "productId": 16,
            "name": "Econet Data",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Data",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Econet Mobile Number",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 17,
            "name": "Econet WhatsApp",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Data",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Econet Mobile Number",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 18,
            "name": "Econet Facebook",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Data",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Econet Mobile Number",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 19,
            "name": "Econet Instagram",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Data",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Econet Mobile Number",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 20,
            "name": "Econet Twitter",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                },
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Econet Mobile Number to recharge",
                "RechargeType": "Data",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Econet Mobile Number",
                "Currency": "ZiG",
                "Network": "Econet",
                "NetworkPrefix": "77",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 24,
            "name": "ZETDC",
            "accountTypeId": 2,
            "requiredOptions": [
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "CustomSMSTagAccountName": "%ACOUNTNAME% - Account name of ZETDC Customer - available to use with product in a the CustomSMS string for a recharge",
                "AccountQuery": "Can query ZETDC Meter account Details",
                "TargetInfo": "The target is the 11 digit ZETDC Meter Number",
                "MinimumRecharge": "10000",
                "MaxRecharge": "10000000",
                "RechargeType": "Utility",
                "TargetType": "ZESA Meter Number",
                "CustomSMSTagKwh": "%KWH% - Units for ZETDC Purchase - available to use with product in a the CustomSMS string for a recharge",
                "CustomSMSTagMeterNumber": "%METERNUMBER% - ZETDC Customer meter number - available to use with product in a the CustomSMS string for a recharge ",
                "RechargeAmountIncrement": "0.01",
                "Currency": "ZiG",
                "Network": "ZESA",
                "RechargeTypeInformation": "Utilities & Account Payments"
            }
        },
        {
            "productId": 30,
            "name": "Telone Voice",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "int",
                    "description": "ProductCode of the Telone bundle to recharge"
                },
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Account Number or Telone number to credit",
                "RechargeType": "Data",
                "AccountQuery": "Can query Telone Account Details",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Telone Number",
                "Currency": "ZiG",
                "Network": "Telone",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 31,
            "name": "Telone Broadband",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "int",
                    "description": "ProductCode of the Telone bundle to recharge"
                },
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Account Number or Telone number to credit",
                "RechargeType": "Data",
                "AccountQuery": "Can query Telone Account Details",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Telone Number",
                "Currency": "ZiG",
                "Network": "Telone",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 32,
            "name": "Telone LTE",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "int",
                    "description": "ProductCode of the Telone bundle to recharge"
                },
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Account Number or Telone number to credit",
                "RechargeType": "Data",
                "AccountQuery": "Can query Telone Account Details",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Telone Number",
                "Currency": "ZiG",
                "Network": "Telone",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 33,
            "name": "Telone Voip",
            "accountTypeId": 1,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "int",
                    "description": "ProductCode of the Telone bundle to recharge"
                },
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Account Number or Telone number to credit",
                "RechargeType": "Data",
                "AccountQuery": "Can query Telone Account Details",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Telone Number",
                "Currency": "ZiG",
                "Network": "Telone",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 35,
            "name": "Netone USD",
            "accountTypeId": 3,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "string",
                    "description": "ProductCode for the bundle to recharge"
                }
            ],
            "metaData": {
                "AccountQuery": "Can query end user account balances",
                "TargetInfo": "The Target is the Netone Mobile Number to recharge",
                "RechargeType": "Partial Pinless",
                "MinimumRecharge": "0.50",
                "MaxRecharge": "300",
                "TargetType": "Netone Mobile Number",
                "StockQuery": "Can query available denominations",
                "Currency": "USD",
                "Network": "NetOne",
                "NetworkPrefix": "71"
            }
        },
        {
            "productId": 40,
            "name": "Telone USD",
            "accountTypeId": 3,
            "requiredOptions": [
                {
                    "name": "ProductCode",
                    "parameterType": "int",
                    "description": "ProductCode of the Telone bundle to recharge"
                }
            ],
            "metaData": {
                "StockQuery": "Can query available data bundles",
                "TargetInfo": "The Target is the Account Number or Telone number to credit",
                "RechargeType": "Data",
                "AccountQuery": "Can query Telone Account Details",
                "CustomSMSTagBundle": "%BUNDLE% - Data Bundle Name - available to use with product in a the CustomSMS string for a recharge set by the API caller",
                "TargetType": "Telone Number",
                "Currency": "USD",
                "Network": "Telone",
                "RechargeTypeInformation": "Data & Bundles"
            }
        },
        {
            "productId": 41,
            "name": "ZETDC USD",
            "accountTypeId": 4,
            "requiredOptions": [
                {
                    "name": "NotifyNumber",
                    "parameterType": "string",
                    "description": "Mobile Number to notify of transaction"
                }
            ],
            "metaData": {
                "CustomSMSTagAccountName": "%ACOUNTNAME% - Account name of ZETDC Customer - available to use with product in a the CustomSMS string for a recharge",
                "AccountQuery": "Can query ZETDC Meter account Details",
                "TargetInfo": "The target is the 11 digit ZETDC Meter Number",
                "MinimumRecharge": "5",
                "MaxRecharge": "10000",
                "RechargeType": "Utility",
                "TargetType": "ZESA Meter Number",
                "CustomSMSTagKwh": "%KWH% - Units for ZETDC Purchase - available to use with product in a the CustomSMS string for a recharge",
                "CustomSMSTagMeterNumber": "%METERNUMBER% - ZETDC Customer meter number - available to use with product in a the CustomSMS string for a recharge",
                "RechargeAmountIncrement": "0.01",
                "Currency": "USD",
                "Network": "ZESA",
                "RechargeTypeInformation": "Utilities & Account Payments"
            }
        }
    ]
}
```
```json Invalid Product Response
{
  "products": []
}
```

# Product Model

| Field name      | Type                                        | Description                                                                            |
| :-------------- | :------------------------------------------ | :------------------------------------------------------------------------------------- |
| ProductId       | int                                         | The Id of product                                                                      |
| Name            | string                                      | Product name e.g.  Econet USD                                                          |
| AccountTypeId   | int                                         | The AccountTypeId of the account that will be charge for purchases of the product      |
| RequiredOptions | List of Recharge Options                    | Additional required fields to be added in a recharge request for the product           |
| MetaData        | Array of Meta Data  e.g “parameter”:”value” | Additional information about the product that can help with understanding the product. |

# Required Options

Additional required fields to be added in a recharge request for the product

| Field name      | Type   | Description                                      |
| :-------------- | :----- | :----------------------------------------------- |
| Name            | string | Name of the required option                      |
| ParameterTypeId | string | Data type name eg. int, string, decimal          |
| Description     | string | A description of the requirements of this option |

## Required Option Example

```json Required Option Example
"RequiredOptions":
[
  {
    "Name":"ProductCode",
    "ParameterTypeId":"string",
    "Description":"Product code use in data bundle"
	}
]
```

# Meta Data

Additional information about the product that can help with understanding the product.

| Field name | Type   | Description                  |
| :--------- | :----- | :--------------------------- |
| Name       | string | Name of the meta information |
| Data       | string | Meta data information        |

## Meta Data Example

```json Meta Data Example
"Meta":
{
  "TargetInfo":"The Target is the Mobile Number to recharge",
  "RechargeType":"Data"
}
```

> 🚧 Parameter: ProductId
>
> ## For Testing
>
> The ProductId parameter below is listed as required but is it optional on the API. When the API returns a list of all products when ProductId is not provided in the path.
>
> ### Example Product Ids
>
> | ProductId | Products Returned                                       |
> | :-------- | :------------------------------------------------------ |
> | 0         | Returns all products                                    |
> | 7         | Returns the certain Econet Products with that ProductId |

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
    "/products/{ProductId?}": {
      "get": {
        "summary": "Available Products",
        "description": "Get a list of Products available on the API, to find Bundles see Check available Stock using a ProductId from below",
        "operationId": "available-products",
        "parameters": [
          {
            "name": "ProductId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"products\": [\n        {\n            \"productId\": 3,\n            \"name\": \"Econet USD\",\n            \"accountTypeId\": 3,\n            \"requiredOptions\": [],\n            \"metaData\": {\n                \"TargetInfo\": \"The Target is the Mobile Number to recharge\",\n                \"RechargeType\": \"Pinless\",\n                \"MinimumRecharge\": \"0.10\",\n                \"MaxRecharge\": \"300\",\n                \"StockQuery\": \"Can query available data bundles\"\n            }\n        },\n        {\n            \"productId\": 4,\n            \"name\": \"Econet Sasai\",\n            \"accountTypeId\": 1,\n            \"requiredOptions\": [\n                {\n                    \"name\": \"ProductCode\",\n                    \"parameterType\": \"string\",\n                    \"description\": \"ProductCode for the bundle to recharge\"\n                }\n            ],\n            \"metaData\": {\n                \"StockQuery\": \"Can query available data bundles\",\n                \"TargetInfo\": \"The Target is the Mobile Number to recharge\",\n                \"RechargeType\": \"Data\"\n            }\n        },\n        {\n            \"productId\": 5,\n            \"name\": \"Easy Call\",\n            \"accountTypeId\": 1,\n            \"requiredOptions\": [],\n            \"metaData\": {\n                \"AccountQuery\": \"Can query end user account balances\",\n                \"TargetInfo\": \"The Target is the Mobile Number to recharge\",\n                \"RechargeType\": \"Pinless\",\n                \"MinimumRecharge\": \"0.10\",\n                \"MaxRecharge\": \"200000\"\n            }\n        } \n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "products": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "productId": {
                            "type": "integer",
                            "example": 3,
                            "default": 0
                          },
                          "name": {
                            "type": "string",
                            "example": "Econet USD"
                          },
                          "accountTypeId": {
                            "type": "integer",
                            "example": 3,
                            "default": 0
                          },
                          "requiredOptions": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {}
                            }
                          },
                          "metaData": {
                            "type": "object",
                            "properties": {
                              "TargetInfo": {
                                "type": "string",
                                "example": "The Target is the Mobile Number to recharge"
                              },
                              "RechargeType": {
                                "type": "string",
                                "example": "Pinless"
                              },
                              "MinimumRecharge": {
                                "type": "string",
                                "example": "0.10"
                              },
                              "MaxRecharge": {
                                "type": "string",
                                "example": "300"
                              },
                              "StockQuery": {
                                "type": "string",
                                "example": "Can query available data bundles"
                              }
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
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
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
  "_id": "64ff0a6b709108106bf830b1:64ff3b513f4c27005179b322"
}
```