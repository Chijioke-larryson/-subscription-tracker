import { Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscription} from "../contollers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: 'GET all subscription'}));

subscriptionRouter.get('/:id', (req, res) => res.send({title: 'GET  subscriptions details'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: 'UPDATE subscription'}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: 'DELETE subscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'CANCEL subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET all upcoming  renewals'}));



export default subscriptionRouter;