const commerceAPI = require('../../../api/commerceAPI');
function Search(result) {
    this.result = result;
}

async function FindSearch(searchTerm) {
    const searchResult = await commerceAPI.searchBarProduct(searchTerm);

    if (searchResult == 'notFound') {
        return 'notFound';
    }
    if (searchResult.length > 1) {
        var results = [];
        searchResult.forEach((result) => {
            const searchObject = new Search(result);
            results.push(searchObject);
        });
        return results;
    } else {
        const searchObject = new Search(searchResult[0]);
        return searchObject;
    }
}

exports.FindSearch = FindSearch;
