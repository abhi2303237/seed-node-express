

export enum AWSSecretExceptions {

    DECRYPTION_FAILED = "DecryptionFailureException",
    INTERNAL_SERVICE_FAILED = "InternalServiceErrorException",
    INVALID_PARAMETER = "InvalidParameterException",
    INVALID_REQUEST = "InvalidRequestException",
    RESOURCE_NOT_FOUND = "ResourceNotFoundException",
    DEFAULT_EXCEPTION = "Authentication Invalid"
}

export interface SecretDataObject {
    "X-API-KEY": string;
    "PERMISSIONS": string;
    "HEADOFFICE_ID"?: string;
    "STORE_ID"?: string;
}