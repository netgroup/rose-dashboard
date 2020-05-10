module.exports ={
    "openapi": "3.0.0",
    "info": {
        "title": "Rose",
        "description": "Rose",
        "version": "0.1"
    },
    "servers": [
        {
            "url": "http://localhost",
            "description": "Local development server"
        }
    ],
    "tags": [
        {
            "name": "Authentication",
            "description": "Authentication related calls"
        },
        {
            "name": "Users",
            "description": "User related calls"
        }
    ],
    "paths": {
        "/dashboard": {
            "get": {
                "tags": [
                    "Dashboard"
                ],
                "summary": "Get data of Dashboard",
                "operationId": "Dashboard.get",
                "responses": {
                    "200": {
                        "description": "Returns a object",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Dashboard"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/auth/signin": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Autenticates a Operator",
                "description": "By passing a valid e-mail and password the system return access token",
                "operationId": "Authentication.Operators.signin",
                "requestBody": {
                    "description": "User request body. The required fields are only for signup.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "client_id",
                                    "client_secret",
                                    "grant_type",
                                    "password",
                                    "scope",
                                    "username"
                                ],
                                "type": "object",
                                "properties": {
                                    "grant_type": {
                                        "type": "string"
                                    },
                                    "client_id": {
                                        "type": "string",
                                        "example": "2"
                                    },
                                    "client_secret": {
                                        "type": "string",
                                        "example": "12345678"
                                    },
                                    "username": {
                                        "type": "string",
                                        "example": "user@dummy.it"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "12345678"
                                    },
                                    "scope": {
                                        "type": "string",
                                        "example": "*"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The operator is now authenticated into the system",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_200"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/signout": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Logout a Operator",
                "description": "Logout a Operator, return void on success",
                "operationId": "Authentication.Operators.signout",
                "responses": {
                    "204": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_204"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/devices/": {
            "get": {
                "tags": [
                    "Devices"
                ],
                "summary": "Get list of devices",
                "operationId": "Devices.fetch",
                "parameters": [
                    {
                        "name": "Device search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Devices",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Device search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Devices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Device"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/devices/{id}": {
            "get": {
                "tags": [
                    "Devices"
                ],
                "summary": "Get Devices",
                "operationId": "Devices.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a Device",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Device"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/graphs/{id}": {
            "get": {
                "tags": [
                    "Topology"
                ],
                "summary": "Get Topology",
                "operationId": "Topology.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a Topology",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Device"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/app/version": {
            "get": {
                "tags": [
                    "App"
                ],
                "operationId": "App.getVersion",
                "responses": {
                    "200": {
                        "description": "Returns Version information",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Version"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/support/contact": {
            "post": {
                "tags": [
                    "Support"
                ],
                "summary": "Support contact",
                "operationId": "Support.contact",
                "requestBody": {
                    "description": "Support contact request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "subject": {
                                        "type": "string"
                                    },
                                    "content": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "204": {
                        "description": "ok nocontent"
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        }
    },
    "components": {
        "schemas": {
            "ErrorResponse": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "description": "Identificativo human-readable dell errore (es. 'PageNotFound', 'BadArguments')"
                    },
                    "message": {
                        "type": "string",
                        "description": "Messaggio d errore leggibile che può essere mostrato direttamente all utente nella lingua specificata nel campo Accept-Language del request header"
                    },
                    "target": {
                        "type": "string",
                        "description": "Contesto nel quale l'errore è stato generato"
                    },
                    "details": {
                        "type": "array",
                        "description": "Dettaglio sui singoli errori che hanno generato l errore in oggetto. Può essere costituito anche da un solo elemento",
                        "items": {
                            "$ref": "#/components/schemas/ErrorResponse_details"
                        }
                    }
                },
                "description": "Rappresentazione di un errore"
            },
            "Token": {
                "required": [
                    "email",
                    "token",
                    "type"
                ],
                "type": "object",
                "properties": {
                    "token": {
                        "type": "string",
                        "description": "Token"
                    },
                    "type": {
                        "type": "string",
                        "description": "Tipo del token",
                        "enum": [
                            "activation",
                            "reset"
                        ]
                    },
                    "email": {
                        "type": "string",
                        "description": "Email dell'utente a cui è associato il token",
                        "format": "email"
                    }
                },
                "description": "Rappresentazione di un token per l'attivazione di un utente o del reset della password"
            },
            "Dashboard": {
                "type": "object",
                "properties": {
                    "tenants": {
                        "type": "object"
                    },
                    "devices": {
                        "type": "object"
                    },
                    "overlays": {
                        "type": "object"
                    },
                    "operators": {
                        "type": "object"
                    }
                }
            },
            "Operator": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "role": {
                        "type": "string",
                        "enum": [
                            "admin",
                            "operator"
                        ]
                    },
                    "name": {
                        "type": "string"
                    },
                    "surname": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "fiscal_code": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string"
                    },
                    "phone_country": {
                        "type": "string"
                    },
                    "phone_main": {
                        "type": "string"
                    },
                    "created_at": {
                        "type": "string"
                    }
                }
            },
            "Device": {
                "type": "object",
                "properties": {
                    "device_id": {
                        "type": "string"
                    },
                    "features": {
                        "type": "object"
                    },
                    "loopbackip": {
                        "type": "string"
                    },
                    "loopbacknet": {
                        "type": "string"
                    },
                    "mgmtip": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": [
                            "router"
                        ]
                    },
                    "registration_timestamp": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "Connected",
                            "Running",
                            "Not Connected"
                        ]
                    },
                    "tenantid": {
                        "type": "string"
                    },
                    "tunnel_info": {
                        "type": "string"
                    },
                    "tunnel_mode": {
                        "type": "string"
                    }
                }
            },
            "Topology": {
                "type": "object",
                "properties": {
                    "links": {
                        "type": "array",
                        "items": {
                            "type": "object"
                        }
                    },
                    "nodes": {
                        "type": "array",
                        "items": {
                            "type": "object"
                        }
                    }
                }
            },
            "Version": {
                "type": "object",
                "properties": {
                    "branch": {
                        "type": "string"
                    },
                    "build": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string"
                    }
                }
            },
            "inline_response_200": {
                "type": "object",
                "properties": {
                    "token_type": {
                        "type": "string",
                        "example": "Bearer"
                    },
                    "expires_in": {
                        "type": "string",
                        "description": "iso-string"
                    },
                    "access_token": {
                        "type": "string"
                    },
                    "refresh_token": {
                        "type": "string"
                    },
                    "user": {
                        "$ref": "#/components/schemas/Operator"
                    }
                }
            },
            "inline_response_204": {
                "type": "object",
                "properties": {
                    "success": {
                        "type": "boolean"
                    }
                }
            },
            "Device search query parameters": {
                "type": "object",
                "properties": {
                    "term": {
                        "type": "string",
                        "description": "Search string for name"
                    }
                }
            },
            "Pagination parameters": {
                "type": "object",
                "properties": {
                    "offset": {
                        "type": "integer",
                        "description": "FROM pagination"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "COUNT pagination"
                    }
                }
            },
            "ErrorResponse_details": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string"
                    },
                    "target": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            }
        },
        "responses": {
            "OAuthResponse": {
                "description": "The user is now authenticated into the system",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "token_type": {
                                    "type": "string",
                                    "example": "Bearer"
                                },
                                "expires_in": {
                                    "type": "string",
                                    "description": "iso-string"
                                },
                                "access_token": {
                                    "type": "string"
                                },
                                "refresh_token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "OperatorSigninResponse": {
                "description": "The operator is now authenticated into the system",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/inline_response_200"
                        }
                    }
                }
            },
            "SuccessResponse": {
                "description": "The request is successfull",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/inline_response_204"
                        }
                    }
                }
            },
            "DeleteResponse": {
                "description": "The resource has been deleted",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            },
            "BadRequestResponse": {
                "description": "The request is malformed",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            },
            "NotFoundResponse": {
                "description": "The specified resource was not found",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            },
            "UnauthorizedResponse": {
                "description": "Unauthorized, Invalid credentials (client or user)",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            },
            "ServerErrorResponse": {
                "description": "Internal Server Error",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            }
        },
        "parameters": {
            "ResourceIdPathParameter": {
                "name": "id",
                "in": "path",
                "description": "Resource id identifier",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                    "type": "string"
                }
            },
            "OperatorSearchQueryParameters": {
                "name": "Operator search query parameters",
                "in": "query",
                "description": "The parameters are used to search Operators",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "type": "object",
                    "properties": {
                        "term": {
                            "type": "string",
                            "description": "Search string for name OR surname OR email"
                        },
                        "role": {
                            "type": "string",
                            "enum": [
                                "admin",
                                "operator"
                            ]
                        }
                    }
                }
            },
            "DeviceSearchQueryParameters": {
                "name": "Device search query parameters",
                "in": "query",
                "description": "The parameters are used to search Devices",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Device search query parameters"
                }
            },
            "PaginationQueryParameters": {
                "name": "Pagination parameters",
                "in": "query",
                "description": "The parameters are used to create pagination",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Pagination parameters"
                }
            },
            "PasswordRecoverCheckQueryParameters": {
                "name": "Password recovery query parameters",
                "in": "query",
                "description": "Password recovery query parameters",
                "required": true,
                "style": "form",
                "explode": true,
                "schema": {
                    "type": "object",
                    "properties": {
                        "token": {
                            "type": "string"
                        },
                        "email": {
                            "type": "string",
                            "format": "email"
                        }
                    }
                }
            }
        },
        "requestBodies": {
            "OAuth2AccessTokenRequestBody": {
                "description": "User request body. The required fields are only for signup.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "client_id",
                                "client_secret",
                                "grant_type",
                                "password",
                                "scope",
                                "username"
                            ],
                            "type": "object",
                            "properties": {
                                "grant_type": {
                                    "type": "string"
                                },
                                "client_id": {
                                    "type": "string",
                                    "example": "2"
                                },
                                "client_secret": {
                                    "type": "string",
                                    "example": "12345678"
                                },
                                "username": {
                                    "type": "string",
                                    "example": "user@dummy.it"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "12345678"
                                },
                                "scope": {
                                    "type": "string",
                                    "example": "*"
                                }
                            }
                        }
                    }
                }
            },
            "SupportContactRequestBody": {
                "description": "Support contact request body",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "subject": {
                                    "type": "string"
                                },
                                "content": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "PasswordRecoverRequestBody": {
                "description": "User/Operator password recover request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "email"
                            ],
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                }
                            }
                        }
                    }
                }
            },
            "PasswordPutRequestBody": {
                "description": "User/Operator password put request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "email",
                                "password",
                                "token"
                            ],
                            "type": "object",
                            "properties": {
                                "token": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                }
                            }
                        }
                    }
                }
            },
            "OperatorRequestBody": {
                "description": "Operator request body. The required fields are only for signup.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "required": [
                                "email",
                                "fiscal_code",
                                "name",
                                "password",
                                "surname"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "surname": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                },
                                "fiscal_code": {
                                    "type": "string"
                                },
                                "phone_country": {
                                    "type": "string"
                                },
                                "phone_main": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "info": {
                                    "type": "string"
                                },
                                "avatar": {
                                    "type": "string",
                                    "description": "attached img",
                                    "format": "binary"
                                }
                            }
                        }
                    }
                }
            }
        },
        "securitySchemes": {
            "JWTAuth": {
                "type": "http",
                "scheme": "bearer"
            }
        }
    }
}