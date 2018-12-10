

exports.setSort = function (number) {
    var sort={};
    console.log('sorting number : %s',number)
    if (number == 1) {
        sort = {'displayIndex':1,'price.value': 'asc' }
    } else if (number == 2) {
        console.log('ssssssssssssssssssssssssssss %s',sort)
        sort = {'displayIndex':1, 'price.value': 'desc' }
    } else if (number == 3) {
        sort = {displayIndex:1, datePosted: 1 }
    } else if (number == 4) {
        sort = {displayIndex:1, datePosted: -1 }
    }
    console.log('------------sort ----------------- %s',JSON.stringify(sort));
    return sort
}
