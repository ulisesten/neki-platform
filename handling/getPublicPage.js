/**ulisesten en marzo 14, 2019 */
var util = require('../utils/loadFiles');

function publicPage(req, res, csrfToken){ 
    util.loadView('./views/publicPage.html', res, csrfToken)
}

module.exports = publicPage;