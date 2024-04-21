// CONSTANTS
export const LOCAL_IP = '127.0.0.1';
export const LOCAL_SERVER_PORT = 4000;
export const LOCAL_MONGO_PORT = 27017;

// DATABASE CONNECTIONS
export const MONGODB_LOCAL_URI = `mongodb://${LOCAL_IP}:${LOCAL_MONGO_PORT}`;
export const DATABASE_NAME = 'node_server_backend';

// JWT-AUTHENTICATIONS
export const JWT_SECRET_KEY = '843b3d3a120cdc5e38be93315a8cd1d402546177ee4e1fbdaf6c7edc5fe57f56';

// SMTP-MAIL SERVICE - https://ethereal.email/
export const SMTP_CONFIG_CREDENTIALS = {
  name: 'Dedric Swaniawski',
  email: 'dedric86@ethereal.email',
  password: '4v8RhWksWRBYARRD5P',
};
