const commerceAPI = require('../../../api/commerceAPI');
function Search(result) {
    this.result = result;
}

async function FindSearch(searchTerm) {
    console.log('SEARCH TERM:' + searchTerm);
    const searchResult = await commerceAPI.searchBarProduct(searchTerm);
    console.log('searchResult LENGTH: ' + searchResult.length);
    console.log('searchResult: ' + searchResult[0].name);
    if (searchResult.length > 1) {
        var results = [];
        console.log('Multiple');
        searchResult.forEach((result) => {
            const searchObject = new Search(result);

            results.push(searchObject);
        });
        return results;
    } else {
        const searchObject = new Search(searchResult[0]);
        console.log(searchObject.result.name);
        return searchObject;
    }
}

exports.FindSearch = FindSearch;
