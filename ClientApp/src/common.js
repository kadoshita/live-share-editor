export default {
    parseQueryString() {
        const queryString = window.location.search.replace('?', '');
        const queryList = queryString.split('&');
        let queryParameters = {};
        queryList.forEach(q => {
            const key = q.split('=')[0];
            const value = q.split('=')[1];
            queryParameters[key] = value;
        });
        return queryParameters;
    }
};