import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Gadget API',
            version: '1.0.0',
            description: `The IMF Gadget API is a system for managing gadget inventories. It is
developed using Node.js, Express, and MongoDB. Due to the unavailability of a
relational database, MongoDB is being used.`,
            contact: {
                name: 'BHANURI CHANDRASEKHAR',
                email: 'bhanurichandu@gmail.com',
            },
            servers: [
                {
                    url: 'https://upraised.onrender.com', 
                    description: 'Development Server'
                }
            ]
        }
    },
    apis: ['./Components/Routes.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
