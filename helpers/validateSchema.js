function validateSchema(data, schema) {
    // Helper functions for type checking
    const isAnyType = type => type === 'any';
    const isArrayType = type => Array.isArray(type) && typeof type[0] === 'object';
    const isEnumType = (type, value) => Array.isArray(type) && type.includes(value);
    const isObjectType = type => typeof type === 'object' && type !== null;

    // Helper functions for validation
    const validateArray = (value, schema) => Array.isArray(value) && value.every(item => this.validateSchema(item, schema[0]));
    const validateObject = (value, schema) => isObjectType(value) && this.validateSchema(value, schema);
    const validatePrimitive = (value, type) => typeof value === type;
    
    // Lets check if the schema is an array
    if (Array.isArray(data)) {
        return data.every(item => validateSchema(item, schema));
    }

    // Check for extra keys in data that are not in the schema
    const extraKeys = Object.keys(data).filter((key) => {
        return !schema.hasOwnProperty(key);
    });
    if (extraKeys.length > 0) {
        console.error(`Extra keys found: ${extraKeys}`);
        return false;
    }

    // Main validation logic
    return Object.keys(schema).every(key => {
        // Skip optional keys not present in data
        if (!data.hasOwnProperty(key)) return true;

        const expectedType = schema[key];
        const actualValue = data[key];

        // Type-specific validations
        if (isAnyType(expectedType)) return true;
        if (isEnumType(expectedType, actualValue)) return true;
        if (isArrayType(expectedType)) {
            if (!validateArray(actualValue, expectedType)) {
                console.error(`Array validation failed for key: ${key}`);
                //console.log(actualValue);
                console.log("mmmmmmmmmm");
                return false;
            }
            return true;
        }
        if (isObjectType(expectedType)) {
            if (!validateObject(actualValue, expectedType)) {
                console.error(`Object validation failed for key: ${key}`);
                return false;
            }
            return true;
        }

        // Primitive type validation
        if (!validatePrimitive(actualValue, expectedType)) {
            console.error(`Primitive validation failed for key: ${key}`);
            return false;
        }
        return true;
    });
}

module.exports = validateSchema;