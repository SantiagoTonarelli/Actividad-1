const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Predictions API",
      version: "1.0.0",
      description: "A simple API to manage user predictions",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Register a new user
 *     description: Register a user by providing a name and age.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.post("/users", (req, res) => {
  const { name, age } = req.body;

  // TODO: Save user to database
  res
    .status(200)
    .send({ message: `User ${name} registered successfully at age ${age}` });
});

/**
 * @openapi
 * /predictions:
 *   get:
 *     summary: Get predictions for a user
 *     description: Returns a list of predictions based on the user's name and age.
 *     responses:
 *       200:
 *         description: Predictions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get("/predictions", (req, res) => {
  // Dummy predictions
  // TODO: get random user name and age from request

  const { name, age } = { name: "Santiago", age: 25 };
  const predictions = [
    (name, age) => `${name} a los ${age} tendrá dos leones`,
    (name, age) => `${name} se retirará a los ${age} años`,
    (name, age) => `${name} a los ${age} será CEO de una startup`,
    (name, age) => `${name} se recibirá de ingeniero a los ${age} años`,
    (name, age) => `${name} a los ${age} montará un negocio propio`,
    (name, age) => `${name} a los ${age} conocerá a su alma gemela`,
    (name, age) => `${name} a los ${age} se mudará a otro país`,
    (name, age) => `${name} a los ${age} se comera un asado`,
  ];

  const randomIndex = Math.floor(Math.random() * predictions.length);

  // TODO: get user name and age from request
  res.status(200).json({ prediction: predictions[randomIndex](name, age) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}/api-docs`)
);
