import * as mongose from 'mongoose';

export const PassengerSchema = new mongose.Schema({

        name: {type: String, required: true },
        email: {type: String, required: true }

});

PassengerSchema.index({ email:1 }, { unique: true });
