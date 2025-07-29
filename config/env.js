import {config} from 'dotenv';


config ({path: `.env.${process.env.NODE_ENV  || 'development'}.local` });


// eslint-disable-next-line no-undef
export const { PORT ,NODE_ENV} = process.env;