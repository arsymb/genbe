function getJsonForm(jsonArray, isAllowedNull) {
    result = {};
    jsonArray.forEach(function (element) {
        value = element.value;
        if (value == "" && isAllowedNull) {
            value = null;
        }
        result[element.name] = value;
    });
    return result;
}