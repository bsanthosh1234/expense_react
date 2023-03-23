const routes=require('express').Router();
const controller=require('../controller/controller')
const model = require('../modals/model')

routes.route('/category')
    .post(controller.create_Categories)
    .get(controller.get_categories)
    
routes.route('/transaction')
    .post(controller.create_Transaction)
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction)

routes.route('/labels')
    .get(controller.get_Labels)

routes.route('/api/data')
    .post(controller.addCsv)



routes.route('/deltransaction')
    .post(controller.del)


 module.exports=routes;





