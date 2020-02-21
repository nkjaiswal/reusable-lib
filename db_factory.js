var accesser = null;

if (process.env.DB_SERVER == 'mysql') {
    accesser = require('./my_sql_accesser.js')
} else if (process.env.DB_SERVER == 'postgresql') {
    accesser = require('./postgresql_accesser.js')
} else {
    throw new Error("Not supported DB_Server. This exception should not been occured, this exception shows not proper coded system");
}
module.exports = {
    get_accesser: function () {
        return accesser;
    }
}