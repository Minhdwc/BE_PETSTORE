require("express");
const appointmentRouter = require('./appointment.routes');
const cartRouter = require('./cart.routes');
const categoryRouter = require('./category.routes');
const notificationRouter = require('./notification.routes')
const orderRouter = require('./notification.routes');
const petRouter = require('./pet.routes')
const productionRouter = require('./production.routes');
const reviewRouter = require('./review.routes');
const speciesRouter = require('./species.routes')
const userRouter = require('./user.routes')
const authRouter = require('./auth.routes')

const routes =(app)=>{
    const path = '/api/v1';
    app.use(path + '/auth', authRouter);
    app.use(path + '/appointment', appointmentRouter);
    app.use(path + '/cart', cartRouter);
    app.use(path + '/category', categoryRouter);
    app.use(path + '/notification', notificationRouter);
    app.use(path + '/order', orderRouter);
    app.use(path + '/pet', petRouter);
    app.use(path + '/production', productionRouter);
    app.use(path + '/review', reviewRouter);
    app.use(path + '/species', speciesRouter);
    app.use(path + '/user', userRouter);
}

module.exports = routes