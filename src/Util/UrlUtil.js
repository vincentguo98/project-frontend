export function BuildUrl(command, database, params) {
    var queryString = Object.keys(params)
        .map(k => escape(k) + '=' + escape(params[k]))
        .join('&')
    return  `http://localhost:5001/api/${command}?database=${database}&${queryString}`
}
