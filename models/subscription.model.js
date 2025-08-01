import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription is required'],
        min: [0, 'Price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'NGN'],
        default:' NGN'
    },
    frequency: {
        type: String,
        enum:[ 'daily', 'weekly', 'monthly', 'yearly'],

    },
    category:  {
        type: String,
        enum: ['sports','entertainment', 'lifestyle', 'anime', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true,


    },
    status:{
        type: String,
        enum: ['active', 'canceled', 'reviewed','expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate:{
            validator: (value) => value <= new Date(),
             message: 'start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate:{
            validator: function (value){
                return value > this.startDate;
            },
            message: 'Renewal date must be after the past date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }


}, {timestamps: true});


//auto-calculate the renewal date
subscriptionSchema.pre( 'save', function (next){

    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewaldate.getData() + renewalPeriods[this.frequency]);

    }
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
})

const  Subscription = mongoose.model( 'Subscription', subscriptionSchema);

export  default  Subscription;
